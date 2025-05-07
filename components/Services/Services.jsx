"use client";
import React from "react";

function Services() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
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
          </div>
        </div>
      </nav>

      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-montserrat font-bold text-center mb-8">
            Our Services
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Comprehensive financial optimization solutions tailored to help your
            business reduce costs and maximize efficiency
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <i className="fas fa-chart-line text-[#1a4f7c] text-3xl mb-4"></i>
              <h3 className="text-xl font-bold mb-4">
                Cost Analysis & Optimization
              </h3>
              <p>
                Deep dive into your business expenses to identify and implement
                cost-saving opportunities
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <i className="fas fa-handshake text-[#1a4f7c] text-3xl mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Vendor Management</h3>
              <p>
                Strategic vendor negotiations and relationship management to
                secure better terms
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <i className="fas fa-lightbulb text-[#1a4f7c] text-3xl mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Process Optimization</h3>
              <p>
                Streamline operations and eliminate inefficiencies to reduce
                operational costs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Service Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-[#1a4f7c] text-3xl font-bold mb-6">$2,500</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>Initial
                  Cost Analysis
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>Basic
                  Vendor Review
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>Quarterly
                  Check-ins
                </li>
              </ul>
              <a
                href="#contact"
                className="block text-center bg-[#1a4f7c] text-white px-6 py-3 rounded-full hover:bg-[#2a6091]"
              >
                Get Started
              </a>
            </div>
            <div className="bg-[#1a4f7c] p-8 rounded-lg shadow-lg transform scale-105">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Professional
              </h3>
              <p className="text-white text-3xl font-bold mb-6">$5,000</p>
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#ff6b4a] mr-2"></i>
                  Comprehensive Cost Analysis
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#ff6b4a] mr-2"></i>Advanced
                  Vendor Negotiations
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#ff6b4a] mr-2"></i>Monthly
                  Strategy Sessions
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#ff6b4a] mr-2"></i>Process
                  Optimization Plan
                </li>
              </ul>
              <a
                href="#contact"
                className="block text-center bg-[#ff6b4a] text-white px-6 py-3 rounded-full hover:bg-[#ff8264]"
              >
                Get Started
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-[#1a4f7c] text-3xl font-bold mb-6">Custom</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  Full-Service Solution
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>Dedicated
                  Consultant
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>24/7
                  Support
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>Custom
                  Integration
                </li>
              </ul>
              <a
                href="#contact"
                className="block text-center bg-[#1a4f7c] text-white px-6 py-3 rounded-full hover:bg-[#2a6091]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a4f7c] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Assessment</h3>
              <p>Thorough analysis of your current expenses and processes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a4f7c] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Strategy</h3>
              <p>Development of customized cost-saving solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a4f7c] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Implementation</h3>
              <p>Execution of approved optimization strategies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a4f7c] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Monitoring</h3>
              <p>Continuous tracking and optimization of results</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How quickly can we expect to see results?",
                answer:
                  "Most clients see initial savings within the first 30-60 days of implementation, with more substantial results developing over 3-6 months.",
              },
              {
                question: "What industries do you work with?",
                answer:
                  "We work across various industries including manufacturing, technology, healthcare, retail, and professional services.",
              },
              {
                question: "How do you charge for your services?",
                answer:
                  "We offer flexible pricing models including fixed-fee packages and performance-based arrangements. The specific structure depends on your needs and project scope.",
              },
              {
                question:
                  "What makes SaveWise different from other consulting firms?",
                answer:
                  "Our focus on measurable results, deep industry expertise, and proven methodology sets us apart. We also offer ongoing support to ensure sustained savings.",
              },
            ].map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left font-bold flex justify-between items-center"
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <i
                    className={`fas ${
                      activeAccordion === index ? "fa-minus" : "fa-plus"
                    } text-[#1a4f7c]`}
                  ></i>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 py-4 border-t">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#1a4f7c] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8">
            Schedule your free consultation today and discover your savings
            potential
          </p>
          <a
            href="/contact"
            className="bg-[#ff6b4a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#ff8264] inline-block"
          >
            Book Your Consultation
          </a>
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

export default Services;