import React, { useState } from "react";

const features = [
  {
    key: "entry",
    title: "Daily Entry Recording",
    desc: "Easily record customer daily deposits and withdrawals. Every debit and credit is tracked in real time for complete financial transparency.",
    img: "/customer-saving-ui.png",
  },
  {
    key: "notification",
    title: "Monthly Balance Notification",
    desc: "Automatically send personalized monthly balance notifications to customers, keeping them informed and engaged.",
    img: "/customer-messaging.png",
  },
  {
    key: "statement",
    title: "Export Statement of Account",
    desc: "Export customer transactions as a detailed Statement of Account for easy sharing, printing, or record-keeping.",
    img: "/customer-saving-ui.png",
  },
  {
    key: "security",
    title: "End-to-End Data Encryption",
    desc: "All customer data is protected with secure end-to-end encryption, ensuring privacy, avoid fraudluent acts and data integrity at every step.",
    img: "/customer-saving-ui.png",
  },
];

const PrimaryFeatures = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"
    >
      <img
        alt=""
        loading="lazy"
        width="2245"
        height="1636"
        decoding="async"
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-[44%] -translate-y-[42%]"
        style={{ color: "transparent" }}
        src="/_next/static/media/background-features.5f7a9ac9.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Powerful Features for Customer Savings Management
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Manage daily transactions, notify customers, and keep data secure—all in one place.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
          {/* Tabs */}
          <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
            <div
              className="relative z-10 flex gap-x-4 px-4 whitespace-nowrap sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
              role="tablist"
              aria-orientation="vertical"
            >
              {features.map((feature, idx) => (
                <div
                  key={feature.key}
                  className={`group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 ${
                    selected === idx
                      ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-white/10 lg:ring-inset"
                      : "hover:bg-white/10 lg:hover:bg-white/5"
                  }`}
                >
                  <h3>
                    <button
                      className={`font-display text-lg ${
                        selected === idx
                          ? "text-blue-600 lg:text-white"
                          : "text-blue-100 hover:text-white lg:text-white"
                      }`}
                      role="tab"
                      aria-selected={selected === idx}
                      tabIndex={selected === idx ? 0 : -1}
                      onClick={() => setSelected(idx)}
                    >
                      <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"></span>
                      {feature.title}
                    </button>
                  </h3>
                  <p
                    className={`mt-2 hidden text-sm lg:block ${
                      selected === idx
                        ? "text-white"
                        : "text-blue-100 group-hover:text-white"
                    }`}
                  >
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Tab Panel */}
          <div className="lg:col-span-7">
            <div className="relative sm:px-6 lg:hidden">
              <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-white/10 ring-inset sm:inset-x-0 sm:rounded-t-xl"></div>
              <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                {features[selected].desc}
              </p>
            </div>
            <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
              <img
                alt={features[selected].title}
                width="2174"
                height="1464"
                decoding="async"
                className="w-full"
                style={{ color: "transparent" }}
                src={features[selected].img}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimaryFeatures;