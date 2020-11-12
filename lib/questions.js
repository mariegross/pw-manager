const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt([
    {
      type: "input",
      name: "masterPassword",
      message: "Type in master password.",
    },
  ]);
  return masterPassword;
}

exports.askForMasterPassword = askForMasterPassword;
