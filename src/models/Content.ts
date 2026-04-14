import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    hero: {
      label: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    about: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      stats: [{ value: String, label: String }],
      features: [String],
    },
    services: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      list: [
        {
          id: String,
          title: String,
          description: String,
        },
      ],
    },
    portfolio: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      projects: [
        {
          id: String,
          title: String,
          category: String,
          year: String,
          description: String,
          desc: String,
          link: String,
          favicon: String,
          tags: [String],
        },
      ],
    },
    marquee: {
      items: [{ type: String }],
    },
    process: {
      title: { type: String, default: "" },
      steps: [
        {
          num: String,
          title: String,
          desc: String,
        },
      ],
    },
    contact: {
      title: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
    },
    footer: {
      trademark: { type: String, default: "" },
      links: [
        {
          label: String,
          url: String,
        },
      ],
      social: [
        {
          platform: String,
          url: String,
          icon: String,
        },
      ],
    },
  },
  { timestamps: true }
);

// We only ever need one document for the whole site content
// We'll query it using findOne()

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
