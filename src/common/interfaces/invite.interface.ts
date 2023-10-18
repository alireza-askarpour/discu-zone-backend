export enum ExpiresAtEnum {
  'ThirtyMinutes' = 1.8e6,
  'OneHour' = 3.6e6,
  'SixHour' = 2.16e7,
  'TwelveHour' = 4.32e7,
  'OneDays' = 8.64e7,
  'SevenDays' = 6.048e8,
  Never = null,
}

export interface CreateInviteInput {
  inviterId: string;
  serverId: string;
  expiresAt?: number;
  maxUse?: number;
}
