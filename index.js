const express = require("express");
const cors = require("cors");
const xssClean = require("xss-clean");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { failed } = require("./src/helper/response");
require("dotenv").config();
const app = express();
app.use(xssClean());
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
// router here
app.use(require("./src/router/category.route"));
app.use(require("./src/router/product.route"));
app.use(require("./src/router/transaction.route"));
app.use(require("./src/router/auth.route"));
app.use(require("./src/router/buyer.route"));
app.use(require("./src/router/seller.route"));
app.get("/", (req, res) => {
  res.json(`Tukushop API
  Made with ❤️ by Denny Wahyu Prasetyo
  `);
});
app.all("*", (req, res) => {
  failed(res, {
    code: 503,
    status: "error",
    message: `Service unavailable`,
    error: [],
  });
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  //console.clear();
  console.log(`service RUN at port ${PORT}`);
});
