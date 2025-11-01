import { SeverityLevel } from "mongodb";

export interface IAuditLog {
  severity: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IAuditLogMessage {
  severity: SeverityLevel;
  message: string;
  saveToDb: Boolean;
}

export interface IAddAuditLog extends IAuditLog {}

export interface IAuditLogService {
  insertAuditlog: (
    addAuditlog: IAddAuditLog,
    saveToDb: Boolean
  ) => Promise<boolean>;
  debug: (logMessage: IAuditLogMessage) => void;
  error: (logMessage: IAuditLogMessage) => void;
  info: (logMessage: IAuditLogMessage) => void;
  log: (logMessage: IAuditLogMessage) => void;
  warn: (logMessage: IAuditLogMessage) => void;
}
