const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = new express();
const dotenv = require("dotenv").config();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const pool = require("./routes/connection");
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    allowedHeaders: [
      "sessionId",
      "Content-Type",
      "Authorization",
      "authorization", 
    ],
    exposedHeaders: ["sessionId"],
    // 'origin': ['https://cape-projects.co.za', 'https://www.cape-projects.co.za', 'https://cape-projectsbe.co.za', 'https://www.cape-projectsbe.co.za'],
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
    preflightContinue: false,
  })
);

// 'origin': ['https://eccentrictoad.com', 'https://www.eccentrictoad.com'],

// const emitter = new EventEmitter()
// emitter.setMaxListeners(0)

// set static save directory
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.static('public'))
// app.use("/public", express.static(path.join(__dirname, 'public')));

// routes
const investorroutes = require("./routes/investorroutes");

app.use(
  investorroutes
);

// port start listening
app.listen(port, () => {
  console.log(chalk.bold.red(`Connor's Investor App listening on port: ${port}`));
});
