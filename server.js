require("dotenv").config();
const express = require("express");
const { getPassword, setPassword } = require("./lib/passwords");
const { connect } = require("./lib/database");
const path = require("path");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3100;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const passwordValue = await getPassword(name);
    if (!passwordValue) {
      response
        .status(404)
        .send("Could not find the password you have specified.");
      return;
    }
    response.send(passwordValue);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured.");
  }
});

app.post("/api/passwords/", async (request, response) => {
  const password = request.body;

  try {
    await setPassword(password.name, password.value);
    response.send(`Successfully set ${password.name}`);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later.");
  }
});

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGODB_URI, process.env.MONGODB_NAME);
  console.log("Successfully connected to database.");

  app.listen(port, () => {
    console.log(`Pw-manager API is listening at https://localhost:${port}`);
  });
}

run();
