import { ComponentType } from 'react';
import { H3, P } from '@/client/shared';

export type HomeAudience = {
  icon: ComponentType<{ className?: string }>;
  iconSize: string;
  label: string;
  desc: string;
};

const audienceStyles = {
  Households: 'border-slate-200 bg-slate-50 text-slate-700',
  Students: 'border-amber-200 bg-amber-50 text-amber-800',
  Startups: 'border-teal-200 bg-teal-50 text-teal-800',
  Companies: 'border-indigo-200 bg-indigo-50 text-indigo-800',
} as const;

type AudienceStyleKey = keyof typeof audienceStyles;

export function Audience({ audiences }: { audiences: HomeAudience[] }) {
  return (
    <section className="border-t border-slate-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <H3 className="mb-10 text-center text-2xl text-slate-900 md:text-3xl">
          Who uses ChoreМate
        </H3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div
              key={audience.label}
              className={`flex flex-col items-center rounded-2xl border p-6 text-center ${audienceStyles[(audience.label as AudienceStyleKey) || 'Households']}`}
            >
              <div className="mb-3 w-7 h-7">
                <audience.icon className="w-7 h-7" />
              </div>
              <H3 className="mb-1 text-lg text-inherit dark:text-inherit">
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
