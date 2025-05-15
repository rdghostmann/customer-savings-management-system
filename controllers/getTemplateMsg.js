import { connectToDB } from "@/lib/connectDB";
import MessageTemplate from "@/models/MessageTemplate";

export async function getTemplateMsg() {
  await connectToDB();
  const templateMsg = await MessageTemplate.find().lean();
  // Convert _id to string for each template
  return templateMsg.map((template) => ({
    ...template,
    _id: template._id.toString(),
  }));
}