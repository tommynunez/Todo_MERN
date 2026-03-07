import { ComponentType } from 'react';
import { H3, P } from '@/client/shared';

export type HomeAudience = {
  icon: ComponentType<{ className?: string }>;
  iconSize: string;
  label: string;
  desc: string;
  color: { text: string; bg: string };
};

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
              className="flex flex-col items-center text-center p-6 rounded-2xl"
              style={{
                color: audience.color.text,
                backgroundColor: audience.color.bg,
              }}
            >
              <div className="mb-3 w-7 h-7">
                <audience.icon className="w-7 h-7" />
              </div>
              <H3 className="font-bold text-lg mb-1">{audience.label}</H3>
              <P className="text-sm opacity-75">{audience.desc}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
