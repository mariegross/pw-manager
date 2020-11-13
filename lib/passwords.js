const fs = require("fs").promises;
//promises müssen wir verwenden, weil wir nicht garantieren können, dass es die Dateien gibt
//mit promises verwenden wir readFile und nicht readFileSync, dadurch brauchen wir auch async functions und awaits
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function getPassword(passwordName) {
  const password = await collection("passwords").findOne({
    name: passwordName,
  });

  const decryptedValue = CryptoJS.AES.decrypt(
    password.value,
    await readMasterPassword()
  );
  return decryptedValue.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  // const passwordSafe = await readPasswordSafe();
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();

  const filter = { name: passwordName };
  const update = { $set: { value: encryptedValue } };
  await collection("passwords").updateOne(filter, update, { upsert: true });
}

async function deletePassword(passwordName) {
  const filter = { name: passwordName };
  await collection("passwords").deleteOne(filter);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.deletePassword = deletePassword;
