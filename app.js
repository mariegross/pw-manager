// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

// const args = require("minimist")(process.args.slice(2));
// args["wifi"];

const inquirer = require("inquirer");
const mpw = "0000";
const questions = [
  {
    type: "password",
    name: "masterPassword",
    message: "What's your password?",
  },
];

inquirer.prompt(questions).then((answers) => {
  if (answers.masterPassword === mpw) {
    console.log("Password is correct.");
  } else {
    console.log("Password is incorrect.");
  }
});

// const args = process.argv.slice(2);
// const passwordName = args[0];
// console.log(`You want to know the password of '${passwordName}'?`);

// console.log((wifi = 123));
