import { SeverityLevel } from 'mongodb';

export interface IAuditLog {
  severity: string;
  message: string;
}

export interface IAuditLogMessage {
  severity: SeverityLevel;
  message: string;
  saveToDb: boolean;
}

export interface IAddAuditLog extends IAuditLogMessage {}

export interface IAuditLogService {
  insertAuditlog: (
    addAuditlog: IAddAuditLog,
    saveToDb: boolean
  ) => Promise<boolean>;
  debug: (logMessage: IAuditLogMessage) => void;
  error: (logMessage: IAuditLogMessage) => void;
  info: (logMessage: IAuditLogMessage) => void;
  log: (logMessage: IAuditLogMessage) => void;
  warn: (logMessage: IAuditLogMessage) => void;
}
