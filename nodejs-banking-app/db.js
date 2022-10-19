const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "15382297sc",
  database: "bankdb",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log("\n ❌ Error in Connectivity");
    return;
  }
  console.log("\n ✅Connected successfully");
});

//  ------------ TO CREATE ACCOUNT ----------------
const createNewAccount = ({ acId, acNm, balance }, onCreate = undefined) => {
  client.query(
    `INSERT INTO account VALUES ($1 , $2 ,$3)`,
    [acId, acNm, balance],
    (err, res) => {
      if (err) console.log(`\n ❌ Problem in Creating the customer`);
      else {
        console.log("\n ✅ New Customer Created Succesfully");
        if (onCreate) {
          onCreate(`\n ✅ Account created successfully`);
        }
      }
    }
  );
};

// ----------- TO WITHDRAW MONEY------------------
const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
  client.query(
    `select balance from account where ac_id = $1 `,
    [acId],
    (err, res) => {
      if (err) {
        console.log("\n ❌ Problem in withdrawing");
      } else {
        const balance = parseFloat(res.rows[0].balance);

        const newBalance = balance - amount;
        if (newBalance >= 0) {
          client.query(
            `update account set balance = $1 where ac_id = $2`,
            [newBalance, acId],
            (err, res) => {
              if (err) console.log("\n ❌ Problem in withdrawing");
              else {
                console.log(`\n ✅ Amount ${amount} Withdraw succesfully`);
                if (onWithdraw) {
                  onWithdraw(`\n ✅ Amount ${amount} Withdraw succesfully`);
                }
              }
            }
          );
        } else console.log("\n ❌ Insufficient balance");
      }
    }
  );
};

// -------------- TO DEPOSITE MONEY ---------------------------
const deposite = ({ acId, amount }, onDeposite = undefined) => {
  client.query(
    `select balance from account where ac_id = $1 `,
    [acId],
    (err, res) => {
      if (err) {
        console.log("\n ❌ Problem in Depositing");
      } else {
        const balance = parseFloat(res.rows[0].balance);

        const newBalance = balance + amount;

        client.query(
          `update account set balance = $1 where ac_id = $2`,
          [newBalance, acId],
          (err, res) => {
            if (err) console.log("\n ❌ Problem in Depositing");
            else {
              console.log(`\n ✅ Amount ${amount} Deposited succesfully`);
              if (onDeposite)
                onDeposite(`\n ✅ Amount ${amount} Deposited succesfully`);
            }
            client.query(
              `select balance from account where ac_id = $1 `,
              [acId],
              (err, res) => {
                const balance = parseFloat(res.rows[0].balance);
                console.log(`
              \n Now Your Existing Balance is ${balance}`);
              }
            );
          }
        );
      }
    }
  );
};
// -------------- TO TRANSFER MONEY ---------------------------

const transfer = ({ srcId, destId, amount }, onTransfer = undefined) => {
  // client.query(
  //   `select balance from account where ac_id = $1`,
  //   [srcId],
  //   (err, res) => {
  //     if (err) {
  //       console.log("Enter valid id");
  //     } else {
  //       const srcbal = parseFloat(res.rows[0].balance);

  //       client.query(
  //         `select balance from account where ac_id = $1`,
  //         [destId],
  //         (err, res) => {
  //           if (err) {
  //             console.log("Enter valid id");
  //           } else {
  //             const destBal = parseFloat(res.rows[0].balance);

  //             const newSrcBal = srcbal - amount;
  //             const newDestBal = destBal + amount;

  //             client.query(
  //               `update account set balance = $1 where ac_id = $2`,
  //               [newSrcBal, srcId],
  //               (err, res) => {
  //                 if (err) {
  //                   console.log("\n ❌ Transaction failed");
  //                 }
  //                 console.log(
  //                   `\n ${amount} is debited from your account number ${srcId}`
  //                 );
  //                 client.query(
  //                   `update account set balance = $1 where ac_id = $2`,
  //                   [newDestBal, destId],
  //                   (err, res) => {
  //                     if (err) {
  //                       console.log("\n ❌ Transaction failed");
  //                     } else
  //                       console.log(
  //                         `\n ${amount} is credited in your account number ${destId}`
  //                       );
  //                   }
  //                 );
  //               }
  //             );
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
  withdraw({ acId: srcId, amount }, (msgWd) => {
    deposite({ acId: destId, amount }, (msgDp) => {
      if (onTransfer) {
        onTransfer(`✅ Amount ${amount} Transfer Successfully`);
      }
    });
  });
};

// -------------- TO CHECK BALANCE ---------------------------

const checkBalance = (acId, onBalance = undefined) => {
  client.query(
    `select balance from account where ac_id = $1`,
    [acId],
    (err, res) => {
      if (err) {
        console.log("\n ❌ Problem in Fetching the balance");
      } else {
        const balance = parseFloat(res.rows[0].balance);
        console.log(`\n Your Existing Balance is ${balance}`);
        if (onBalance) onBalance(balance);
      }
    }
  );
};

module.exports = {
  createNewAccount,
  withdraw,
  deposite,
  transfer,
  checkBalance,
};
