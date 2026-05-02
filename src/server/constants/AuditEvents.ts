export const AuditCategories = {
  Authentication: 'Authentication',
  Todo: 'Todo',
  ChoreList: 'ChoreList',
  Invite: 'Invite',
} as const;

export type AuditCategory =
  (typeof AuditCategories)[keyof typeof AuditCategories];

export const AuditEvents = {
  // Authentication — 1000s
  Authentication: {
    SIGNUP: { eventId: 1001, category: AuditCategories.Authentication },
    SIGNIN: { eventId: 1002, category: AuditCategories.Authentication },
    SIGNOUT: { eventId: 1003, category: AuditCategories.Authentication },
    EMAIL_CONFIRMED: {
      eventId: 1004,
      category: AuditCategories.Authentication,
    },
    PASSWORD_RESET: { eventId: 1005, category: AuditCategories.Authentication },
    ACCOUNT_LOCKED: { eventId: 1006, category: AuditCategories.Authentication },
    FORGOT_PASSWORD: {
      eventId: 1007,
      category: AuditCategories.Authentication,
    },
  },

  // Todo — 2000s
  Todo: {
    CREATED: { eventId: 2001, category: AuditCategories.Todo },
    UPDATED: { eventId: 2002, category: AuditCategories.Todo },
    DELETED: { eventId: 2003, category: AuditCategories.Todo },
  },

  // ChoreList — 3000s
  ChoreList: {
    CREATED: { eventId: 3001, category: AuditCategories.ChoreList },
    UPDATED: { eventId: 3002, category: AuditCategories.ChoreList },
    DELETED: { eventId: 3003, category: AuditCategories.ChoreList },
  },

  // Invite — 4000s
  Invite: {
    SENT: { eventId: 4001, category: AuditCategories.Invite },
    ACCEPTED: { eventId: 4002, category: AuditCategories.Invite },
    REVOKED: { eventId: 4003, category: AuditCategories.Invite },
    EXPIRED: { eventId: 4004, category: AuditCategories.Invite },
  },
} as const;

export type AuditEvent = {
  eventId: number;
  category: AuditCategory;
};
