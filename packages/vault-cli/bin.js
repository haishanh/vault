#!/usr/bin/env node

const sade = require("sade");
const { encrypt, decrypt } = require("./dist/main");
const pkg = require("./package");

const prog = sade("vault");

prog.version(pkg.version);

const options = [
  ["--input-str", "Input string"],
  ["-i, --input-file", "Input file"],
  ["--b64-input", "Flag to indicate input was base64 encoded", false],
  ["--b64-output", "Enable base64'ed output", false],
  ["-o, --output-file", "Output file"],
  [
    "--vault-password-file",
    "Vault password file (leading and tailing spaces in the file will be trimmed)",
  ],
  [
    "-p, --vault-password",
    "Vault password (leading and tailing spaces of the string will be trimmed)",
  ],
];

const commands = [
  {
    command: "encrypt",
    describe: "encrypt a string or file",
    examples: [
      "encrypt --input-file .env -p passw0rd --b64-output --output-file env.enc",
      "encrypt --input-file .env --vault-password-file password.txt --b64-output --output-file env.enc",
    ],
    options,
    action: encrypt,
  },
  {
    command: "decrypt",
    describe: "decrypt a string or file",
    examples: [
      "decrypt --input-file env.enc -p passw0rd --b64-input --output-file env.txt",
      "decrypt --input-file env.enc --vault-password-file password.txt --b64-input --output-file env.txt",
    ],
    options,
    action: decrypt,
  },
];

function enableCommand(cmd, prog) {
  let p = prog.command(cmd.command).describe(cmd.describe);
  const examples = cmd.examples;
  for (let i = 0; i < examples.length; i++) {
    p = p.example(examples[i]);
  }
  const options = cmd.options;
  for (let i = 0; i < options.length; i++) {
    p = p.option(...options[i]);
  }
  p = p.action(cmd.action);
  return p;
}

function enableCommands(cmds, prog) {
  let p = prog;
  for (let i = 0; i < cmds.length; i++) {
    p = enableCommand(cmds[i], p);
  }
  return p;
}

enableCommands(commands, prog).parse(process.argv, {
  string: ["vault-password"],
});
