import { SeverityLevel } from "mongodb";

export interface IAuditLog {
  severity: string;
  message: string;
}

export interface IAuditLogMessage {
  severity: SeverityLevel;
  message: string;
  saveToDb: Boolean;
}

export interface IAddAuditLog extends IAuditLogMessage {}

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
