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
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap divide-x divide-slate-200">
        {stats?.map((s) => (
          <div
            key={s.value}
            className="flex min-w-[150px] flex-1 flex-col items-center px-4 py-7 text-center"
          >
            <div className="mb-2 text-slate-500">
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-semibold text-slate-900">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
