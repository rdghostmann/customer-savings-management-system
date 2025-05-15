import mongoose from "mongoose";

const MessageTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    lastUsed: {
      type: String, // You can also use Date if you want to store actual timestamps
      default: "Never",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const MessageTemplate =  mongoose.models.MessageTemplate || mongoose.model("MessageTemplate", MessageTemplateSchema);

export default MessageTemplate;