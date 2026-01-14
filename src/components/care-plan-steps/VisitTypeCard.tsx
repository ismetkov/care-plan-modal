/**
 * Visit Type Card Component
 * Displays a selectable visit type option (In-Home or Video)
 */

import React from "react";
import CardHeader from "./CardHeader";
import BenefitsList, { Benefit } from "./BenefitsList";
import PricingSection from "./PricingSection";

export interface VisitTypeCardProps {
  value: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: Benefit[];
  price: string;
  priceDescription: string;
  buttonText: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const VisitTypeCard: React.FC<VisitTypeCardProps> = ({
  value,
  icon,
  title,
  description,
  benefits,
  price,
  priceDescription,
  buttonText,
  isSelected = false,
  onSelect,
}) => {
  return (
    <article
      data-value={value}
      onClick={onSelect}
      className={`
        group flex flex-col rounded-2xl bg-white transition-all duration-200 cursor-pointer overflow-hidden border border-gray-200
        ${
          isSelected
            ? "ring-2 ring-purple-primary shadow-lg"
            : "hover:ring-2 hover:ring-purple-primary hover:shadow-md"
        }
      `}
    >
      <CardHeader icon={icon} title={title} isSelected={isSelected} />

      <div className="flex flex-col grow px-6 py-5 text-left">
        {/* Upper section - grows to push divider down */}
        <div className="grow">
          <p className="text-gray-800 font-medium mb-4">{description}</p>
          <BenefitsList benefits={benefits} title={title} />
        </div>

        <hr className="border-gray-200 my-6" />

        <PricingSection
          price={price}
          priceDescription={priceDescription}
          buttonText={buttonText}
          isSelected={isSelected}
        />
      </div>
    </article>
  );
};

export default VisitTypeCard;
