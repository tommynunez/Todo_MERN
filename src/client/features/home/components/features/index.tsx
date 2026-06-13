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
    tabActive: 'border-slate-800 bg-slate-800 text-white shadow-sm',
    tabIdle: 'border-slate-200 text-slate-700 hover:bg-slate-50',
    card: 'border-slate-200 bg-slate-50/70',
    icon: 'bg-slate-800',
    accent: 'text-slate-900',
    badge: 'border border-slate-200 bg-white text-slate-700',
  },
  family: {
    tabActive: 'border-amber-700 bg-amber-700 text-white shadow-sm',
    tabIdle: 'border-amber-200 text-amber-800 hover:bg-amber-50',
    card: 'border-amber-200 bg-amber-50/60',
    icon: 'bg-amber-700',
    accent: 'text-slate-900',
    badge: 'border border-amber-200 bg-white text-slate-700',
  },
  friends: {
    tabActive: 'border-teal-700 bg-teal-700 text-white shadow-sm',
    tabIdle: 'border-teal-200 text-teal-800 hover:bg-teal-50',
    card: 'border-teal-200 bg-teal-50/60',
    icon: 'bg-teal-700',
    accent: 'text-slate-900',
    badge: 'border border-teal-200 bg-white text-slate-700',
  },
  work: {
    tabActive: 'border-indigo-800 bg-indigo-800 text-white shadow-sm',
    tabIdle: 'border-indigo-200 text-indigo-800 hover:bg-indigo-50',
    card: 'border-indigo-200 bg-indigo-50/60',
    icon: 'bg-indigo-800',
    accent: 'text-slate-900',
    badge: 'border border-indigo-200 bg-white text-slate-700',
  },
} as const;

type FeatureStyleKey = keyof typeof featureStyles;

export function Features({ features, activeTab, setActiveTab }: FeaturesProps) {
  const feature = features.find((f) => f.id === activeTab);
  const activeStyle =
    featureStyles[(feature?.id as FeatureStyleKey) || 'tasks'];

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <H2 className="mb-3 text-3xl font-semibold text-slate-900 md:text-4xl">
          Built for every part of your life
        </H2>
        <P className="mx-auto max-w-lg text-base text-slate-600">
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
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${isActive ? style.tabActive : style.tabIdle}`}
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
          className={`rounded-2xl border p-8 shadow-sm transition-all md:p-10 ${activeStyle.card}`}
        >
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Left — description */}
            <div className="flex-1">
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ${activeStyle.icon}`}
              >
                <feature.cardIcon className="w-6 h-6" />
              </div>
              <H3 className={`mb-3 text-2xl ${activeStyle.accent}`}>
                {feature.headline}
              </H3>
              <P className="mb-6 text-base leading-relaxed text-slate-600">
                {feature.description}
              </P>
            </div>

            {/* Right — highlights */}
            <div className="mx-auto grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
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
