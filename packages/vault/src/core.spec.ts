import { encrypt, decrypt, SjclCorruptException } from "./core";

function identity<T extends string>(x: T): T {
  return x;
}

describe("core", () => {
  describe("encrypt", () => {
    it("without encoding", () => {
      const ret = encrypt("password", "plaintext", {}, identity, identity);
      expect(ret).toBeTruthy();
      // sjcl details
      const j = JSON.parse(ret);
      expect(j.v).toEqual(1);
      expect(j.mode).toEqual("ccm");
      expect(j.cipher).toEqual("aes");
    });

    it("b64 decode fn should be called with encoded input", () => {
      const enc = jest.fn(identity);
      const dec = jest.fn(identity);
      const ret = encrypt("p", "t", { b64Input: true }, enc, dec);
      expect(ret).toBeTruthy();
      expect(enc).toHaveBeenCalledTimes(0);
      expect(dec).toHaveBeenCalledTimes(1);
    });

    it("b64 encode fn should be called if output needs encoding", () => {
      const enc = jest.fn(identity);
      const dec = jest.fn(identity);
      const ret = encrypt("p", "t", { b64Output: true }, enc, dec);
      expect(ret).toBeTruthy();
      expect(enc).toHaveBeenCalledTimes(1);
      expect(dec).toHaveBeenCalledTimes(0);
    });
  });

  describe("decrypt", () => {
    it("should work", () => {
      const ret = encrypt("password", "plaintext", {}, identity, identity);
      const x = decrypt("password", ret, {}, identity, identity);
      expect(x).toBe("plaintext");
    });

    it("corrupted ciphertext", () => {
      const ret = encrypt("password", "plaintext", {}, identity, identity);
      expect(() => decrypt("wrongpass", ret, {}, identity, identity)).toThrow(
        SjclCorruptException
      );
    });
  });
});
