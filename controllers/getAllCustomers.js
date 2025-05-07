import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer";


export async function getAllCustomers() {
  try {
    await connectToDB(); // Ensure the database connection is established
    const customers = await Customer.find().lean();

    // Convert _id to a string for each customer
    const formattedCustomers = customers.map((customer) => ({
      ...customer,
      _id: customer._id.toString(),
    }));

    return formattedCustomers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
}