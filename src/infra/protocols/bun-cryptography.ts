import type { Cryptography } from "@src/domain/protocols/cryptography";

export class BunCryptography implements Cryptography {
  async encrypt(value: string): Promise<string> {
    return await Bun.password.hash(value);
  }
  async compare(value: string, hashed: string): Promise<boolean> {
    return await Bun.password.verify(value, hashed);
  }
}
