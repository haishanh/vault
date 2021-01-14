import { handleInputOpts, handleOutputOpts } from "./common";
import type { EncryptOptions } from "./types";
import * as vault from "@hsjs/vault";

async function encryptImpl(opts: EncryptOptions) {
  const [password, plaintext] = await handleInputOpts(opts, "encrypt");
  let result = vault.encrypt(password, plaintext, {
    b64Input: opts["b64-input"],
    b64Output: opts["b64-output"],
  });
  await handleOutputOpts(result, opts);
}

export async function encrypt(opts: EncryptOptions) {
  try {
    await encryptImpl(opts);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
