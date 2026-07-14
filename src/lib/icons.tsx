import {
  Award,
  BarChart3,
  Building2,
  Coins,
  Flame,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  MonitorPlay,
  Phone,
  PieChart,
  Share2,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Icons are stored in the CMS as lucide component-name strings; map them back
// to components at render time. Extend this map when new icon names are used.
const ICONS: Record<string, LucideIcon> = {
  Award,
  BarChart3,
  Building2,
  Coins,
  Flame,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  MonitorPlay,
  Phone,
  PieChart,
  Share2,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  Users,
  Wallet,
  Wrench,
};

export function iconByName(name: string | null | undefined): LucideIcon {
  return (name && ICONS[name]) || Sparkles;
}
