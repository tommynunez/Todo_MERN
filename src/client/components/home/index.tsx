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
import { Features } from "./features";
import { CtaFooter } from "./ctafooter";
import { Audience } from "./audience";
import { Stats } from "./stats";

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

export const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tasks");

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* ── HERO ── */}
      

      {/* ── STATS BAR ── */}
      <Stats stats={stats} />
      <Features
        features={features}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Audience audiences={audiences} />
      <CtaFooter
        handleGetStarted={handleGetStarted}
        icon={<ArrowRightIcon className="w-5 h-5" />}
      />
    </div>
  );
};
