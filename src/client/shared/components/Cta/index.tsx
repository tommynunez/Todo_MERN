import { Button } from '../Button';

export type CtaType = {
  handleGetStarted: () => void;
  icon?: React.ReactNode;
};

export function Cta({ handleGetStarted, icon }: CtaType) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Button
        onClick={handleGetStarted}
        unstyled
        className="flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-slate-900 shadow-md transition hover:bg-slate-100 hover:shadow-lg"
      >
        Get Started Free {icon}
      </Button>
      <Button
        unstyled
        className="rounded-full border border-white/30 px-7 py-3 font-medium text-slate-100 transition hover:bg-white/10"
      >
        See How It Works
      </Button>
    </div>
  );
}
