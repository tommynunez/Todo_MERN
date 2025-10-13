export const InviteTypes = {
  Registration: "Registration",
  ChoreList: "Chorelist",
} as const;

export type InviteType = (typeof InviteTypes)[keyof typeof InviteTypes];
