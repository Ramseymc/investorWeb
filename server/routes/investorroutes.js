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

// Server Methods
router.get("/test", (req, res) => {
    res.json({ Awesome: "It Works!!!!!" })
});

router.post("/testServer", (req, res) => {
    console.log("completeTransfers req", req.body)
    res.json({ Awesome: "It Works x2 !!!!!" });
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
                person_mode

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
                '${req.body.person}'

                )`
    // + the 'let' file variables

}),

router.post("/getAllInvestors", (req, res) => {

    let mysql = `select * from investors i`

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send("Error with connection");
        }
        connection.query(mysql, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                res.json(result);
            }
        });
        connection.release();
    });
}),

router.post("/getAllInvestments", (req, res) => {
    console.log("ESYYY",req.body)

    let mysql = `select * from investors i join investments iv on iv.investor_id = i.investor_id where iv.investment_amount > 0 and i.investor_id = ${req.body.paramId}`

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send("Error with connection");
        }
        connection.query(mysql, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                res.json(result);
            }
        });
        connection.release();
    });
}),




// create template
router.post("/completeTransfers", (req, res) => {
    console.log("completeTransfers req", req.body)
    let supplierName = ""
    let contactID = ""
    req.body.subContractor.forEach(subContract => {
        supplierName = subContract.supplierName
        contactID = subContract.contactID
    })
    console.log("XXXS", supplierName)
    console.log("XXXC", contactID)
    let mysqlPrefix = ` insert into stocktranfers (supplierName, contactID, block, unit, stockId, qtyTransfered, user, userId, stockImageUrl, transferDate) `
    let mysql = "";
    let mysql2Prefix = ` update stockitems s join purchaseorders po on po.stockId = s.id set requisitioned = IFNULL(requisitioned,0)  + `
    req.body.stockList.forEach(stockItem => {
        mysql = mysql + mysqlPrefix + ` VALUES ('${supplierName}', '${req.body.contactID}', '${req.body.block}', '${req.body.unit}',  '${stockItem.stockId}', '${stockItem.qtyToTransfer}' , '${req.body.user}','${req.body.userId}', 'public/uploads/${req.body.imageName}', '${req.body.transferDate}'); `
            + mysql2Prefix + ` ${parseInt(stockItem.qtyToTransfer)} WHERE s.id = '${stockItem.stockId}' AND po.reference = '${stockItem.mainCategory}' ;`
    })
    console.log(chalk.cyanBright("completeTransfers sql", mysql))

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send("Error with connection");
        }
        connection.query(mysql, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log("completeTransfers success")
                res.json(result);
            }
        });
        connection.release();
    });
});

// update template
router.post("/submitStockTake", (req, res) => {
    console.log("submitStockTake in server")

    let mysqlPrefix = ` insert into stocktake (stockId, itemCode, reference, qtyOnHand, qtyCounted, countCorrect, stockTakeDate, user, userId) `
    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    let mysql = "";
    //let mysql2Prefix = ` update stockitems set requisitioned = IFNULL(requisitioned,0)  + `
    req.body.StockList.forEach(stockItem => {
        mysql = mysql + mysqlPrefix + ` VALUES ('${stockItem.stockId}','${stockItem.itemCode}','${stockItem.mainCategory}',  '${stockItem.qtyOnHand}', '${stockItem.qtyCounted}' , '${stockItem.CountCorrect}', '${dateTime}', '${req.body.currentUser}',  '${req.body.currentUserId}' ); `
        //+ mysql2Prefix + ` ${parseInt(stockItem.qtyToTransfer)} WHERE id = '${stockItem.stockId}';`
    })
    console.log(chalk.greenBright("completeTransfers sql", mysql))

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send("Error with connection");
        }
        connection.query(mysql, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log("completeTransfers success")
                res.json(result);
            }
        });
        connection.release();
    });
});

// delete template
router.post("/deleteTestData", (req, res) => {
    let mysql1 = `delete from progress where task > 162`;
    let mysql2 = `delete from tasks where id > 162`;
    let mysql = `${mysql1};${mysql2}`;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send("Error with connection");
        }
        connection.query(mysql, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                res.json(result);
            }
        });
        connection.release();
    });
});

module.exports = router;