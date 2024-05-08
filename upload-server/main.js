const express = require("express");
const { deploy } = require("./routes/deploy");
process.env.ENVIRIOMENT !== "production" && require("dotenv").config();

const app = express();

app.use(express.json());

app.post("/deploy", deploy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
