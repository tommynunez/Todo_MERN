import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { P } from '@/client/shared';
import { Cta } from '@/client/shared/components/Cta';

type HeroProps = {
  handleGetStarted: () => void;
  iconMapping: Record<string, React.ComponentType<{ className?: string }>>;
};

export function Hero({ handleGetStarted, iconMapping }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-indigo-900 text-slate-50 px-6 py-24 text-center">
      <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-100 mb-5">
        All-in-one task manager
      </span>
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
        Chore
        <span className="text-sky-300">Mate</span>
      </h1>
      <P className="text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed text-slate-100/90">
        Organize tasks, collaborate with{' '}
        <strong>family, friends & coworkers</strong>
        all in one place.
      </P>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { iconKey: 'Bell', text: 'Smart Reminders' },
          { iconKey: 'Users', text: 'Real-Time Collaboration' },
          { iconKey: 'ShieldCheck', text: 'Works Everywhere' },
        ].map((badge) => {
          const IconComponent =
            iconMapping[badge.iconKey as keyof typeof iconMapping];
          return (
            <span
              key={badge.text}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100"
            >
              <IconComponent className="w-4 h-4" />
              {badge.text}
            </span>
          );
        })}
      </div>

      {/* CTAs */}
      <Cta
        handleGetStarted={handleGetStarted}
        icon={<ArrowRightIcon className="w-4 h-4" />}
      />
    </section>
  );
}
