export const Roles = {
  Viewer: "viewer",
  Editor: "editor",
  Owner: "owner",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
