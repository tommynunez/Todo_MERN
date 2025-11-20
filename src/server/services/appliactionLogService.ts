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
  insertAuditlog = async (addAuditlog: IAddAuditLog) => {
    try {
      await this.auditLogRepository.addAuditlog(addAuditlog);
      return true;
    } catch (error: any) {
      this.error(error);
      return false;
    }
  };

  debug = (logMessage: IAuditLogMessage) => {
    this.insertAuditlog(logMessage);
    console.debug("Application Debug Log: ", logMessage);
  };
  error = (logMessage: IAuditLogMessage) => {
    console.error("Application Error Log: ", logMessage);
  };
  info = (logMessage: IAuditLogMessage) => {
    console.info("Application Information Log: ", logMessage);
  };
  log = (logMessage: IAuditLogMessage) => {
    console.log("Application Log: ", logMessage);
  };
  warn = (logMessage: IAuditLogMessage) => {
    console.warn("Application Warm Log: ", logMessage);
  };
}
