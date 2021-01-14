import sjcl from "sjcl";
import { VaultOptions } from "./types";

const defaultOptions = { b64Input: false, b64Output: false };

type B64EncodeFunc = (x: string) => string;
type B64DecodeFunc = B64EncodeFunc;

function b64d(predict: boolean, input: string, decode: B64DecodeFunc) {
  return predict ? decode(input) : input;
}

function b64e(predict: boolean, input: string, encode: B64EncodeFunc) {
  return predict ? encode(input) : input;
}

export function encrypt(
  password: string,
  plaintext: string,
  opts: VaultOptions = {},
  b64EncodeFn: B64EncodeFunc,
  b64DecodeFn: B64DecodeFunc
): string {
  const options = { ...defaultOptions, ...opts };
  const plaintext2 = b64d(options.b64Input, plaintext, b64DecodeFn);
  return b64e(
    options.b64Output,
    sjcl.encrypt(password, plaintext2),
    b64EncodeFn
  );
}

export function decrypt(
  password: string,
  ciphertext: string,
  opts: VaultOptions = {},
  b64EncodeFn: B64EncodeFunc,
  b64DecodeFn: B64DecodeFunc
): string {
  const options = { ...defaultOptions, ...opts };
  const ciphertext2 = b64d(options.b64Input, ciphertext, b64DecodeFn);
  return b64e(
    options.b64Output,
    sjcl.decrypt(password, ciphertext2),
    b64EncodeFn
  );
}

export const SjclCorruptException = sjcl.exception.corrupt;
