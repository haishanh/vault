import type { DecryptOptions } from "./types";
import * as vault from "@hsjs/vault";
import { handleInputOpts, handleOutputOpts } from "./common";

async function decryptImpl(opts: DecryptOptions) {
  const [password, ciphertext] = await handleInputOpts(opts, "decrypt");
  let result = vault.decrypt(password, ciphertext, {
    b64Input: opts["b64-input"],
    b64Output: opts["b64-output"],
  });
  await handleOutputOpts(result, opts);
}

export async function decrypt(opts: DecryptOptions) {
  try {
    await decryptImpl(opts);
  } catch (e) {
    handleError(e);
  }
}

function handleError(e: Error) {
  if (e instanceof vault.SjclCorruptException) {
    console.error("Incorrect password or corrupted ciphertext");
  } else {
    console.error(e);
  }
  process.exit(1);
}
