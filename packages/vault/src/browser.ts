import { encode, decode } from "./b64.browser";
import * as core from "./core";
import { VaultOptions } from "./types";

export function encrypt(
  password: string,
  plaintext: string,
  opts: VaultOptions = {}
): string {
  return core.encrypt(password, plaintext, opts, encode, decode);
}

export function decrypt(
  password: string,
  ciphertext: string,
  opts: VaultOptions = {}
): string {
  return core.decrypt(password, ciphertext, opts, encode, decode);
}
