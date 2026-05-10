import { ComponentType } from 'react';
import { Button, H2, H3, P } from '@/client/shared';

export type Highlight = {
  icon: ComponentType<{ className?: string }>;
  iconSize: string;
  text: string;
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
  }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const featureStyles = {
  tasks: {
    tabActive: 'border-violet-600 bg-violet-600 text-white shadow-sm',
    tabIdle: 'border-violet-200 text-violet-700 hover:bg-violet-50',
    card: 'border-violet-200',
    icon: 'bg-violet-600',
    accent: 'text-violet-700',
    badge: 'bg-violet-100 text-violet-700',
  },
  family: {
    tabActive: 'border-orange-500 bg-orange-500 text-white shadow-sm',
    tabIdle: 'border-orange-200 text-orange-600 hover:bg-orange-50',
    card: 'border-orange-200',
    icon: 'bg-orange-500',
    accent: 'text-orange-600',
    badge: 'bg-orange-100 text-orange-700',
  },
  friends: {
    tabActive: 'border-emerald-500 bg-emerald-500 text-white shadow-sm',
    tabIdle: 'border-emerald-200 text-emerald-600 hover:bg-emerald-50',
    card: 'border-emerald-200',
    icon: 'bg-emerald-500',
    accent: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  work: {
    tabActive: 'border-blue-600 bg-blue-600 text-white shadow-sm',
    tabIdle: 'border-blue-200 text-blue-600 hover:bg-blue-50',
    card: 'border-blue-200',
    icon: 'bg-blue-600',
    accent: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
  },
} as const;

type FeatureStyleKey = keyof typeof featureStyles;

export function Features({ features, activeTab, setActiveTab }: FeaturesProps) {
  const feature = features.find((f) => f.id === activeTab);
  const activeStyle =
    featureStyles[(feature?.id as FeatureStyleKey) || 'tasks'];

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <H2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Built for every part of your life
        </H2>
        <P className="text-gray-500 text-base max-w-lg mx-auto">
          Whether you&apos;re managing a household, planning with friends, or
          running a team — ChoreМate has you covered.
        </P>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {features.map((f) => {
          const isActive = activeTab === f.id;
          const style = featureStyles[(f.id as FeatureStyleKey) || 'tasks'];
          return (
            <Button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              unstyled
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${isActive ? style.tabActive : style.tabIdle}`}
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
          className={`rounded-2xl border-2 bg-white p-8 shadow-sm transition-all md:p-10 ${activeStyle.card}`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left — description */}
            <div className="flex-1">
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ${activeStyle.icon}`}
              >
                <feature.cardIcon className="w-6 h-6" />
              </div>
              <H3 className={`mb-3 text-2xl font-bold ${activeStyle.accent}`}>
                {feature.headline}
              </H3>
              <P className="text-gray-600 leading-relaxed mb-6 text-base">
                {feature.description}
              </P>
            </div>

            {/* Right — highlights */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 mx-auto">
              {feature.highlights.map((h) => (
                <div
                  key={h.text}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 ${activeStyle.badge}`}
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
}
