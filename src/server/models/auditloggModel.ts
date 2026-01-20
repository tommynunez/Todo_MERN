import { Schema, model } from "mongoose";
import { IAuditLog } from "../interfaces/auditLogInterface";

export const auditLogSchema = new Schema<IAuditLog>(
  {
    severity: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const auditLogModel = model<IAuditLog>("AuditLogs", auditLogSchema);
