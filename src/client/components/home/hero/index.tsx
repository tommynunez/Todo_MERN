import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { P } from '@/client/shared';
import { Cta } from '@/client/shared/Cta';

type HeroProps = {
  handleGetStarted: () => void;
  iconMapping: Record<string, React.ComponentType<{ className?: string }>>;
};

export function Hero({ handleGetStarted, iconMapping }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 text-white px-6 py-24 text-center">
      <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-widest uppercase">
        All-in-one task manager
      </span>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
        Chore
        <span className="text-yellow-300">Mate</span>
      </h1>
      <P className="text-lg md:text-xl text-yellow-300 max-w-xl mx-auto mb-8 leading-relaxed">
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
              className="flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full"
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
