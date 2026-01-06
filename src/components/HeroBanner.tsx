/**
 * Hero Banner Component
 * Main hero section promoting the care plan evaluation
 */

import React from 'react';
import { MODAL_IDS } from '../constants/modal-ids';

const CONTENT = {
  TITLE: {
    PART1: 'Get clarity and support',
    PART2: 'for your caregiving journey',
  },
  SUBTITLE: {
    PART1: 'Receive an in-person or virtual',
    EVALUATION: 'evaluation by a nurse',
    PART2: 'that delivers a customized action plan designed to support your loved one.',
  },
  BUTTON: 'Learn more',
  PHONE: {
    TEXT: 'or call',
    NUMBER: '(833) 752-1781',
    HOURS: 'Monday – Friday, 8:30am – 6pm ET',
  },
} as const;

const PHONE_HREF = 'tel:8337521781';

const HeroBanner: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4" aria-label="Hero banner">
      <div className="max-w-5xl mx-auto text-center">
        {/* Decorative dots */}
        <div className="flex justify-center gap-4 mb-8" aria-hidden="true">
          <div className="w-8 h-8 rounded-full border-4 border-purple-200 opacity-50" />
          <div className="w-8 h-8 rounded-full border-4 border-purple-200 opacity-50" />
          <div className="w-8 h-8 rounded-full border-4 border-purple-200 opacity-50" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          <span className="text-gray-900">{CONTENT.TITLE.PART1} </span>
          <span className="text-purple-primary">{CONTENT.TITLE.PART2}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-4xl mx-auto">
          {CONTENT.SUBTITLE.PART1}{' '}
          <strong className="text-purple-primary font-semibold">
            {CONTENT.SUBTITLE.EVALUATION}
          </strong>{' '}
          {CONTENT.SUBTITLE.PART2}
        </p>

        {/* CTA Button */}
        <button
          data-modal-open={MODAL_IDS.CARE_PLAN}
          className="bg-purple-primary hover:bg-purple-dark text-white font-semibold text-lg py-4 px-12 rounded-lg transition-colors mb-6 cursor-pointer"
          type="button"
          aria-label="Learn more about care plan evaluation"
        >
          {CONTENT.BUTTON}
        </button>

        {/* Phone contact */}
        <address className="text-center not-italic">
          <p className="text-gray-700 mb-1">
            {CONTENT.PHONE.TEXT}{' '}
            <a
              href={PHONE_HREF}
              className="text-gray-900 font-semibold hover:underline"
            >
              {CONTENT.PHONE.NUMBER}
            </a>
          </p>
          <p className="text-gray-600 text-sm">
            <time>{CONTENT.PHONE.HOURS}</time>
          </p>
        </address>
      </div>
    </section>
  );
};

export default HeroBanner;
