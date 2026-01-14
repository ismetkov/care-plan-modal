/**
 * Visit Type Card Component
 * Button-based card for server-side form handling
 */

import React from "react";
import CardHeader from "../care-plan-steps/CardHeader";
import BenefitsList, { Benefit } from "../care-plan-steps/BenefitsList";
import { ArrowRightIcon } from "../care-plan-steps/Icons";

export interface VisitTypeCardProps {
  value: string;
  name?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: Benefit[];
  price: string;
  priceDescription: string;
  buttonText: string;
  isSelected?: boolean;
}

export const VisitTypeCard: React.FC<VisitTypeCardProps> = ({
  value,
  name = "visitType",
  icon,
  title,
  description,
  benefits,
  price,
  priceDescription,
  buttonText,
  isSelected = false,
}) => {
  return (
    <button
      type="submit"
      name={name}
      value={value}
      className={`
        group flex flex-col rounded-2xl bg-white transition-all duration-200 cursor-pointer overflow-hidden border border-gray-200 text-left
        ${
          isSelected
            ? "ring-2 ring-purple-primary shadow-lg"
            : "hover:ring-2 hover:ring-purple-primary hover:shadow-md"
        }
      `}
    >
      <CardHeader icon={icon} title={title} isSelected={isSelected} />

      <div className="flex flex-col grow px-6 py-5">
        {/* Upper section - grows to push divider down */}
        <div className="grow">
          <p className="text-gray-800 font-medium mb-4">{description}</p>
          <BenefitsList benefits={benefits} title={title} />
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Pricing Section */}
        <div>
          <p className="mb-4">
            <span className="text-2xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-700 ml-1">one-time payment</span>
          </p>
          <p className="text-gray-600 text-sm mb-6">{priceDescription}</p>

          {/* Visual CTA (not a real button since parent is already a button) */}
          <span
            className={`
              w-full py-3 px-6 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2
              ${
                isSelected
                  ? "bg-purple-primary text-white border-2 border-purple-primary"
                  : "bg-white text-gray-900 border-2 border-gray-900 group-hover:bg-purple-primary group-hover:text-white group-hover:border-purple-primary"
              }
            `}
          >
            {buttonText}
            <ArrowRightIcon className="w-5 h-5" />
          </span>
        </div>
      </div>
    </button>
  );
};
