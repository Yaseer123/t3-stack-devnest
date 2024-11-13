// ContactPage.tsx
"use client";
import React, { useState } from "react";
import { ArtSphere } from "./ThreeDModel";

const ContactPage = () => {
  // Define state for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form Submitted: ", formData);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 bg-gradient-to-b from-black to-neutral-900 text-white">
      {/* Contact Form Section */}
      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-5xl font-bold mb-4">
          Let<span className="text-white">’s</span>{" "}
          <span className="italic text-gray-400">Connect</span>
        </h1>
        <p className="mt-2 text-gray-400 text-sm mb-8">
          <span className="text-red-500">*</span> Whether you have a
          question or want to discuss a potential project, our team at
          DEVNEST is here to help. Please fill out the form below!!!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-neutral-900 p-3 rounded-md outline-none placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-gray-600"
          />

          <div className="flex gap-4">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-1/2 bg-neutral-900 p-3 rounded-md outline-none placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-gray-600"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-1/2 bg-neutral-900 p-3 rounded-md outline-none placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-neutral-900 p-3 rounded-md outline-none placeholder-gray-500 border border-gray-700 focus:ring-2 focus:ring-gray-600 h-32"
          />

          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 mt-6 text-white bg-neutral-900 rounded-full border border-white hover:bg-gray-700 transition duration-200"
          >
            Send Message
            <span className="ml-2 transform group-hover:translate-x-1 transition duration-300">
              ➔
            </span>
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-3 bg-green-700 text-white rounded-md">
            Thank you for your message. It has been sent.
          </div>
        )}
      </div>

      {/* 3D Sphere Section */}
      <div className="w-full h-[70vh] md:w-1/2 p-6 mr-100">
        <ArtSphere />
      </div>
    </div>
  );
};

export default ContactPage;