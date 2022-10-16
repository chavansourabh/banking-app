const { resolve } = require("path");
const readline = require("readline");
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

const ip = () => {
  return new Promise((resolve, reject) => {
    rl.question("\n Enter Your Choice : ", (value) => {
      resolve(value);
    });
  });
};

const start = async () => {
  while (true) {
    const choice = await ip();

    if (choice == 1) {
      console.log("Creating account");
    } else if (choice == 2) {
      console.log("Money Deposited");
    } else if (choice == 3) {
      console.log("Money Withdraw");
    } else if (choice == 4) {
      console.log("Check Balance");
    } else if (choice == 5) {
      console.log("Money Transfered");
    } else if (choice == 6) {
      console.log("Exiting");
      process.exit();
    } else if (choice > 6) {
      console.log("Please Enter valid number");
      process.exit();
    }
  }
};

start();
