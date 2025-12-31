import { verifyToken } from "@/lib/auth";
import { logAudit } from "@/lib/repositories/audit.repo";

export async function GET(req) {
  const user = verifyToken(req);

  if (user.role !== "admin") {
    return Response.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  await logAudit({
    actor: user,
    action: "ADMIN_ROUTE_ACCESS",
    resourceType: "SYSTEM",
    req,
  });

  return Response.json({
    success: true,
    message: "Admin route accessed",
  });
}
