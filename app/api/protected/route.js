import { verifyToken } from "@/lib/serverAuth";
import { logAudit } from "@/lib/repositories/audit.repo";

export async function GET(req) {
  try {
    const user = verifyToken(req);

    await logAudit({
      actor: user,
      action: "PROTECTED_ROUTE_ACCESS",
      resourceType: "SYSTEM",
      req,
    });

    return Response.json({
      success: true,
      message: "Protected route accessed successfully",
      user: {
        id: user.id,
        role: user.role,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
