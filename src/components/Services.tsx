import React from 'react';
import { ArrowUpRight, Check, Clock, Tag } from 'lucide-react';
import { servicesData } from '../data/services';
import { FreelanceService } from '../types';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
            05. Practical Client Engagements
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F2] mt-2">
            Freelance & Development Services
          </h2>
          <p className="text-sm sm:text-base text-[#A4AAA9] mt-2 max-w-2xl leading-relaxed">
            Targeted development offerings focused on solving practical client bottlenecks. Clear deliverables, realistic timelines, and collaborative communication.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-[#171B1F] border border-[#292F32] hover:border-[#3E4549] rounded-2xl p-6 flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-[#F5F5F2]">{service.title}</h3>
                  {service.popular && (
                    <span className="text-[11px] font-mono-code text-[#C7FF4F] whitespace-nowrap shrink-0">
                      Popular
                    </span>
                  )}
                </div>

                {/* The Problem Solved */}
                <p className="text-xs sm:text-sm text-[#A4AAA9] leading-relaxed mb-5">
                  {service.clientProblem}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono-code uppercase text-[#6B7280] block">
                    Deliverables:
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#F5F5F2]">
                      <Check className="w-3.5 h-3.5 text-[#C7FF4F] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech & Timeline strip */}
                <div className="pt-4 border-t border-[#242A2E] space-y-2 text-xs text-[#A4AAA9] font-mono-code mb-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#6B7280]">
                      <Clock className="w-3 h-3" /> Turnaround:
                    </span>
                    <span className="text-[#F5F5F2] text-[11px]">{service.turnaroundTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#6B7280]">
                      <Tag className="w-3 h-3" /> Pricing:
                    </span>
                    <span className="text-[#C7FF4F] text-[11px] font-medium">{service.startingPrice}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(service.id)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#0B0D0F] bg-[#F5F5F2] hover:bg-[#C7FF4F] rounded-lg transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Discuss Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#0B0D0F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Transparent Workflow Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-[#121518] border border-[#292F32] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#F5F5F2]">Have a tailored project or bespoke script requirement?</h4>
            <p className="text-xs text-[#A4AAA9]">
              Every client engagement begins with a clear scope review, timeline estimate, and milestone deliverables agreement.
            </p>
          </div>
          <button
            onClick={() => onSelectService('Custom Inquiry')}
            className="px-5 py-2.5 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Request Custom Scope
          </button>
        </div>
      </div>
    </section>
  );
};
