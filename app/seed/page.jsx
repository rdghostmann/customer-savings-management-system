import { connectToDB } from "@/lib/connectDB";
import { templateData } from "@/lib/template-msg";
import MessageTemplate from "@/models/MessageTemplate"; // Import the MessageTemplate model

export default async function SeedPage() {
  await connectToDB(); // Ensure the database connection is established

  try {
    // Insert message templates into the database
    const insertedTemplates = await MessageTemplate.insertMany(templateData);
    console.log("Message templates seeded successfully:", insertedTemplates);
  } catch (error) {
    console.error("Error seeding message templates:", error.message);
  }

  return (
    <div>
      <h1>Message Template Seeding</h1>
      <p>Check the console for the seeding status.</p>
    </div>
  );
}