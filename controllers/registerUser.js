"use server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/connectDB";

export async function registerUser({ username, email, password, phone, role, isActive }) {
  try {
    await connectToDB();

    // Validate input fields
    if (!username?.trim()) {
      return { success: false, message: "Username is required" };
    }
    if (!email?.trim()) {
      return { success: false, message: "Email is required" };
    }
    if (!password?.trim()) {
      return { success: false, message: "Password is required" };
    }
    if (!phone?.trim()) {
      return { success: false, message: "Phone number is required" };
    }
    if (!role?.trim()) {
      return { success: false, message: "Role is required" };
    }
    if (isActive === undefined || isActive === null) {
      return { success: false, message: "Active status is required" };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email format" };
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return {
        success: false,
        message: existingUser.email === email ? "Email already in use" : "Username already taken",
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with all required fields
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role,
      isActive: isActive === "true", // Convert string to boolean
    });

    await newUser.save();

    revalidatePath("/login");

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.error("Error registering user", error);
    return {
      success: false,
      message: "Check Internet Connection",
    };
  }
}