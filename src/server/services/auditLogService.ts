import { SeverityLevel } from "mongodb";
import {
  IAddAuditLog,
  IAuditLogMessage,
  IAuditLogService,
} from "../interfaces/auditLogInterface";
import { AuditLogRepository } from "../repositories/auditLogRepository";

export class AuditlogService implements IAuditLogService {
  constructor(private auditLogRepository: AuditLogRepository) {}

  /**
   * Insert audit logs
   */
  insertAuditlog = async (addAuditlog: IAddAuditLog, saveToDb: Boolean) => {
    if (!saveToDb) {
      return false;
    }

    try {
      await this.auditLogRepository.addAuditlog(addAuditlog);
      return true;
    } catch (error: any) {
      this.error(error);
      return false;
    }
  };

  debug = (logMessage: IAuditLogMessage) => {
    this.insertAuditlog(
      {
        severity: logMessage.severity,
        message: logMessage.message,
      } as IAddAuditLog,
      logMessage.saveToDb
    );

    console.debug("Application Debug Log: ", logMessage);
  };

  error = (logMessage: IAuditLogMessage) => {
    this.insertAuditlog(
      {
        severity: logMessage.severity,
        message: logMessage.message,
      } as IAddAuditLog,
      logMessage.saveToDb
    );
    console.error("Application Error Log: ", logMessage);
  };

  info = (logMessage: IAuditLogMessage) => {
    this.insertAuditlog(
      {
        severity: logMessage.severity,
        message: logMessage.message,
      } as IAddAuditLog,
      logMessage.saveToDb
    );
    console.info("Application Information Log: ", logMessage);
  };

  log = (logMessage: IAuditLogMessage) => {
    this.insertAuditlog(
      {
        severity: logMessage.severity,
        message: logMessage.message,
      } as IAddAuditLog,
      logMessage.saveToDb
    );

    console.log("Application Log: ", logMessage);
  };

  warn = (logMessage: IAuditLogMessage) => {
    this.insertAuditlog(
      {
        severity: logMessage.severity,
        message: logMessage.message,
      } as IAddAuditLog,
      logMessage.saveToDb
    );
    console.warn("Application Warm Log: ", logMessage);
  };
}
