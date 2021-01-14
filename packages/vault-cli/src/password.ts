import * as rl from "./readline";

function transformPassword(value: string): string {
  if (value && value.trim()) {
    return value.trim();
  }
  throw new rl.RLError("It can not be empty.\nLet's try again.\n");
}

const passwordQ = {
  type: "password",
  transform: transformPassword,
};

export async function askForNewPassword(): Promise<string> {
  const answers = await rl.create([
    { ...passwordQ, name: "password", message: "New Vault password" },
    {
      ...passwordQ,
      name: "confirmPassword",
      message: "Confirm New Vault password",
    },
  ]);
  const p = answers.password;
  const cp = answers.confirmPassword;
  if (p !== cp) {
    throw new Error("ERROR! Passwords do not match");
  }
  return p;
}

export async function askForPassword(): Promise<string> {
  const answers = await rl.create([
    { ...passwordQ, name: "password", message: "Vault password" },
  ]);
  return answers.password.trim();
}
