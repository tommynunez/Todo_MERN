import { SeverityLevel } from 'mongodb';
import { AuditCategory, AuditEvent } from '../constants/AuditEvents';

export interface IAuditLog {
  severity: string;
  message: string;
  eventId: number;
  category: AuditCategory;
}

export interface IAuditLogMessage {
  severity: SeverityLevel;
  message: string;
  saveToDb: boolean;
  event: AuditEvent;
}

export interface IAddAuditLog extends IAuditLogMessage {}

export interface IAuditLogService {
  insertAuditlog: (
    addAuditlog: IAddAuditLog,
    saveToDb: boolean,
  ) => Promise<boolean>;
  debug: (logMessage: IAuditLogMessage) => void;
  error: (logMessage: IAuditLogMessage) => void;
  info: (logMessage: IAuditLogMessage) => void;
  log: (logMessage: IAuditLogMessage) => void;
  warn: (logMessage: IAuditLogMessage) => void;
}
