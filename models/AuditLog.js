import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    actorRole: {
      type: String,
      enum: ["user", "admin", "issuer"],
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    resourceType: {
      type: String,
      required: true,
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export default mongoose.models.AuditLog ||
  mongoose.model("AuditLog", AuditLogSchema);
