export function decode(str: string) {
  return Buffer.from(str, "base64").toString();
}

export function encode(str: string) {
  return Buffer.from(str).toString("base64");
}
