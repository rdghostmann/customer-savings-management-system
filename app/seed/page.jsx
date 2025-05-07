import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer"; // Assuming you have a Customer model
import customers from "@/lib/customers"; // Import the customers array

export default async function SeedPage() {
  await connectToDB(); // Ensure the database connection is established

  try {
    // Insert customers into the database
    const insertedCustomers = await Customer.insertMany(customers);
    console.log("Customers seeded successfully:", insertedCustomers);
  } catch (error) {
    console.error("Error seeding customers:", error.message);
  }

  return (
    <div>
      <h1>Customer Seeding</h1>
      <p>Check the console for the seeding status.</p>
    </div>
  );
}