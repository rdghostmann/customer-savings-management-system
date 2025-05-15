"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrimaryFeatures from "./_component/PrimaryFeature";
import SecondaryFeature from "./_component/SecondaryFeature";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-30 bg-white/80 backdrop-blur border-b border-slate-100">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tight">
            SaveWise
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="hover:text-blue-700 transition">Features</Link>
            <Link href="#testimonials" className="hover:text-blue-700 transition">Testimonials</Link>
            <Link href="#contact" className="hover:text-blue-700 transition">Contact</Link>
            <Link href="/dashboard">
              <Button className="bg-blue-900 text-white hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">
                Dashboard
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Unlock Smarter Savings for Your Business
            </h1>
            <p className="text-lg text-slate-700 mb-8">
              SaveWise helps you discover hidden savings, optimize costs, and grow your business with confidence.
            </p>
            <Link href="/dashboard">
              <Button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Get Started <ArrowRight className="inline ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/hero-image.jpg"
              alt="Business professionals"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Why Choose SaveWise?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition">
              <div className="mb-4 text-blue-700">
                <i className="fas fa-chart-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Analysis</h3>
              <p className="text-slate-700">
                In-depth review of your business expenses to identify savings opportunities.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition">
              <div className="mb-4 text-blue-700">
                <i className="fas fa-handshake text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vendor Negotiation</h3>
              <p className="text-slate-700">
                Expert negotiation with vendors to secure better rates and terms.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition">
              <div className="mb-4 text-blue-700">
                <i className="fas fa-lightbulb text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficiency Consulting</h3>
              <p className="text-slate-700">
                Strategic recommendations to optimize operations and reduce waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Features Section */}
      <PrimaryFeatures />
      {/* Secondary Features Section */}

      <SecondaryFeature />


      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                "SaveWise helped us reduce our operational costs by 25% in just three months. Their expertise is invaluable."
              </p>
              <p className="font-bold text-blue-900">Sarah Johnson, CEO</p>
              <p className="text-sm text-slate-500">Tech Solutions Inc.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                "Their strategic approach to cost savings transformed our business model. Highly recommended!"
              </p>
              <p className="font-bold text-blue-900">Michael Chen, Owner</p>
              <p className="text-sm text-slate-500">Global Retail Group</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="mb-4 text-slate-700">
                "Professional, knowledgeable, and results-driven. They delivered beyond our expectations."
              </p>
              <p className="font-bold text-blue-900">Emily Rodriguez, CFO</p>
              <p className="text-sm text-slate-500">Manufacturing Plus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Contact Us
          </h2>
          <div className="max-w-xl mx-auto bg-blue-50 rounded-xl shadow p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-900 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-700"
                  required
                />
              </div>
              <div>
                <label className="block text-blue-900 font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-700"
                  required
                />
              </div>
              <div>
                <label className="block text-blue-900 font-semibold mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-700"
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 mt-12">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          © 2025 SaveWise Consulting. All rights reserved.
        </div>
      </footer>
    </div>
  );
}