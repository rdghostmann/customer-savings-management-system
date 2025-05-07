"use client";
import React from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Sending...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, company, phone, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setSubmitStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#1a4f7c] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white font-montserrat text-2xl font-bold">
            SaveWise Consulting
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-white hover:text-[#e5f0f8]">
              Home
            </a>
            <a href="/services" className="text-white hover:text-[#e5f0f8]">
              Services
            </a>
            <a href="/about" className="text-white hover:text-[#e5f0f8]">
              About
            </a>
            <a href="/contact" className="text-white hover:text-[#e5f0f8]">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-montserrat font-bold text-center mb-8">
            Contact Us
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Ready to transform your business? Get in touch with our team of
            experts today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#1a4f7c]"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#1a4f7c]"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#1a4f7c]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#1a4f7c]"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#1a4f7c]"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a4f7c] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a6091]"
                >
                  Send Message
                </button>
                {submitStatus && (
                  <p className="text-center mt-4">{submitStatus}</p>
                )}
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Office Locations</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Main Office</h3>
                    <p className="flex items-center">
                      <i className="fas fa-map-marker-alt text-[#1a4f7c] mr-2"></i>
                      123 Business Avenue, New York, NY 10001
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      West Coast Office
                    </h3>
                    <p className="flex items-center">
                      <i className="fas fa-map-marker-alt text-[#1a4f7c] mr-2"></i>
                      456 Innovation Drive, San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Alternative Contact</h2>
                <div className="space-y-4">
                  <p className="flex items-center">
                    <i className="fas fa-phone text-[#1a4f7c] mr-2"></i>
                    <a
                      href="tel:+1-800-123-4567"
                      className="hover:text-[#1a4f7c]"
                    >
                      1-800-123-4567
                    </a>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-envelope text-[#1a4f7c] mr-2"></i>
                    <a
                      href="mailto:contact@savewise.com"
                      className="hover:text-[#1a4f7c]"
                    >
                      contact@savewise.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Find Us
          </h2>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.697403442292485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1645654571619!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Office Location Map"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="bg-[#1a4f7c] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 SaveWise Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Contact;