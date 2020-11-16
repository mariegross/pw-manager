require("dotenv").config();
const express = require("express");
const { getPassword } = require("./lib/passwords");
const { connect } = require("./lib/database");
const { request } = require("express");

const app = express();
const port = 3100;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  const passwordValue = await getPassword(name);
  response.send(passwordValue);
});

app.post("/api/passwords", (request, response) => {
  response.send("Under construction");
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGODB_URI, process.env.MONGODB_NAME);
  console.log("Connected to database.");

  app.listen(port, () => {
    console.log(`Pw-manager API is listening at http://localhost:${port}`);
  });
}

run();
