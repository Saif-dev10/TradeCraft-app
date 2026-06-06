"use client";

import { useState } from "react";
import {
  FaChartBar,
  FaShieldAlt,
  FaFileContract,
  FaGlobeAmericas,
  FaHandshake,
  FaArrowRight,
} from "react-icons/fa";

import { Navbar } from "@/components/Navbar";

const services = [
  {
    icon: FaChartBar,
    title: "Trade Performance Analytics",
    description:
      "Track and analyze your trading performance with detailed metrics including win rate, risk-to-reward ratio, and equity growth.",
    features: [
      "Performance Dashboard",
      "Win/Loss Tracking",
      "Risk-to-Reward Analysis",
      "Equity Curve Monitoring",
    ],
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
  },
  {
    icon: FaFileContract,
    title: "Trade Journaling System",
    description:
      "Log every trade with structured journaling tools to capture entries, exits, setups, and emotional context.",
    features: [
      "Trade Entry Logging",
      "Setup Classification",
      "Notes & Reflections",
      "Screenshot Attachments",
    ],
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
  },
  {
    icon: FaShieldAlt,
    title: "Risk Management Tracking",
    description:
      "Monitor and control your risk exposure across all trades to protect capital and enforce discipline.",
    features: [
      "Position Size Tracking",
      "Risk Per Trade Limits",
      "Drawdown Monitoring",
      "Capital Protection Metrics",
    ],
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
  },
  {
    icon: FaChartBar,
    title: "Strategy Evaluation",
    description:
      "Evaluate which trading strategies are profitable and which are draining your account over time.",
    features: [
      "Strategy Performance Breakdown",
      "Setup Effectiveness",
      "Backtesting Insights",
      "Edge Identification",
    ],
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
  },
  {
    icon: FaFileContract,
    title: "Trade Review System",
    description:
      "Review past trades with structured feedback loops to eliminate mistakes and improve execution.",
    features: [
      "Trade Replay Logs",
      "Mistake Tracking",
      "Behavior Analysis",
      "Improvement Suggestions",
    ],
    color: "from-slate-500 to-slate-600",
    bgLight: "bg-slate-100",
  },
  {
    icon: FaGlobeAmericas,
    title: "Market Context Tracking",
    description:
      "Connect your trades to market conditions so you understand when and why your strategies work.",
    features: [
      "Market Condition Tags",
      "Session Tracking",
      "Volatility Context",
      "News Impact Notes",
    ],
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
  },
];

const processSteps = [
  {
    icon: FaHandshake,
    step: "01",
    title: "Log Your Trade",
    description:
      "Record every trade with full details including entry, exit, and reasoning.",
  },
  {
    icon: FaFileContract,
    step: "02",
    title: "Analyze Performance",
    description:
      "We break down your results to reveal strengths and weaknesses in your trading.",
  },
  {
    icon: FaChartBar,
    step: "03",
    title: "Identify Patterns",
    description:
      "Spot recurring behaviors and strategy performance trends over time.",
  },
  {
    icon: FaShieldAlt,
    step: "04",
    title: "Improve Execution",
    description:
      "Refine your trading discipline and decision-making based on real data.",
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0">
            <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                TradeCraft <span className="text-blue-800">Tools</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-800">
                TradeCraft is a trading journal and performance analytics platform designed to help
                traders track, analyze, and improve their trading decisions using structured data.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Core Trading Tools
              </h2>

              <p className="mt-4 text-lg text-slate-600">
                Everything you need to analyze your trading performance and improve consistency.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div
                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${service.bgLight}`}
                  >
                    <service.icon size={32} className="text-blue-500" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>

                  <p className="mt-3 text-slate-600">{service.description}</p>

                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-600">
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <a
                      href="/contact"
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-blue-600"
                    >
                      Learn More
                      <FaArrowRight className="ml-2" size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                How TradeCraft Works
              </h2>

              <p className="mt-4 text-lg text-slate-600">
                A structured system for improving trading performance over time.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-white">
                    <step.icon size={28} />
                  </div>

                  <div className="mx-auto mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {step.step}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>

                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Ready to improve your trading?
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Start tracking your trades with structure and clarity.
            </p>

            <a
              href="/login"
              className="mt-8 inline-flex items-center rounded-xl bg-blue-500 px-8 py-4 text-white font-semibold hover:bg-blue-600"
            >
              Start Tracking
            </a>
          </div>
        </section>
      </div>
    </>
  );
}