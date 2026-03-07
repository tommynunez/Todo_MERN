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
        className="flex items-center gap-2 bg-white text-violet-600 font-bold px-7 py-3 rounded-full shadow hover:shadow-lg transition"
      >
        Get Started Free
        {' '}
        {icon}
      </Button>
      <Button className="border border-white/50 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition">
        See How It Works
      </Button>
    </div>
  );
}
