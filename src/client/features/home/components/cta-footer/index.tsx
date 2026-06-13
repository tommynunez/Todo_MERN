import { P } from '@/client/shared';

type CtaFooterProps = {
  handleGetStarted: () => void;
  icon?: React.ReactNode;
};

export function CtaFooter({ handleGetStarted, icon }: CtaFooterProps) {
  return (
    <section className="bg-gradient-to-r from-slate-800 to-indigo-900 px-6 py-16 text-slate-50">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
          Ready to organize your life?
        </h2>
        <P className="mb-8 text-lg text-slate-100/85">
          Join thousands already using ChoreМate to manage tasks, collaborate,
          and get things done.
        </P>
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-md transition hover:bg-slate-100 hover:shadow-lg"
        >
          Get Started Free {icon}
        </button>
      </div>
    </section>
  );
}
