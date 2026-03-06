import { useState } from "react";
import { useNavigate } from "react-router-dom";
import rawData from "./data.json";
import {
  SparklesIcon,
  BellIcon,
  CheckBadgeIcon,
  CheckIcon,
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  WindowIcon,
  CalendarIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

// ── Icon Mapping ─────────────────────────────────────────────────────────────

const IconMap = {
  Zap: SparklesIcon,
  Bell: BellIcon,
  ShieldCheck: CheckBadgeIcon,
  ListChecks: CheckIcon,
  Home: HomeIcon,
  Users: UsersIcon,
  Briefcase: BriefcaseIcon,
  ArrowRight: ArrowRightIcon,
  Layers: WindowIcon,
  CalendarDays: CalendarIcon,
  RefreshCcw: ArrowPathIcon,
  BarChart2: ChartBarIcon,
  MessageSquare: ChatBubbleLeftRightIcon,
  UserCheck: UserIcon,
  GitMerge: ArrowUpTrayIcon,
  Clock: ClockIcon,
  GraduationCap: AcademicCapIcon,
  Rocket: RocketLaunchIcon,
  Building2: BuildingOffice2Icon,
} as const;

// ── Data Mapper ──────────────────────────────────────────────────────────────

const getIcon = (iconName: keyof typeof IconMap) => {
  const IconComponent = IconMap[iconName];
  return IconComponent;
};

// Process raw data and inject icons
const stats = rawData.stats.map((s) => ({
  ...s,
  icon: getIcon(s.icon as keyof typeof IconMap),
}));

const features = rawData.features.map((f) => ({
  ...f,
  tabIcon: getIcon(f.tabIcon as keyof typeof IconMap),
  cardIcon: getIcon(f.cardIcon as keyof typeof IconMap),
  highlights: f.highlights.map((h) => ({
    ...h,
    icon: getIcon(h.icon as keyof typeof IconMap),
  })),
}));

const audiences = rawData.audiences.map((a) => ({
  ...a,
  icon: getIcon(a.icon as keyof typeof IconMap),
}));
// ── Color Map (Tailwind to CSS) ───────────────────────────────────────────

const tailwindColorMap: Record<string, string> = {
  "bg-violet-600": "#7c3aed",
  "bg-orange-500": "#f97316",
  "bg-emerald-500": "#10b981",
  "bg-blue-600": "#2563eb",
  "text-white": "#ffffff",
  "text-violet-500": "#8b5cf6",
  "text-violet-600": "#7c3aed",
  "text-orange-500": "#f97316",
  "text-emerald-600": "#059669",
  "text-emerald-500": "#10b981",
  "text-blue-600": "#2563eb",
  "border-violet-600": "#7c3aed",
  "border-orange-500": "#f97316",
  "border-emerald-500": "#10b981",
  "border-blue-600": "#2563eb",
  "border-violet-100": "#ede9fe",
  "border-orange-100": "#fed7aa",
  "border-emerald-100": "#d1fae5",
  "border-blue-100": "#dbeafe",
  "bg-violet-50": "#f5f3ff",
  "bg-orange-50": "#fff7ed",
  "bg-emerald-50": "#f0fdf4",
  "bg-blue-50": "#f0f9ff",
  "bg-violet-100": "#ede9fe",
  "bg-orange-100": "#fed7aa",
  "bg-emerald-100": "#d1fae5",
  "bg-blue-100": "#dbeafe",
  "text-violet-700": "#6d28d9",
  "text-orange-700": "#c2410c",
  "text-emerald-700": "#047857",
  "text-blue-700": "#1d4ed8",
};

const parseClassesToStyle = (classes: string): React.CSSProperties => {
  const style: React.CSSProperties = {};
  const classList = classes.split(" ");

  classList.forEach((cls) => {
    if (cls.startsWith("bg-")) {
      const color = tailwindColorMap[cls];
      if (color) style.backgroundColor = color;
    } else if (cls.startsWith("text-")) {
      const color = tailwindColorMap[cls];
      if (color) style.color = color;
    } else if (cls.startsWith("border-") && !cls.startsWith("border-2")) {
      const color = tailwindColorMap[cls];
      if (color) style.borderColor = color;
    }
  });

  return style;
};
// ── Component ────────────────────────────────────────────────────────────────

export const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tasks");

  const feature = features.find((f) => f.id === activeTab);
  const color = (feature || features[0]).color;

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 text-white px-6 py-24 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-widest uppercase">
          All-in-one task manager
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Chore<span className="text-yellow-300">Mate</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-8 leading-relaxed">
          Organize tasks, collaborate with{" "}
          <strong>family, friends & coworkers</strong> — all in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { iconKey: "Bell", text: "Smart Reminders" },
            { iconKey: "Users", text: "Real-Time Collaboration" },
            { iconKey: "ShieldCheck", text: "Works Everywhere" },
          ].map((badge) => {
            const IconComponent =
              IconMap[badge.iconKey as keyof typeof IconMap];
            return (
              <span
                key={badge.text}
                className="flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                <IconComponent className="w-4 h-4" />
                {badge.text}
              </span>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 bg-white text-violet-600 font-bold px-7 py-3 rounded-full shadow hover:shadow-lg transition"
          >
            Get Started Free <ArrowRightIcon className="w-4 h-4" />
          </button>
          <button className="border border-white/50 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition">
            See How It Works
          </button>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-wrap divide-x divide-gray-100">
          {stats.map((s) => (
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

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Built for every part of your life
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Whether you're managing a household, planning with friends, or
            running a team — ChoreМate has you covered.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all"
              style={parseClassesToStyle(
                activeTab === f.id ? f.color.tab : f.color.tabIdle,
              )}
            >
              <f.tabIcon className="w-4 h-4" />
              {f.label}
            </button>
          ))}
        </div>

        {/* Active Feature Card */}
        {feature && (
          <div
            className="bg-white rounded-2xl border-2 shadow-sm p-8 md:p-10 transition-all"
            style={{
              borderColor: tailwindColorMap[feature.color.card] || "#ede9fe",
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Left — description */}
              <div className="flex-1">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-4"
                  style={parseClassesToStyle(feature.color.iconBg)}
                >
                  <feature.cardIcon className="w-6 h-6" />
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={parseClassesToStyle(feature.color.accent)}
                >
                  {feature.headline}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-base">
                  {feature.description}
                </p>
                <button
                  className="flex items-center gap-1 font-semibold text-sm hover:underline"
                  style={parseClassesToStyle(feature.color.accent)}
                >
                  Learn more <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Right — highlights */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {feature.highlights.map((h) => (
                  <div
                    key={h.text}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={parseClassesToStyle(feature.color.badge)}
                  >
                    <span className="shrink-0 w-4 h-4">
                      <h.icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-medium">{h.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-white border-t border-gray-100 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Who uses ChoreМate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {audiences.map((audience) => (
              <div
                key={audience.label}
                className="flex flex-col items-center text-center p-6 rounded-2xl"
                style={parseClassesToStyle(audience.color)}
              >
                <div className="mb-3 w-7 h-7">
                  <audience.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg mb-1">{audience.label}</h3>
                <p className="text-sm opacity-75">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to organize your life?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands already using ChoreМate to manage tasks, collaborate,
            and get things done.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-white text-violet-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition"
          >
            Get Started Free <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};
