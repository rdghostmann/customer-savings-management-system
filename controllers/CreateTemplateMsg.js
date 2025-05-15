"use server"

import { connectToDB } from "@/lib/connectDB"
import MessageTemplate from "@/models/MessageTemplate"

export async function CreateTemplateMsg({ name, content }) {
  await connectToDB()
  const created = await MessageTemplate.create({ name, content })
  return {
    _id: created._id.toString(),
    name: created.name,
    content: created.content,
    lastUsed: created.lastUsed,
  }

}