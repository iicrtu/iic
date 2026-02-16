import mongoose from "mongoose";

const orgProfileSchema = new mongoose.Schema(
  {
    orgName: { type: String, default: "" },
    website: { type: String, default: "" },
    contactPerson: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    about: { type: String, default: "" },
  },
  { _id: false }
);

const studentProfileSchema = new mongoose.Schema(
  {
    college: { type: String, default: "" },
    course: { type: String, default: "" },
    year: { type: String, default: "" },
    phone: { type: String, default: "" },
    skills: [{ type: String, default: "" }],
    resumeUrl: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "" },

    role: { type: String, enum: ["student", "organisation"], default: null },

    orgProfileCompleted: { type: Boolean, default: false },
    orgProfile: { type: orgProfileSchema, default: () => ({}) },

    studentProfileCompleted: { type: Boolean, default: false },
    studentProfile: { type: studentProfileSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);