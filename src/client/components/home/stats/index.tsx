import { ComponentType } from 'react';

type Stat = {
  icon: ComponentType<{ className?: string }>;
  iconSize: string;
  value: string;
  label: string;
};

type Stats = {
  stats: Stat[];
};

export function Stats({ stats }: Stats) {
  console.log('Stats component received stats:', stats);
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto flex flex-wrap divide-x divide-gray-100">
        {stats?.map((s) => (
          <div
            key={s.value}
            className="flex-1 min-w-[150px] flex flex-col items-center py-7 px-4 text-center"
          >
            <div className="text-violet-500 mb-2">
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-gray-900">
              {s.value}
            </div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
