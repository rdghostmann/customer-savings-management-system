import React, { useState } from "react";

const features = [
  {
    key: "transactions",
    icon: (
      <svg aria-hidden="true" className="h-9 w-9" fill="none">
        <circle cx="18" cy="18" r="18" fill="#2563eb" opacity="0.1" />
        <path
          d="M12 18h12M18 12v12"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "View Daily Transactions",
    headline: "Monitor every customer's daily activity at a glance.",
    desc: "Instantly access and review each customer's daily deposits and withdrawals for full financial oversight.",
    img: "/recent-transaction.png",
  },
  {
    key: "export",
    icon: (
      <svg aria-hidden="true" className="h-9 w-9" fill="none">
        <rect x="6" y="6" width="24" height="24" rx="4" fill="#2563eb" opacity="0.1" />
        <path
          d="M18 12v12M12 18h12"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Export Statement",
    headline: "Generate and share customer account statements.",
    desc: "Export comprehensive statements of account for your customers, ready for printing or digital sharing.",
    img: "/customer-saving-ui.png",
  },
  {
    key: "saving-report",
    icon: (
      <svg aria-hidden="true" className="h-9 w-9" fill="none">
        <rect x="6" y="6" width="24" height="24" rx="12" fill="#2563eb" opacity="0.1" />
        <path
          d="M18 12a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6 6 6 0 0 1-6-6v-6a6 6 0 0 1 6-6z"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <circle cx="18" cy="18" r="2" fill="#2563eb" />
      </svg>
    ),
    title: "Saving Report",
    headline: "Get a comprehensive overview of each customer's savings journey.",
    desc: "Generate detailed saving reports to visualize balances, track growth, and provide customers with transparent insights into their savings history and performance.",
    img: "/saving-report.png",
  }
];

const SecondaryFeature = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Simplify Everyday Customer Management
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Tools to help you manage, monitor, and secure your customers' savings with ease.
          </p>
        </div>

        {/* Mobile: stacked features */}
        <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
          {features.map((feature) => (
            <div key={feature.key}>
              <div className="mx-auto max-w-2xl">
                <div className="w-9 rounded-lg bg-blue-600 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-sm font-medium text-blue-600">{feature.title}</h3>
                <p className="mt-2 font-display text-xl text-slate-900">{feature.headline}</p>
                <p className="mt-4 text-sm text-slate-600">{feature.desc}</p>
              </div>
              <div className="relative mt-10 pb-10">
                <div className="absolute -inset-x-4 top-8 bottom-0 bg-slate-200 sm:-inset-x-6"></div>
                <div className="relative mx-auto w-[52.75rem] max-w-full overflow-hidden rounded-xl bg-white shadow-lg ring-1 shadow-slate-900/5 ring-slate-500/10">
                  <img
                    alt={feature.title}
                    loading="lazy"
                    width="1688"
                    height="856"
                    decoding="async"
                    className="w-full"
                    style={{ color: "transparent" }}
                    src={feature.img}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: tabbed features */}
        <div className="hidden lg:mt-20 lg:block">
          <div className="grid grid-cols-3 gap-x-8" role="tablist" aria-orientation="horizontal">
            {features.map((feature, idx) => (
              <div
                key={feature.key}
                className={`relative transition-opacity ${selected === idx ? "" : "opacity-75 hover:opacity-100"}`}
                onClick={() => setSelected(idx)}
                role="tab"
                aria-selected={selected === idx}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                <div className={`w-9 rounded-lg ${selected === idx ? "bg-blue-600" : "bg-slate-500"} flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className={`mt-6 text-sm font-medium ${selected === idx ? "text-blue-600" : "text-slate-600"}`}>
                  <button
                    className="data-selected:not-data-focus:outline-hidden"
                    type="button"
                  >
                    <span className="absolute inset-0"></span>
                    {feature.title}
                  </button>
                </h3>
                <p className="mt-2 font-display text-xl text-slate-900">{feature.headline}</p>
                <p className="mt-4 text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, idx) => (
                <div
                  key={feature.key}
                  className={`px-5 transition duration-500 ease-in-out ${selected === idx ? "" : "opacity-60"}`}
                  aria-hidden={selected !== idx}
                  style={{ display: selected === idx ? "block" : "none" }}
                >
                  <div className="w-[52.75rem] max-w-full overflow-hidden rounded-xl bg-white shadow-lg ring-1 shadow-slate-900/5 ring-slate-500/10">
                    <img
                      alt={feature.title}
                      loading="lazy"
                      width="1688"
                      height="856"
                      decoding="async"
                      className="w-full"
                      style={{ color: "transparent" }}
                      src={feature.img}
                    />
                  </div>
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-slate-900/10 ring-inset"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondaryFeature;