export type InputOptions = {
  "input-str"?: string;
  "input-file"?: string;
  "vault-password-file"?: string;
  "vault-password"?: string;
};

export type EncodingOptions = {
  "b64-input"?: boolean;
  "b64-output"?: boolean;
};

export type OutputOptions = {
  "output-file"?: string;
};

export type EncryptOptions = InputOptions & OutputOptions & EncodingOptions;

export type DecryptOptions = EncryptOptions;
