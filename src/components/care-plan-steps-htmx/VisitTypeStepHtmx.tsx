import React from "react";
import { VisitTypeCard } from "./VisitTypeCard";
import { HomeIcon, VideoIcon } from "../care-plan-steps/Icons";

const visitTypeOptions = [
  {
    value: "in-home",
    icon: <HomeIcon className="w-7 h-7" />,
    title: "In-Home visit",
    description: "A nurse visits you at home",
    benefits: [
      { text: "No tech required" },
      { text: "9am – 7pm, plus weekends" },
      { text: "Family can join in person" },
    ],
    price: "$299",
    priceDescription: "includes visit and Care Plan",
    buttonText: "Choose in-home",
  },
  {
    value: "video",
    icon: <VideoIcon className="w-7 h-7" />,
    title: "Video visit",
    description: "Meet with a nurse by Zoom",
    benefits: [
      { text: "Internet / Zoom required" },
      { text: "9am – 6pm ET weekdays only" },
      { text: "Family can join from anywhere" },
    ],
    price: "$249",
    priceDescription: "includes visit and Care Plan",
    buttonText: "Choose video",
  },
];

type VisitType = "in-home" | "video";

const VisitTypeStepHtmx: React.FC = () => {
  const selectedValue: VisitType = "in-home";

  const header = (
    <header className="mb-8">
      <h2 id="visit-type-heading" className="text-4xl font-serif mb-4">
        Choose how you'd like to meet with your nurse
      </h2>
      <p className="text-gray-600">
        Both options provide the same 1-hour nurse evaluation and written Care
        Plan. CareScout has provided evaluations to families for{" "}
        <strong>over 20 years</strong>.
      </p>
    </header>
  );

  return (
    <section aria-labelledby="visit-type-heading">
      {header}

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        role="group"
        aria-label="Visit type options"
      >
        {visitTypeOptions.map((option) => (
          <VisitTypeCard
            key={option.value}
            value={option.value}
            name="visitType"
            icon={option.icon}
            title={option.title}
            description={option.description}
            benefits={option.benefits}
            price={option.price}
            priceDescription={option.priceDescription}
            buttonText={option.buttonText}
            isSelected={selectedValue === option.value}
          />
        ))}
      </div>
    </section>
  );
};

export default VisitTypeStepHtmx;
