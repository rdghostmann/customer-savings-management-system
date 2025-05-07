"use client";
import React from "react";

function About() {
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
            <a href="/about" className="text-white hover:text-[#e5f0f8]">
              About
            </a>
          </div>
        </div>
      </nav>

      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-montserrat font-bold text-center mb-8">
            Our Story
          </h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-8">
              Founded in 2020, SaveWise Consulting emerged from a simple yet
              powerful idea: every business deserves access to expert financial
              optimization strategies. Our mission is to transform how
              businesses approach cost management, creating sustainable savings
              that fuel growth and innovation.
            </p>
            <p className="text-lg">
              We've grown from a small team of financial experts to a
              comprehensive consulting firm, helping businesses across
              industries unlock their full potential through strategic cost
              optimization and resource management.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/team-member-1.jpg"
                alt="Sarah Thompson, CEO of SaveWise Consulting"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Sarah Thompson</h3>
              <p className="text-[#1a4f7c] font-semibold mb-2">CEO & Founder</p>
              <p className="text-gray-600">
                15+ years of financial consulting expertise
              </p>
            </div>
            <div className="text-center">
              <img
                src="/team-member-2.jpg"
                alt="David Chen, Chief Strategy Officer"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">David Chen</h3>
              <p className="text-[#1a4f7c] font-semibold mb-2">
                Chief Strategy Officer
              </p>
              <p className="text-gray-600">
                Former Fortune 500 financial advisor
              </p>
            </div>
            <div className="text-center">
              <img
                src="/team-member-3.jpg"
                alt="Maria Rodriguez, Head of Operations"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Maria Rodriguez</h3>
              <p className="text-[#1a4f7c] font-semibold mb-2">
                Head of Operations
              </p>
              <p className="text-gray-600">
                Expert in operational optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1a4f7c] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <i className="fas fa-handshake text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p>Transparent and honest partnerships with our clients</p>
            </div>
            <div className="text-center">
              <i className="fas fa-chart-line text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p>Cutting-edge solutions for modern challenges</p>
            </div>
            <div className="text-center">
              <i className="fas fa-users text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p>Working together to achieve exceptional results</p>
            </div>
            <div className="text-center">
              <i className="fas fa-trophy text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p>Delivering outstanding value in everything we do</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#1a4f7c] mb-2">500+</div>
              <p>Clients Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1a4f7c] mb-2">
                $50M+
              </div>
              <p>Client Savings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1a4f7c] mb-2">25%</div>
              <p>Average Cost Reduction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1a4f7c] mb-2">98%</div>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">
            Our Workspace
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <img
              src="/office-1.jpg"
              alt="SaveWise modern collaborative workspace"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="/office-2.jpg"
              alt="SaveWise meeting room where strategic planning happens"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="/office-3.jpg"
              alt="SaveWise open office environment"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
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

export default About;