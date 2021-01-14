# @hsjs/vault

## Install

```sh
yarn add @hsjs/vault
```

## Usage

```javascript
import { encrypt, decrypt } from "@hsjs/vault";

encrypt("SecretPassw0rd", "YourPlaintext", { b64Output: true });
// returns "eyJpdiI6...itTdklKeFlmc1RTcz0ifQ=="

decrypt("SecretPassw0rd", "eyJpdiI6...itTdklKeFlmc1RTcz0ifQ==", {
  b64Input: true,
});
// returns "YourPlaintext"
```

## API

**encrypt**

```typescript
function encrypt(
  password: string,
  plaintext: string,
  opts: VaultOptions = {}
): string;

type VaultOptions = { b64Input?: boolean; b64Output?: boolean };
```

**decrypt**

```typescript
function decrypt(
  password: string,
  ciphertext: string,
  opts: VaultOptions = {}
): string;

type VaultOptions = { b64Input?: boolean; b64Output?: boolean };
```
