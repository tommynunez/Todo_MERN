export const InviteStatuses = {
  Pending: "pending",
  Accepted: "accepted",
  Revoked: "revoked",
  Expired: "expired",
} as const;

export type InviteStatus = (typeof InviteStatuses)[keyof typeof InviteStatuses];
