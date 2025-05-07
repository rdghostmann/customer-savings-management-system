import { connectToDB } from "@/lib/connectDB";
import Customer from "@/models/Customer";

export async function getCustomer(id) {
  try {
    await connectToDB(); // Ensure the database connection is established

    // Fetch customer by ID and select specific fields
    const customer = await Customer.findById(id).select(
      "_id name accountNumber phone email address balance joinDate lastActivity status"
    );

    if (!customer) {
      return null; // Return null if customer is not found
    }

    // Convert _id to string and return the customer object
    return {
      ...customer.toObject(),
      _id: customer._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching customer:", error.message);
    return null;
  }
}