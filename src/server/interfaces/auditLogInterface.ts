import { SeverityLevel } from "mongodb";

export interface IAuditLog {
  severity: SeverityLevel;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IAuditLogMessage {
  severity: SeverityLevel;
  message: string;
}

export interface IAddAuditLog extends IAuditLog {}

export interface IAuditLogService {
  insertAuditlog: (addAuditlog: IAddAuditLog) => Promise<boolean>;
  debug: (logMessage: IAuditLogMessage) => void;
  error: (logMessage: IAuditLogMessage) => void;
  info: (logMessage: IAuditLogMessage) => void;
  log: (logMessage: IAuditLogMessage) => void;
  warn: (logMessage: IAuditLogMessage) => void;
}
