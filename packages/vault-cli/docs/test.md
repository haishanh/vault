```bash
# test encrypt
# since *.log is in gitignore
node bin.js encrypt -i package.json --b64-output -o x.log

# test decrypt
node bin.js decrypt -i x.log --b64-input
```
