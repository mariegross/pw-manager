const { readCommandLineArguments } = require("./lib/commandLine");
const { connect, close } = require("./lib/database");
const { getPassword, setPassword, deletePassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
require("dotenv").config();
// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");

async function run() {
  console.log("Connecting to database...");
  await connect(
    `mongodb+srv://${process.env.MONGODB_PASSWORD}@cluster0.5v6ea.mongodb.net/pw-manager?retryWrites=true&w=majority`,
    "pw-manager"
  );
  console.log("Connected to database.");

  const masterPassword = await askForMasterPassword();
  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.error("Password is incorrect.");
    return run();
  }

  const [passwordName, newPasswordValue] = readCommandLineArguments();
  if (!passwordName) {
    console.error("Missing password name!");
    return process.exit(9);
  }

  if (passwordName === "delete") {
    const passwordToDelete = newPasswordValue;
    await deletePassword(passwordToDelete);
    console.log("Password is deleted.");
  } else if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} is set.`);
  } else {
    const passwordValue = await getPassword(passwordName);
    console.log(`Your password is ${passwordValue}.`);
  }
  await close();
}
run();
