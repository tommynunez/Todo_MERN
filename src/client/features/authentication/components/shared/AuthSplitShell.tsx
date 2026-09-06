import type { ComponentType, ReactNode } from 'react';
import { BrandMark, H1, P } from '@/client/shared';

type AuthSplitHighlight = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type AuthSplitShellProps = {
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  heroBadges: readonly string[];
  heroHighlights: readonly AuthSplitHighlight[];
  panelEyebrow: string;
  panelTitle: string;
  panelDescription: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthSplitShell({
  heroLabel,
  heroTitle,
  heroDescription,
  heroBadges,
  heroHighlights,
  panelEyebrow,
  panelTitle,
  panelDescription,
  children,
  footer,
}: AuthSplitShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-vscode-bg dark:text-vscode-text">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)]">
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 px-6 py-14 text-slate-900 sm:px-10 lg:px-14 lg:py-16 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 dark:text-slate-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.14),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.18),_transparent_28%)]" />
          <div className="relative mx-auto flex h-full w-full max-w-2xl flex-col justify-between gap-12">
            <div className="space-y-8">
              <div>
                <span className="mb-5 inline-flex rounded-full border border-slate-300/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm shadow-sky-200/50 dark:border-white/15 dark:bg-white/10 dark:text-slate-100 dark:shadow-none">
                  {heroLabel}
                </span>
                <H1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                  {heroTitle}
                </H1>
                <P className="mt-5 max-w-xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-200">
                  {heroDescription}
                </P>
              </div>

              <div className="flex flex-wrap gap-3">
                {heroBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-slate-300/80 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-sky-200/40 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:shadow-none"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroHighlights.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-200/80 bg-white/65 p-5 shadow-lg shadow-sky-100/60 backdrop-blur-sm dark:border-white/10 dark:bg-white/8 dark:shadow-none"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-sky-600/10 p-3 text-sky-700 dark:bg-sky-300/12 dark:text-sky-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <P className="text-base font-semibold text-slate-900 dark:text-white">
                    {title}
                  </P>
                  <P className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {description}
                  </P>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center bg-white px-6 py-12 text-slate-900 sm:px-10 lg:px-12 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 dark:text-slate-50">
          <div className="mx-auto w-full space-y-8">
            <div className="space-y-3 text-center lg:text-left">
              <P className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-sky-200/80">
                {panelEyebrow}
              </P>
              <H1 className="text-slate-900 dark:text-white">{panelTitle}</H1>
              <P className="text-slate-600 dark:text-slate-200">
                {panelDescription}
              </P>
            </div>

            {children}

            {footer ? (
              <div className="space-y-2 text-center lg:text-left">{footer}</div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
