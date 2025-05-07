"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
  };
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#1a4f7c] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="cursor-pointer text-white font-montserrat text-2xl font-bold">
            <span>SaveWise</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="#services" className="text-white hover:text-[#e5f0f8]">
              Services
            </Link>
            <Link href="#benefits" className="text-white hover:text-[#e5f0f8]">
              Benefits
            </Link>
            <Link href="#testimonials" className="text-white hover:text-[#e5f0f8]">
              Testimonials
            </Link>
            <Link href="#contact" className="text-white hover:text-[#e5f0f8]">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-[#1a4f7c] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-6">
                Transform Your Business Finances
              </h1>
              <p className="text-xl mb-8">
                Unlock hidden savings and maximize your business potential with
                expert consulting
              </p>
              <Link
                href="/dashboard"
                className="bg-[#ff6b4a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#ff8264]"
              >
                Get Started Today
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="/hero-image.jpg"
                alt="Business professionals reviewing financial documents"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <i className="fas fa-chart-line text-[#1a4f7c] text-3xl mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Cost Analysis</h3>
              <p>
                Comprehensive review of your business expenses to identify
                savings opportunities
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <i className="fas fa-handshake text-[#1a4f7c] text-3xl mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Vendor Negotiation</h3>
              <p>
                Expert negotiation with vendors to secure better rates and terms
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <i className="fas fa-lightbulb text-[#1a4f7c] text-3xl mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Efficiency Consulting</h3>
              <p>
                Strategic recommendations to optimize operations and reduce
                waste
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            How We Help You Save
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start">
              <i className="fas fa-check-circle text-[#1a4f7c] text-2xl mr-4 mt-1"></i>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Reduce Operational Costs
                </h3>
                <p>
                  Average savings of 15-30% on operational expenses through our
                  proven methods
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-[#1a4f7c] text-2xl mr-4 mt-1"></i>
              <div>
                <h3 className="text-xl font-bold mb-2">Optimize Cash Flow</h3>
                <p>
                  Improve your cash flow management with expert financial
                  strategies
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-[#1a4f7c] text-2xl mr-4 mt-1"></i>
              <div>
                <h3 className="text-xl font-bold mb-2">Strategic Planning</h3>
                <p>
                  Long-term cost reduction strategies tailored to your business
                  goals
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-[#1a4f7c] text-2xl mr-4 mt-1"></i>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Resource Optimization
                </h3>
                <p>
                  Maximize efficiency of your existing resources and investments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                How much can I expect to save?
              </h3>
              <p className="text-gray-600">
                On average, our clients see cost reductions of 15-30% within the
                first three months of implementing our recommendations. However,
                actual savings can vary based on your business size and current
                operational efficiency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                How long does the consultation process take?
              </h3>
              <p className="text-gray-600">
                Our initial consultation is free and takes about 60 minutes.
                Following that, our comprehensive analysis typically takes 2-3
                weeks, depending on the size and complexity of your business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                Do you work with small businesses?
              </h3>
              <p className="text-gray-600">
                Yes! We work with businesses of all sizes, from startups to
                large corporations. Our strategies are tailored to meet your
                specific needs and budget.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                What industries do you specialize in?
              </h3>
              <p className="text-gray-600">
                We have experience across multiple industries including
                technology, manufacturing, retail, healthcare, and professional
                services. Our cost-saving principles are adaptable to any
                business model.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">
                How do you charge for your services?
              </h3>
              <p className="text-gray-600">
                We offer flexible pricing models including fixed-fee projects,
                success-based fees, or retainer arrangements. We'll recommend
                the best option based on your specific needs during our
                consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a4f7c] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl mb-8">
            Schedule your free consultation today and discover your savings
            potential
          </p>
          <a
            href="#contact"
            className="bg-[#ff6b4a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#ff8264]"
          >
            Book Consultation
          </a>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#1a4f7c] mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="mb-4">
                "SaveWise helped us reduce our operational costs by 25% in just
                three months. Their expertise is invaluable."
              </p>
              <p className="font-bold">- Sarah Johnson, CEO</p>
              <p className="text-sm text-gray-600">Tech Solutions Inc.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#1a4f7c] mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="mb-4">
                "Their strategic approach to cost savings transformed our
                business model. Highly recommended!"
              </p>
              <p className="font-bold">- Michael Chen, Owner</p>
              <p className="text-sm text-gray-600">Global Retail Group</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#1a4f7c] mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="mb-4">
                "Professional, knowledgeable, and results-driven. They delivered
                beyond our expectations."
              </p>
              <p className="font-bold">- Emily Rodriguez, CFO</p>
              <p className="text-sm text-gray-600">Manufacturing Plus</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Contact Us
          </h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
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
            </form>
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
