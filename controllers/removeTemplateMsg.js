"use server"

import { connectToDB } from "@/lib/connectDB"
import MessageTemplate from "@/models/MessageTemplate"

export async function removeTemplateMsg(id) {
  await connectToDB()
  const deleted = await MessageTemplate.findByIdAndDelete(id)
  if (!deleted) throw new Error("Template not found")
  return { success: true }
}