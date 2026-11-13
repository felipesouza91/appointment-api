import type { SignInInput, SignInResult } from "@src/domain/models/auth";
import type { Cryptography } from "@src/domain/protocols/cryptography";
import type { Token } from "@src/domain/protocols/token";
import type { UserRepository } from "@src/domain/repository/users/user-repository";

interface SignInUseCaseProps {
  userRepository: UserRepository;
  crypto: Cryptography;
  token: Token;
}

export class SignInUseCase {
  private userRepository: UserRepository;
  private crypto: Cryptography;
  private token: Token;
  constructor({ crypto, userRepository, token }: SignInUseCaseProps) {
    this.userRepository = userRepository;
    this.crypto = crypto;
    this.token = token;
  }

  async execute({ email, password }: SignInInput): Promise<SignInResult> {
    const user = await this.userRepository.findyByEmail(email);
    if (!user) {
      throw new Error("Email/password invalid");
    }
    const passwordCorrect = await this.crypto.compare(password, user.password);
    if (!passwordCorrect) {
      throw new Error("Email/password invalid");
    }
    const token = this.token.sing({ id: user.id });
    return {
      accessToken: token,
    };
  }
}
