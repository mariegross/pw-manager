// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

// const args = require("minimist")(process.args.slice(2));
// args["wifi"];

const inquirer = require("inquirer");
const fs = require("fs").promises;

const mpw = "0000";

const questions = [
  {
    type: "password",
    name: "masterPassword",
    message: "What's your password?",
  },
  //   {
  //     type: "password",
  //     name: "masterPassword",
  //     message: "What's your password?",
  //   },
];

async function validateAccess() {
  const { masterPassword } = await inquirer.prompt(questions);
  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");
  const passwordSafe = JSON.parse(passwordSafeJSON);

  // inquirer.prompt(questions).then((answers) => {
  if (masterPassword !== mpw) {
    console.error("Password is incorrect.");
    validateAccess();
    return;
  }

  const args = process.argv.slice(2);
  const passwordName = args[0];
  const newPasswordValue = args[1];

  if (newPasswordValue) {
    passwordSafe[passwordName] = newPasswordValue;
    fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
  } else {
    console.log(`You want to know the password of '${passwordName}'.`);
    const password = passwordSafe[passwordName];
    if (password) {
      console.log(`Password is ${password}`);
    } else {
      console.log("Unknown password.");
    }
  }
}
validateAccess();

//   try {
//     const data = JSON.parse(fs.readFileSync("./db.json", "utf8"));
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// });

// const args = process.argv.slice(2);
// const passwordName = args[0];
// console.log(`You want to know the password of '${passwordName}'?`);

// console.log((wifi = 123));
