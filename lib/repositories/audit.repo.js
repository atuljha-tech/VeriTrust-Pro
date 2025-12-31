import connectDB from "@/lib/db";
import AuditLog from "@/models/AuditLog";

export async function logAudit({ actor, action, resourceType, req }) {
  await connectDB();

  await AuditLog.create({
    actorId: actor.id,
    actorRole: actor.role,
    action,
    resourceType,
    ipAddress: req.headers.get("x-forwarded-for") || "unknown",
  });
}
