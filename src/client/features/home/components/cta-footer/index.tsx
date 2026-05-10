import { P } from '@/client/shared';

type CtaFooterProps = {
  handleGetStarted: () => void;
  icon?: React.ReactNode;
};

export function CtaFooter({ handleGetStarted, icon }: CtaFooterProps) {
  return (
    <section className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to organize your life?
        </h2>
        <P className="text-lg text-white/90 mb-8">
          Join thousands already using ChoreМate to manage tasks, collaborate,
          and get things done.
        </P>
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center gap-2 bg-white text-violet-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition"
        >
          Get Started Free
          {' '}
          {icon}
        </button>
      </div>
    </section>
  );
}
