import { IAddAuditLog } from "../interfaces/auditLogInterface";
import { auditLogModel } from "../models/auditloggModel";

export class AuditLogRepository {
  constructor() {}

  /**
   * add audit log
   * @param addAuditlog
   */
  addAuditlog = async (addAuditlog: IAddAuditLog) => {
    await auditLogModel.insertOne(addAuditlog);
  };
}
