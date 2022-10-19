const express = require("express");
const app = express();
const port = 3000;

const {
  createNewAccount,
  withdraw,
  deposite,
  transfer,
  checkBalance,
} = require("./db");

app.post("/create", express.json(), (req, res) => {
  createNewAccount(req.body, (msg) => {
    res.json({ sts: "Success", msg });
  });
});
app.put("/deposite", express.json(), (req, res) => {
  deposite(req.body, (msg) => {
    res.json({ sts: "success", msg });
  });
});

app.put("/withdraw", express.json(), (req, res) => {
  withdraw(req.body, (msg) => {
    res.json({ sts: "Success", msg });
  });
});

app.put("/transfer", express.json(), (req, res) => {
  transfer(req.body, (msg) => {
    res.json({ sts: "Success", msg });
  });
});

app.get("/balance/:acId", (req, res) => {
  console.log(req.params);
  const acId = req.params.acId;
  checkBalance(acId, (bal) => {
    res.json({ bal });
  });
});

app.listen(port, () => {
  console.log(`Banking App listening on port : ${port}`);
});
