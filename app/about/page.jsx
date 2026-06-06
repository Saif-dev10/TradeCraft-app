"use client";

import { useState } from "react";
import {
  FaUsers,
  FaBullseye,
  FaEye,
  FaHandshake,
  FaChartLine,
  FaAward,
  FaGlobe,
  FaLightbulb,
} from "react-icons/fa";

import Image from "next/image";

import { Navbar } from "@/components/Navbar";

// const stats = [
//   { icon: FaUsers, value: "500+", label: "Clients Served" },
//   { icon: FaChartLine, value: "$2B+", label: "Trade Volume" },
//   { icon: FaGlobe, value: "45+", label: "Countries" },
//   { icon: FaAward, value: "12+", label: "Years Experience" },
// ];

const values = [
  {
    icon: FaHandshake,
    title: "Integrity",
    description:
      "We conduct every transaction with unwavering honesty and transparency, building trust that lasts.",
  },
  {
    icon: FaLightbulb,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology and creative strategies to stay ahead in global markets.",
  },
  {
    icon: FaBullseye,
    title: "Excellence",
    description:
      "We pursue perfection in every detail, delivering results that consistently exceed expectations.",
  },
];

const team = [
  {
    name: "Saifullah Muhammad Abdulwahab",
    role: "Founder & CEO",
    // image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    image: "/Profile-Pic.png",
    bio: "3+ years in international trade and finance.",
  },
  {
    name: "Elena Vasquez",
    role: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Expert in supply chain optimization.",
  },
  {
    name: "David Chen",
    role: "Head of Strategy",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Former investment banker turned trade strategist.",
  },
  {
    name: "Amara Okafor",
    role: "Global Partnerships Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Building bridges across continents.",
  },
];

export default function AboutPage() {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
        <section className="py-18 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                Who We Are
              </p>
              <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
                About Trade Craft
              </h1>
              <div className="mx-auto mt-6 h-1 w-20 bg-blue-500" />
              <p className="mt-8 text-lg leading-relaxed">
                We are a premier global trading firm dedicated to connecting markets,
                optimizing supply chains, and driving sustainable growth for businesses worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Mission */}
              <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl sm:p-12">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-100 opacity-50 transition-transform duration-300 group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500 text-white">
                    <FaBullseye size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our Mission</h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    To revolutionize global trade by creating seamless, transparent, and efficient
                    pathways for businesses to connect, grow, and thrive in an interconnected world.
                    We believe every business deserves access to world-class trading infrastructure.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl sm:p-12">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100 opacity-50 transition-transform duration-300 group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <FaEye size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our Vision</h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    To be the most trusted and innovative trade partner globally, setting new
                    standards for reliability, speed, and sustainability in international commerce.
                    We envision a world where borders are bridges, not barriers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl bg-slate-800 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-slate-700"
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div
                    className={`mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 ${
                      hoveredStat === index ? "bg-amber-500" : "bg-slate-700"
                    }`}
                  >
                    <stat.icon
                      size={28}
                      className={`transition-colors duration-300 ${
                        hoveredStat === index ? "text-white" : "text-amber-400"
                      }`}
                    />
                  </div>
                  <div className="text-3xl font-extrabold text-white sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Core Values */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                The principles that guide every decision we make.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-900 transition-colors duration-300 group-hover:bg-blue-500 group-hover:text-white">
                    <value.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Meet Our Leadership
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                The experts driving our mission forward.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl bg-slate-50 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm font-medium text-amber-600">{member.role}</p>
                    <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-100 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Transform Your Trade?
            </h2>
            <p className="mt-4 text-lg">
              Join hundreds of businesses already growing with Trade Craft.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </>
  );
}