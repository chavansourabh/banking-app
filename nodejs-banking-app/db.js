const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "15382297sc",
  database: "bankdb",
  port: 5432,
});

client.connect((err, db) => {
  if (err) {
    console.log("\n ❌ Error in Connectivity");
    return;
  }
  console.log("\n ✅Connected successfully");
});
