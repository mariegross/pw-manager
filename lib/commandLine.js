function readCommandLineArguments() {
  return process.argv.slice(2);
}

exports.readCommandLineArguments = readCommandLineArguments;

// das process Objekt brauche ich, um auf die command line arguments (argv) zugreifen zu können. Das process Objekt liefert die argv-property: es ist ein array, das alle command line arguments liefert. Slicen müssen wir, damit uns nicht die beiden Pfade angegeben werden, sondern nur die Argumente, die wir in die command line schreiben.
