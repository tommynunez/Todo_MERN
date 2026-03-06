import { Button, H2, H3, P } from "@/client/shared";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ComponentType } from "react";

export type Highlight = {
  icon: ComponentType<{ className?: string }>;
  iconSize: string;
  text: string;
};

type Color = {
  tab: { bg: string; text: string; border: string };
  tabIdle: { text: string; border: string; hoverBg: string };
  card: { border: string };
  iconBg: string;
  accent: string;
  badge: { bg: string; text: string };
};

type FeaturesProps = {
  features: {
    id: string;
    tabIcon: ComponentType<{ className?: string }>;
    tabIconSize: string;
    cardIcon: ComponentType<{ className?: string }>;
    cardIconSize: string;
    label: string;
    headline: string;
    description: string;
    highlights: Highlight[];
    color: Color;
  }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

export const Features = ({
  features,
  activeTab,
  setActiveTab,
}: FeaturesProps) => {
  const feature = features.find((f) => f.id === activeTab);
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <H2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Built for every part of your life
        </H2>
        <P className="text-gray-500 text-base max-w-lg mx-auto">
          Whether you're managing a household, planning with friends, or running
          a team — ChoreМate has you covered.
        </P>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {features.map((f) => {
          const isActive = activeTab === f.id;
          const colorObj = isActive ? f.color.tab : f.color.tabIdle;
          return (
            <Button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all"
              style={{
                backgroundColor: colorObj.bg,
                color: colorObj.text,
                borderColor: colorObj.border,
              }}
            >
              <f.tabIcon className="w-4 h-4" />
              {f.label}
            </Button>
          );
        })}
      </div>

      {/* Active Feature Card */}
      {feature && (
        <div
          className="bg-white rounded-2xl border-2 shadow-sm p-8 md:p-10 transition-all"
          style={{
            borderColor: feature.color.card.border,
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left — description */}
            <div className="flex-1">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-4"
                style={{
                  backgroundColor: feature.color.iconBg,
                }}
              >
                <feature.cardIcon className="w-6 h-6" />
              </div>
              <H3
                className="text-2xl font-bold mb-3"
                style={{
                  color: feature.color.accent,
                }}
              >
                {feature.headline}
              </H3>
              <P className="text-gray-600 leading-relaxed mb-6 text-base">
                {feature.description}
              </P>
              <Button
                className="flex items-center gap-1 font-semibold text-sm hover:underline"
                style={{
                  color: feature.color.accent,
                }}
              >
                Learn more <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Right — highlights */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {feature.highlights.map((h) => (
                <div
                  key={h.text}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: feature.color.badge.bg,
                    color: feature.color.badge.text,
                  }}
                >
                  <span className="shrink-0 w-4 h-4">
                    <h.icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-medium">{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
