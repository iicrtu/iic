import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

    title: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    locationType: { type: String, enum: ["remote", "on-site", "hybrid"], required: true },
    location: { type: String, default: "", trim: true },

    duration: { type: String, required: true, trim: true }, 
    stipend: { type: String, default: "", trim: true },    
    openings: { type: Number, default: 1, min: 1 },

    startDate: { type: String, default: "" },
    lastDateToApply: { type: String, default: "" },

    skills: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true },
    responsibilities: { type: String, default: "", trim: true },
    eligibility: { type: String, default: "", trim: true },

    applicationLink: { type: String, default: "", trim: true },

    status: { type: String, enum: ["open", "closed"], default: "open" }
  },
  { timestamps: true }
);

export const Internship = mongoose.model("Internship", internshipSchema);