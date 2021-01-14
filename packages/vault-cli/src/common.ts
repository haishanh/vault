import { promises as fs } from "fs";
import { resolve } from "path";
import type { InputOptions, OutputOptions } from "./types";
import { askForNewPassword, askForPassword } from "./password";

export async function fromFileOrString(
  filepath: string | undefined,
  str: string | undefined
): Promise<string | undefined> {
  if (filepath) {
    return await fs.readFile(resolve(filepath), "utf8");
  } else if (str) {
    return str;
  }
}

export async function writeFile(filepath: string, cnt: string) {
  return await fs.writeFile(resolve(filepath), cnt, "utf8");
}

export async function handleInputOpts(opts: InputOptions, type: string) {
  // plaintext

  let plaintext = await fromFileOrString(opts["input-file"], opts["input-str"]);

  if (!plaintext) {
    throw new Error("input is needed");
  }

  // password

  let password = await fromFileOrString(
    opts["vault-password-file"],
    opts["vault-password"]
  );

  if (!password) {
    if (type === "encrypt") {
      password = await askForNewPassword();
    } else if (type === "decrypt") {
      password = await askForPassword();
    }
  }

  if (!password) {
    throw new Error("password is needed");
  }

  return [password, plaintext];
}

export async function handleOutputOpts(result: string, opts: OutputOptions) {
  if (opts["output-file"]) {
    await writeFile(opts["output-file"], result);
  } else {
    process.stdout.write(result);
  }
}
