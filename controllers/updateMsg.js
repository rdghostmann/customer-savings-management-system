"use server"

import { connectToDB } from "@/lib/connectDB"
import MessageTemplate from "@/models/MessageTemplate"

export async function updateMsg(id, { name, content }) {
  await connectToDB()
  const updated = await MessageTemplate.findByIdAndUpdate(
    id,
    { name, content },
    { new: true }
  )
  if (!updated) throw new Error("Template not found")
  return {
    _id: updated._id.toString(),
    name: updated.name,
    content: updated.content,
    lastUsed: updated.lastUsed,
  }
}