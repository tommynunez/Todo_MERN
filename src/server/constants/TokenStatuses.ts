export const TokenStatuses = {
  Pending: "pending",
  Accepted: "accepted",
  Revoked: "revoked",
  Expired: "expired",
} as const;

export type TokenStatus = (typeof TokenStatuses)[keyof typeof TokenStatuses];
