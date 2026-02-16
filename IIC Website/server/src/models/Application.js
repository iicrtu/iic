import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected", "selected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

applicationSchema.index({ student: 1, internship: 1 }, { unique: true });

applicationSchema.index({ student: 1, createdAt: -1 });
applicationSchema.index({ internship: 1, createdAt: -1 });
applicationSchema.index({ status: 1, createdAt: -1 });

export const Application = mongoose.model("Application", applicationSchema);