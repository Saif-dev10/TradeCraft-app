"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import { Navbar } from "@/components/Navbar";

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Headquarters",
    details: ["123 Commerce Boulevard", "New York, NY 10001", "United States"],
    color: "bg-rose-500",
  },
  {
    icon: FaPhone,
    title: "Phone",
    details: ["+234 (704) 441-3479", "+234 (904) 391-8054"],
    color: "bg-emerald-500",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    details: ["tradecraft.support@gmail.com"],
    color: "bg-blue-500",
  },
  {
    icon: FaClock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
    color: "bg-amber-500",
  },
];

const socialLinks = [
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/saifdevx/" },
  { icon: FaTwitter, label: "Twitter", href: "https://x.com/SaifDev_X" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
];

export default function ContactPage() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // EmailJS send
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ 
        from_name: "",
        from_email: "", 
        phone: "", 
        subject: "", 
        message: "" 
      });

      // Clear success message after 6 seconds
      setTimeout(() => setStatus({ type: "", message: "" }), 6000);
    } catch (error) {
      console.error("Email send failed:", error);
      setStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again or email us directly at tradecraft.support@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-slate-900/80" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Contact Us
              </p>
              <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Get in Touch
              </h1>
              <div className="mx-auto mt-6 h-1 w-20 bg-blue-500" />
              <p className="mt-8 text-lg leading-relaxed text-slate-200">
                Have a question or ready to start? We are here to help. Reach out and our team
                will get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="relative z-10 -mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${info.color} text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    <info.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{info.title}</h3>
                  <div className="mt-2 space-y-1">
                    {info.details.map((detail, dIndex) => (
                      <p key={dIndex} className="text-sm text-slate-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Form */}
              <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
                <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
                <p className="mt-2 text-slate-600">
                  Fill out the form below and we will respond as soon as possible.
                </p>

                {/* Status Messages */}
                {status.type === "success" && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-700">
                    <FaCheckCircle size={20} className="mt-0.5 shrink-0" />
                    <span className="font-medium">{status.message}</span>
                  </div>
                )}

                {status.type === "error" && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl bg-rose-50 p-4 text-rose-700">
                    <FaExclamationCircle size={20} className="mt-0.5 shrink-0" />
                    <span className="font-medium">{status.message}</span>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="from_name"
                        required
                        value={formData.from_name}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="from_email"
                        required
                        value={formData.from_email}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                        placeholder="+234 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="quote">Request a Quote</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="support">Customer Support</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 block w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <FaPaperPlane
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    )}
                  </button>
                </form>
              </div>

              {/* Map & Social */}
              <div className="flex flex-col gap-8">
                <div className="overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                  <div className="relative h-80 w-full bg-slate-300">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-lg">
                  <h3 className="text-lg font-bold text-slate-900">Follow Us</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Stay connected for the latest updates and industry insights.
                  </p>
                  <div className="mt-6 flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:text-white hover:shadow-lg"
                      >
                        <social.icon size={22} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 p-8 text-white">
                  <h3 className="text-lg font-bold">Frequently Asked</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="font-medium text-blue-400">What does TradeCraft actually do?</p>
                      <p className="mt-1 text-sm text-slate-300">
                        We facilitate international trade by connecting buyers and suppliers, structuring deals, and managing execution across borders.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-400">Do you only handle logistics and shipping?</p>
                      <p className="mt-1 text-sm text-slate-300">
                        No. Logistics is only one part of the process. We focus on the full trade lifecycle — sourcing, negotiation, compliance, risk management, and delivery coordination.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}