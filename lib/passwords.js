const fs = require("fs").promises;
//promises müssen wir verwenden, weil wir nicht garantieren können, dass es die Dateien gibt
//mit promises verwenden wir readFile und nicht readFileSync, dadurch brauchen wir auch async functions und awaits
const cryptoJS = require("crypto-js");

async function readPasswordSafe() {
  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");
  const passwordSafe = JSON.parse(passwordSafeJSON);
  return passwordSafe;
}
// die Passwörter in db.json werden ausgelesen (readFile)
// da sie in JSON ausgelesen werden, müssen wir sie parsen (um daraus JS zu machen?)
// geparstes Passwort soll ausgegeben werden

async function writePasswordSafe(passwordSafe) {
  await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
}
// das geparsete Passwort muss in einen String umgewandelt werden
// als String wird es in der db.json angezeigt

async function getPassword(passwordName) {
  const passwordSafe = await readPasswordSafe();
  const passwordBytes = cryptoJS.AES.decrypt(
    passwordSafe[passwordName],
    "0000"
  );
  return passwordBytes.toString(cryptoJS.enc.Utf8);
}
//

async function setPassword(passwordName, newPasswordValue) {
  const passwordSafe = await readPasswordSafe();
  passwordSafe[passwordName] = cryptoJS.AES.encrypt(
    newPasswordValue,
    "0000"
  ).toString();
  await writePasswordSafe(passwordSafe);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
