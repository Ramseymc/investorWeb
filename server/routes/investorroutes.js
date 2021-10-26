const express = require("express");
const router = express.Router();
const pool = require("./connection");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const chalk = require("chalk")

    // file upload stuff
    const fileFilter = function (req, file, cb) {
        const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error("Wrong file type");
            error.code = "LIMIT_FILE_TYPES";
            console.log(req.path, error);
            return cb(error, false);

        }
        cb(null, true);
    };

    let MAX_SIZE = 20000000;
    const upload = multer({
        dest: "./public/uploads/",
        fileFilter,
        limits: {
            fileSize: MAX_SIZE,
            fieldSize: 100 * 1024 * 1024,
        },
    });

    function excecuteSQL(sql, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                resizeBy.send("Error with connection");
            }            
            connection.query(sql, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    res.json(result);
                    console.log("After SQL stmnt, result = ");
                    console.log(result);
                }
            });
            connection.release();
        });
    }

    router.post("/uploadImage", upload.single("stockImage"), (req, res) => {
        console.log("imageUploaded and renamed to: ", req.body.newImageName);
        // rename the image 
        console.log("req.file", req.file)
        fs.rename(
            `public/uploads/${req.file.filename}`,
            `public/uploads/${req.body.newImageName}`,
            (err) => {
                if (err) console.log("Error renaming", err);
                //throw err
            }
        );
    }),
   
    // ------------------------------------------------------------------------------------------------
    // Investor App Methods
    // ------------------------------------------------------------------------------------------------
    router.post("/updateInvestment", upload.array("documents"), (req, res) => {
        console.log("updateInvestment req", req.body)           
        let fileDetails = []
        //console.log(req.body.contains)
        let contains = []
        try {
            contains = req.body.contains.split(",")
        } catch {
            contains.push(req.body.contains)
        }
        contains = Array.from(new Set(contains))
        contains.forEach((el) => {

            req.files.forEach((el2) => {
                el2.filenameA = `${el2.filename}.${el2.mimetype.split("/")[1]}`
                let insert = {
                    fileType: el,
                    fileName: el2.filenameA,
                    originalName: el2.filename
                }
                fileDetails.push(insert)
            })
        })

        // renaming files if required
        fileDetails.forEach((el) => {
            let filtered = req.files.filter((el2) => {
                return el2.filename === el.originalName
            })
            // el.fileNameUpdated = `${el.fileName}.${filtered[0].mimetype.split("/")[1]}`
            el.fileNameUpdated = `${el.fileName}`
            fs.rename(`public/uploads/${el.originalName}`, `public/uploads/${el.fileNameUpdated}`, (err) => {
                if (err)
                    console.log("Error renaiming");
                //throw err
            })
        })
      
        let mysql = `UPDATE investment 
            SET     
                investment_amount = '${req.body.investmentAmount}',                
                end_date = '${req.body.repaymentDate}',
                investment_interest_rate =  '${req.body.investmentPerc}',
                repayment_amount   = '${req.body.repaymentAmount}',                       
                lastupdated = '${dateToday}', 
                release_percentage =   '${req.body.releasePerc}',
                release_date = '${req.body.releaseDate}',
                release_amount = '${req.body.releaseAmount}',
                linked_unit = '${req.body.linkedUnit}',
                project = '${req.body.project}' `        

        // investment files
        let additionalSQL = ""
        let singedLoanAgreementFileSQL = fileDetails.filter((el) => { return el.fileType === 'investorOneDisingedLoanAgreementFilesclaimerFile' })          
            if (singedLoanAgreementFileSQL.length > 0) { singedLoanAgreementFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, singedLoanAgreementFile = '${el.fileName}'`
            })
        }        
        let POPFileSQL = fileDetails.filter((el) => {  return el.fileType === 'POPFile' })  
            if (POPFileSQL.length > 0) { POPFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, POPFile = '${el.fileName}'`
            })
        }        
        let attorneyConfirmLetterFileSQL = fileDetails.filter((el) => {  return el.fileType === 'attorneyConfirmLetterFile' })  
            if (attorneyConfirmLetterFileSQL.length > 0) { attorneyConfirmLetterFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, attorneyConfirmLetterFile = '${el.fileName}'`
            })
        }
    
        mysql = `${mysql} ${additionalSQL}` 
        + ` WHERE investor_id = '${req.body.investorId}' `
        + ` AND investment_id = ${req.body.investmentId}' ; ` 
    }),

    // complete sql
    router.post("/createInvestment", upload.array("documents"), (req, res) => {
        let fileDetails = [];
        // file manipulation
        if (req.files.length) {
            let contains = req.body.contains.split(",");
            contains.forEach((el, index) => {
                let mainIndex = index;
                if (req.files[mainIndex] !== "undefined") {
                    console.log("FILES AFTER CHECK::: ", req.files[mainIndex])
                    let insert = {
                        fileType: el,
                        fileName: `${req.files[mainIndex].filename}.${req.files[mainIndex].mimetype.split("/")[1]
                            }`,
                        originalName: req.files[mainIndex].filename,
                    };
                    fileDetails.push(insert);
                }
            });

            console.log("fileDetails", fileDetails);

            fileDetails.forEach((el) => {
                let filtered = req.files.filter((el2) => {
                    return el2.filename === el.originalName;
                });
                el.fileNameUpdated = `${el.fileName}`;
                fs.rename(
                    `public/uploads/${el.originalName}`,
                    `public/uploads/${el.fileNameUpdated}`,
                    (err) => {
                        if (err) console.log("Error renaming", err);
                        //throw err
                    }
                );
            });
        }

        let singedLoanAgreementFile;
        let POPFile;
        let attorneyConfirmLetterFile;

        if (fileDetails.length) {

            singedLoanAgreementFile = fileDetails.filter((el) => {
                return el.fileType === "singedLoanAgreementFile";
            });
            if (singedLoanAgreementFile.length) {
                singedLoanAgreementFile = singedLoanAgreementFile[0].fileName;
            } else {
                singedLoanAgreementFile = "";
            }

            POPFile = fileDetails.filter((el) => {
                return el.fileType === "POPFile";
            });
            if (POPFile.length) {
                POPFile = POPFile[0].fileName;
            } else {
                POPFile = "";
            }

            attorneyConfirmLetterFile = fileDetails.filter((el) => {
                return el.fileType === "attorneyConfirmLetterFile";
            });
            if (attorneyConfirmLetterFile.length) {
                attorneyConfirmLetterFile = attorneyConfirmLetterFile[0].fileName;
            } else {
                attorneyConfirmLetterFile = "";
            }
        }
        
        var today = new Date();
        var dateToday = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

        // add to database , 
        // then do the update like the salesone :) ! :) 

        // dbl check the form_appends 
        // msg Kaven, + Richard
        // Tarot, astrology, silicon valley 
        // indian shop , beach, films later
        let mysql = `INSERT INTO investments (
                        investor_id,
                        investment_amount,
                        
                        end_date,
                        investment_interest_rate,    
                        repayment_amount                  
                        lastupdated,

                        release_percentage, 
                        release_date,
                        release_amount, 

                        linked_unit, 
                        project, 

                        singedLoanAgreementFile, 
                        POPFile, 
                        attorneyConfirmLetterFile)  
                      VALUES (
                        '${req.body.investorId}',
                        '${req.body.investmentAmount}',
                        
                        '${req.body.repaymentDate}',
                        '${req.body.investmentPerc}',
                        '${req.body.repaymentAmount}',                    
                        '${dateToday}', 
                        
                        '${req.body.releasePerc}',
                        '${req.body.releaseDate}',
                        '${req.body.releaseAmount}',

                        '${req.body.linkedUnit}',
                        '${req.body.project}',

                        '${singedLoanAgreementFile}', 
                        '${POPFile}', 
                        '${attorneyConfirmLetterFile}'
                      )`
               
        excecuteSQL(mysql, res)
    }),

    
    router.post("/getAllInvestments", (req, res) => {

        let mysql = `select * from investors i join investments iv on iv.investor_id = i.investor_id where iv.investment_amount > 0 and i.investor_id = ${req.body.paramId}`
        excecuteSQL(mysql, res)

        // pool.getConnection(function (err, connection) {
        //     if (err) {
        //         connection.release();
        //         resizeBy.send("Error with connection");
        //     }
        //     connection.query(mysql, function (error, result) {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             res.json(result);
        //         }
        //     });
        //     connection.release();
        // });
    }),

    // db fields
    router.post("/updateInvestor", upload.array("documents"), (req, res) => {
        console.log("updateInvestor req", req.body)
        console.log("Files: ", req.files);
        console.log("Info: ", req.body);

        let fileDetails = []
        //console.log(req.body.contains)
        let contains = []
        try {
            contains = req.body.contains.split(",")
        } catch {
            contains.push(req.body.contains)
        }
        contains = Array.from(new Set(contains))
        contains.forEach((el) => {

            req.files.forEach((el2) => {
                el2.filenameA = `${el2.filename}.${el2.mimetype.split("/")[1]}`
                let insert = {
                    fileType: el,
                    fileName: el2.filenameA,
                    originalName: el2.filename
                }
                fileDetails.push(insert)
            })
        })

        console.log("fileDetails", fileDetails)

        // renaming files if required
        fileDetails.forEach((el) => {
            let filtered = req.files.filter((el2) => {
                return el2.filename === el.originalName
            })
            // el.fileNameUpdated = `${el.fileName}.${filtered[0].mimetype.split("/")[1]}`
            el.fileNameUpdated = `${el.fileName}`
            fs.rename(`public/uploads/${el.originalName}`, `public/uploads/${el.fileNameUpdated}`, (err) => {
                if (err)
                    console.log("Error renaiming");
                //throw err
            })
        })

        let mysql = `UPDATE investor 
        SET 
        investor_name = '${req.body.investorName}',
        investor_surname= '${req.body.investorSurname}',
        investor_id_number= '${req.body.investorIDNumber}',
        contact_email= '${req.body.contactEmail}',
        investor_mobile= '${req.body.mobile}',
        investor_landline= '${req.body.landline}',                                              
        investor_two_name= '${req.body.investorTwoInitials}',
        investor_two_surname='${req.body.investorTwoSurname}',
        investor_two_id_number'${req.body.investorTwoIDNumber}',
        company_name = '${req.body.companyName}',
        ref_number =  '${req.body.regNumber}',
        company_rep_initals = '${req.body.companyRepInitials}',
        company_rep_surname = '${req.body.companyRepSurname}',
        company_rep_id_number = '${req.body.companyRepIDNumber}',                                                                    
        contact_two_email = '${req.body.contactTwoEmail}',
        mobile =  '${req.body.mobile}',
        landline = '${req.body.landline}',
        mobile_two = '${req.body.mobileTwo}',
        landline_two = '${req.body.landlineTwo}',
        street_no = '${req.body.streetNo}',
        street_name = '${req.body.streetName}',
        address_suburb = '${req.body.addressSuburb}',
        province = '${req.body.province}',
        address_postal_code = '${req.body.addressPostalCode}',
        box_no = '${req.body.boxNo}',
        postal_suburb = '${req.body.postalSuburb}',
        postal_code = '${req.body.postalCode}',                                
        bank_name =  '${req.body.bankName}',
        account_name =  '${req.body.accountName}',
        branch_code = '${req.body.branchCode}',
        account_no = '${req.body.accountNumber}',
        fica_date = '${req.body.ficaDate}' ,             
        person_mode = '${req.body.person}'`;

          let additionalSQL = ""
          // investorOneFiles
          let investorOneDisclaimerFileSQL = fileDetails.filter((el) => { return el.fileType === 'investorOneDisclaimerFile' })            
            if (investorOneDisclaimerFileSQL.length > 0) { investorOneDisclaimerFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, investorOneDisclaimerFile = '${el.fileName}'`
                })
          }        
          let investorOneIDFileSQL = fileDetails.filter((el) => {  return el.fileType === 'investorOneIDFile' })  
            if (investorOneIDFileSQL.length > 0) { investorOneIDFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, investorOneIDFile = '${el.fileName}'`
                })
          }        
          let investorOnePOAFileSQL = fileDetails.filter((el) => {  return el.fileType === 'investorOnePOAFile' })  
            if (investorOnePOAFileSQL.length > 0) { investorOnePOAFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, investorOnePOAFile = '${el.fileName}'`
                })
          }

          // investorTwoFiles
          let investorTwoDisclaimerFileSQL = fileDetails.filter((el) => {  return el.fileType === 'investorTwoDisclaimerFile' })  
            if (investorTwoDisclaimerFileSQL.length > 0) { investorTwoDisclaimerFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, investorTwoDisclaimerFile = '${el.fileName}'`
                })
          }
          let investorTwoPOAFileSQL = fileDetails.filter((el) => {  return el.fileType === 'investorTwoIDFile' })  
            if (investorTwoPOAFileSQL.length > 0) { investorTwoPOAFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, investorTwoPOAFile = '${el.fileName}'`
                })
          }         
          let investorTwoPOAFileSQL = fileDetails.filter((el) => {  return el.fileType === 'investorTwoPOAFile' })  
            if (investorTwoPOAFileSQL.length > 0) { investorTwoPOAFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, investorTwoPOAFile = '${el.fileName}'`
                })
          }

          // company rep files 
          let representativeDisclaimerFileSQL = fileDetails.filter((el) => {  return el.fileType === 'representativeDisclaimerFile' })  
            if (representativeDisclaimerFileSQL.length > 0) { representativeDisclaimerFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, representativeDisclaimerFile = '${el.fileName}'`
                })
          }
          let representativeIDFileSQL = fileDetails.filter((el) => {  return el.fileType === 'representativeIDFile' })  
            if (representativeIDFileSQL.length > 0) { representativeIDFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, representativeIDFile = '${el.fileName}'`
                })
          }
          let reresentativePOAFileSQL = fileDetails.filter((el) => {  return el.fileType === 'reresentativePOAFile' })  
            if (reresentativePOAFileSQL.length > 0) { reresentativePOAFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, reresentativePOAFile = '${el.fileName}'`
                })
          }

          // company files
          let companyResolutionFileSQL = fileDetails.filter((el) => {  return el.fileType === 'companyResolutionFile' })  
            if (companyResolutionFileSQL.length > 0) { companyResolutionFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, companyResolutionFile = '${el.fileName}'`
                })
          }
          let companyRefDocsFileSQL = fileDetails.filter((el) => {  return el.fileType === 'companyRefDocsFile' })  
            if (companyRefDocsFileSQL.length > 0) { companyRefDocsFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, companyRefDocsFile = '${el.fileName}'`
                })
          }
          let companyPOAFileSQL = fileDetails.filter((el) => {  return el.fileType === 'companyPOAFile' })  
            if (companyPOAFileSQL.length > 0) { companyPOAFileSQL.forEach((el) => {
                additionalSQL = `${additionalSQL}, companyPOAFile = '${el.fileName}'`
                })
          }         

        mysql = `${mysql} ${additionalSQL}` 
              + ` WHERE investor_id = '${req.body.investorId}'; ` 
              // +  `WHERE id = ${req.body.id}`

        excecuteSQL(mysql, res);
    }),
     
    router.post("/createInvestor", upload.array("documents"), (req, res) => {
        console.log(req.body)
        console.log(req.files)
        let fileDetails = [];
        // file manipulation
        if (req.files.length) {
            let contains = req.body.contains.split(",");
            contains.forEach((el, index) => {
                let mainIndex = index;
                if (req.files[mainIndex] !== "undefined") {
                    console.log("FILES AFTER CHECK::: ", req.files[mainIndex])
                    let insert = {
                        fileType: el,
                        fileName: `${req.files[mainIndex].filename}.${req.files[mainIndex].mimetype.split("/")[1]
                            }`,
                        originalName: req.files[mainIndex].filename,
                    };
                    fileDetails.push(insert);
                }
            });

            console.log("fileDetails", fileDetails);

            fileDetails.forEach((el) => {
                let filtered = req.files.filter((el2) => {
                    return el2.filename === el.originalName;
                });
                el.fileNameUpdated = `${el.fileName}`;
                fs.rename(
                    `public/uploads/${el.originalName}`,
                    `public/uploads/${el.fileNameUpdated}`,
                    (err) => {
                        if (err) console.log("Error renaming", err);
                        //throw err
                    }
                );
            });
        }

        let investorOneDisclaimerFile;
        let investorOneIDFile;
        let investorOnePOAFile;

        let investorTwoDisclaimerFile;
        let investorTwoIDFile;
        let investorTwoPOAFile;

        let representativeDisclaimerFile;
        let representativeIDFile;
        let representativePOAFile;

        let companyResolutionFile;
        let companyRefDocsFile;
        let companyPOAFile;

        if (fileDetails.length) {

            investorOneDisclaimerFile = fileDetails.filter((el) => {
                return el.fileType === "investorOneDisclaimerFile";
            });
            if (investorOneDisclaimerFile.length) {
                investorOneDisclaimerFile = investorOneDisclaimerFile[0].fileName;
            } else {
                investorOneDisclaimerFile = "";
            }

            investorOneIDFile = fileDetails.filter((el) => {
                return el.fileType === "investorOneIDFile";
            });
            if (investorOneIDFile.length) {
                investorOneIDFile = investorOneIDFile[0].fileName;
            } else {
                investorOneIDFile = "";
            }

            investorOnePOAFile = fileDetails.filter((el) => {
                return el.fileType === "investorOnePOAFile";
            });
            if (investorOnePOAFile.length) {
                investorOnePOAFile = investorOnePOAFile[0].fileName;
            } else {
                investorOnePOAFile = "";
            }

            investorTwoDisclaimerFile = fileDetails.filter((el) => {
                return el.fileType === "investorTwoDisclaimerFile";
            });
            if (investorTwoDisclaimerFile.length) {
                investorTwoDisclaimerFile = investorTwoDisclaimerFile[0].fileName;
            } else {
                investorTwoDisclaimerFile = "";
            }

            investorTwoIDFile = fileDetails.filter((el) => {
                return el.fileType === "investorTwoIDFile";
            });
            if (investorTwoIDFile.length) {
                investorTwoIDFile = investorTwoIDFile[0].fileName;
            } else {
                investorTwoIDFile = "";
            }

            investorTwoPOAFile = fileDetails.filter((el) => {
                return el.fileType === "investorTwoPOAFile";
            });
            if (investorTwoPOAFile.length) {
                investorTwoPOAFile = investorTwoPOAFile[0].fileName;
            } else {
                investorTwoPOAFile = "";
            }

            representativeDisclaimerFile = fileDetails.filter((el) => {
                return el.fileType === "representativeDisclaimerFile";
            });
            if (representativeDisclaimerFile.length) {
                representativeDisclaimerFile = representativeDisclaimerFile[0].fileName;
            } else {
                representativeDisclaimerFile = "";
            }

            representativeIDFile = fileDetails.filter((el) => {
                return el.fileType === "representativeIDFile";
            });
            if (representativeIDFile.length) {
                representativeIDFile = representativeIDFile[0].fileName;
            } else {
                representativeIDFile = "";
            }

            representativePOAFile = fileDetails.filter((el) => {
                return el.fileType === "representativePOAFile";
            });
            if (representativePOAFile.length) {
                representativePOAFile = representativePOAFile[0].fileName;
            } else {
                representativePOAFile = "";
            }

            companyResolutionFile = fileDetails.filter((el) => {
                return el.fileType === "companyResolutionFile";
            });
            if (companyResolutionFile.length) {
                companyResolutionFile = companyResolutionFile[0].fileName;
            } else {
                companyResolutionFile = "";
            }

            companyRefDocsFile = fileDetails.filter((el) => {
                return el.fileType === "companyRefDocsFile";
            });
            if (companyRefDocsFile.length) {
                companyRefDocsFile = companyRefDocsFile[0].fileName;
            } else {
                companyRefDocsFile = "";
            }

            companyPOAFile = fileDetails.filter((el) => {
                return el.fileType === "companyPOAFile";
            });
            if (companyPOAFile.length) {
                companyPOAFile = companyPOAFile[0].fileName;
            } else {
                companyPOAFile = "";
            }
        }

            // add the formData names to database fields
        let mysql1 = `INSERT INTO investors (
            investor_acc_number,
            investor_name,
            investor_surname,
            investor_id_number,
            investor_two_name,
            investor_two_surname,
            investor_two_id_number,
            company_name,
            ref_number,
            company_rep_initals,
            company_rep_surname,
            company_rep_id_number,
            contact_email,
            contact_two_email,
            mobile,
            landline,
            mobile_two,
            landline_two,                  
            street_no,
            street_name,
            address_suburb,
            province,
            address_postal_code,
            box_no,
            postal_suburb,
            postal_code,
            bank_name,
            account_name,
            branch_code,
            account_no,
            fica_date,
            person_mode,

            investorOneDisclaimerFile,
            investorOneIDFile,
            investorOnePOAFile,
            investorTwoDisclaimerFile,
            investorTwoIDFile,
            investorTwoPOAFile,
            representativeDisclaimerFile,
            representativeIDFile,
            reresentativePOAFile,
            companyResolutionFile,
            companyRefDocsFile,
            companyPOAFile

            ) VALUES ( 
            '${req.body.investorCode}',
            '${req.body.investorInitials}',
            '${req.body.investorSurname}',
            '${req.body.investorIDNumber}',
                            
            '${req.body.investorTwoInitials}',
            '${req.body.investorTwoSurname}',
            '${req.body.investorTwoIDNumber}',

            '${req.body.companyName}',
            '${req.body.regNumber}',

            '${req.body.companyRepInitials}',
            '${req.body.companyRepSurname}',
            '${req.body.companyRepIDNumber}',

            '${req.body.contactEmail}',
            '${req.body.contactTwoEmail}',
            '${req.body.mobile}',
            '${req.body.landline}',
            '${req.body.mobileTwo}',
            '${req.body.landlineTwo}',
            
            '${req.body.streetNo}',
            '${req.body.streetName}',
            '${req.body.addressSuburb}',
            '${req.body.province}',
            '${req.body.addressPostalCode}',
            '${req.body.boxNo}',
            '${req.body.postalSuburb}',
            '${req.body.postalCode}',
            '${req.body.bankName}',
            '${req.body.accountName}',
            '${req.body.branchCode}',
            '${req.body.accountNumber}',
            '${req.body.person}',

            '${investorOneDisclaimerFile}', 
            '${investorOneIDFile}', 
            '${investorOnePOAFile}', 
            '${investorTwoDisclaimerFile}', 
            '${investorTwoIDFile}', 
            '${investorTwoPOAFile}', 
            '${representativeDisclaimerFile}', 
            '${representativeIDFile}', 
            '${reresentativePOAFile}', 
            '${companyResolutionFile}', 
            '${companyRefDocsFile}', 
            '${companyPOAFile}'            
        )`
            // + the 'let' file variables
        excecuteSQL(mysql, res)
        // pool.getConnection(function (err, connection) {
        //     if (err) {
        //         connection.release();
        //         resizeBy.send("Error with connection");
        //     }
        //     connection.query(mysql, function (error, result) {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             res.json(result);
        //             console.log("After INSERT stmnt");
        //             console.log(result);
        //         }
        //     });
        //     connection.release();
        // });
    }),

    router.post("/getAllInvestors", (req, res) => {

        let mysql = `select * from investors i`
        excecuteSQL(mysql, res)
        // pool.getConnection(function (err, connection) {
        //     if (err) {
        //         connection.release();
        //         resizeBy.send("Error with connection");
        //     }
        //     connection.query(mysql, function (error, result) {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             res.json(result);
        //         }
        //     });
        //     connection.release();
        // });
    }),
    // ------------------------------------------------------------------------------------------------
    // Investor App Methods End 
    // ------------------------------------------------------------------------------------------------

    // Test Server Methods
    router.get("/test", (req, res) => {
        res.json({ Awesome: "It Works!!!!!" })
    });

    router.post("/testServer", (req, res) => {
        console.log("completeTransfers req", req.body)
        res.json({ Awesome: "It Works x2 !!!!!" });
    }),


 module.exports = router;