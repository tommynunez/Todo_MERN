import { Schema, model } from "mongoose";
import { IAuditLog } from "../interfaces/auditLogInterface";
import { SeverityLevel } from "mongodb";

export const auditLogSchema = new Schema<IAuditLog>(
  {
    severity: { Type: SeverityLevel, required: true },
    message: { Type: String, required: true },
  },
  { timestamps: true }
);

export const auditLogModel = model<IAuditLog>("AuditLogs", auditLogSchema);
