import { ComponentType } from 'react';
import { H3, P } from '@/client/shared';

export type HomeAudience = {
  icon: ComponentType<{ className?: string }>;
  iconSize: string;
  label: string;
  desc: string;
};

const audienceStyles = {
  Households: 'bg-violet-50 text-violet-600',
  Students: 'bg-orange-50 text-orange-500',
  Startups: 'bg-emerald-50 text-emerald-600',
  Companies: 'bg-blue-50 text-blue-600',
} as const;

type AudienceStyleKey = keyof typeof audienceStyles;

export function Audience({ audiences }: { audiences: HomeAudience[] }) {
  return (
    <section className="bg-white border-t border-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <H3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
          Who uses ChoreМate
        </H3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((audience) => (
            <div
              key={audience.label}
              className={`flex flex-col items-center rounded-2xl p-6 text-center ${audienceStyles[(audience.label as AudienceStyleKey) || 'Households']}`}
            >
              <div className="mb-3 w-7 h-7">
                <audience.icon className="w-7 h-7" />
              </div>
              <H3 className="mb-1 text-lg font-bold text-inherit dark:text-inherit">
                {audience.label}
              </H3>
              <P className="text-sm text-inherit opacity-75 dark:text-inherit">
                {audience.desc}
              </P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
