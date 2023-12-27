export interface IGoogleUser {
  readonly sub: string;
  readonly name: string;
  readonly given_name: string;
  readonly family_name: string;
  readonly picture: string;
  readonly email: string;
  readonly email_verified: boolean;
  readonly locale: string;
  readonly hd: string;
}

export interface IDiscordUser {
  readonly id: string;
  readonly username: string;
  readonly discriminator: string;
  readonly avatar: string | null;
  readonly bot?: boolean;
  readonly system?: boolean;
  readonly mfa_enabled?: boolean;
  readonly locale?: string;
  readonly verified?: boolean;
  readonly email?: string | null;
  readonly flags?: number;
  readonly premium_type?: number;
  readonly public_flags?: number;
}
