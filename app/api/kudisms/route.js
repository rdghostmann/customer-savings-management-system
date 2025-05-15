"use server";

import axios from "axios";

export async function POST(req) {
  try {
    const { recipients, message } = await req.json();

    // Validate input
    if (!recipients || recipients.length === 0 || !message) {
      return new Response(
        JSON.stringify({ error: "Recipients and message are required." }),
        { status: 400 }
      );
    }

    // KUDI SMS API configuration
    const apiUrl = "https://api.kudisms.net/api/v1/send";
    const apiKey = process.env.KUDI_SMS_API_KEY; // Ensure this is set in your environment variables

    // Prepare the payload
    const payload = {
      apiKey,
      sender: "DACManager", // Replace with your sender name
      to: recipients.join(","), // Join recipients into a comma-separated string
      message,
    };

    // Send the SMS via KUDI SMS API
    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle API response
    if (response.data.status === "success") {
      return new Response(
        JSON.stringify({ success: true, message: "SMS sent successfully." }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ error: response.data.message || "Failed to send SMS." }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    return new Response(
      JSON.stringify({ error: "An error occurred while sending SMS." }),
      { status: 500 }
    );
  }
}