# @hsjs/vault-cli

## Install

```sh
yarn global add @hsjs/vault-cli
```

## Usage

**encrypt**

```
$ vault encrypt -h

  Description
    encrypt a string or file

  Usage
    $ vault encrypt [options]

  Options
    --input-str              Input string
    -i, --input-file         Input file
    --b64-input              Flag to indicate input was base64 encoded  (default false)
    --b64-output             Enable base64'ed output  (default false)
    -o, --output-file        Output file
    --vault-password-file    Vault password file (leading and tailing spaces in the file will be trimmed)
    -p, --vault-password     Vault password (leading and tailing spaces of the string will be trimmed)
    -h, --help               Displays this message

  Examples
    $ vault encrypt --input-file .env -p passw0rd --b64-output --output-file env.enc
    $ vault encrypt --input-file .env --vault-password-file password.txt --b64-output --output-file env.enc
```

**decrypt**

```
$ vault decrypt -h

  Description
    decrypt a string or file

  Usage
    $ vault decrypt [options]

  Options
    --input-str              Input string
    -i, --input-file         Input file
    --b64-input              Flag to indicate input was base64 encoded  (default false)
    --b64-output             Enable base64'ed output  (default false)
    -o, --output-file        Output file
    --vault-password-file    Vault password file (leading and tailing spaces in the file will be trimmed)
    -p, --vault-password     Vault password (leading and tailing spaces of the string will be trimmed)
    -h, --help               Displays this message

  Examples
    $ vault decrypt --input-file env.enc -p passw0rd --b64-input --output-file env.txt
    $ vault decrypt --input-file env.enc --vault-password-file password.txt --b64-input --output-file env.txt
```
