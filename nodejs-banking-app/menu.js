const readline = require("readline");
const {
  createNewAccount,
  withdraw,
  deposite,
  transfer,
  checkBalance,
} = require("./db");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🙏 Welcome to banking app 🙏");
console.log("\n 1. Create new account");
console.log("\n 2. Deposite Money");
console.log("\n 3. Withdraw Money");
console.log("\n 4. Check Balance");
console.log("\n 5. Transfer Money");
console.log("\n 6. Exit");

const ip = (msg) => {
  return new Promise((resolve, reject) => {
    rl.question(`\n  👉 ${msg}:`, (value) => {
      resolve(value);
    });
  });
};

const start = async () => {
  while (true) {
    const choice = await ip("Enter Your Choice");

    if (choice == 1) {
      console.log("Create account");
      const acId = parseInt(await ip("Enter Your Account Id"));
      const acNm = await ip("Enter your name");
      const balance = 0;
      createNewAccount({ acId, acNm, balance });
    } else if (choice == 2) {
      console.log("\n ✅ Deposite Money");
      const acId = parseInt(await ip("Enter Your Account Id"));
      const amount = parseFloat(await ip("Enter Amount"));
      deposite({ acId, amount });
    } else if (choice == 3) {
      console.log("\n ✅ Withdraw Money");
      const acId = parseInt(await ip("Enter Your Account Id"));
      const amount = parseFloat(await ip("Enter Amount"));
      withdraw({ acId, amount });
    } else if (choice == 4) {
      console.log("\n ✅ Check Balance");
      const acId = parseInt(await ip("Enter Your Account Id"));
      checkBalance(acId);
    } else if (choice == 5) {
      console.log("\n ✅ Transfer Money");
      const srcId = parseInt(await ip("Enter Your Account Id"));
      const destId = parseInt(await ip("Enter Destination Account Id"));
      const amount = parseFloat(await ip("Enter Amount"));
      transfer({ srcId, destId, amount });
    } else if (choice == 6) {
      console.log("\n Exiting");
      process.exit();
    } else if (choice > 6) {
      console.log("\n Please Enter valid number");
      process.exit();
    }
  }
};

start();
