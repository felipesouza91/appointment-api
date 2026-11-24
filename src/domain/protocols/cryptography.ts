export interface Cryptography {
  encrypt: (value: string) => Promise<string>;
  compare: (value: string, hashed: string) => Promise<boolean>;
}
