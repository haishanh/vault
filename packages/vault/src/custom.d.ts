declare module "sjcl" {
  export function encrypt(password: string, plaintext: string): string;
  export function decrypt(password: string, ciphertext: string): string;

  interface ExceptionCorrupt {}

  export const exception: {
    corrupt: { new (message: string): ExceptionCorrupt };
  };
}
