import * as LucideIcons from "lucide-react";
import {
  Award,
  BookOpen,
  Bot,
  Box,
  Building,
  CheckCircle,
  Cloud,
  Code2,
  DollarSign,
  Eye,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  Laptop,
  Layers,
  LifeBuoy,
  Palmtree,
  PartyPopper,
  Scale,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Award,
  BookOpen,
  Bot,
  Box,
  Building,
  CheckCircle,
  Cloud,
  Code2,
  DollarSign,
  Eye,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  Laptop,
  Layers,
  LifeBuoy,
  Palmtree,
  PartyPopper,
  Scale,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Users,
};

export function getIcon(name: string): LucideIcon {
  if (iconMap[name]) {
    return iconMap[name];
  }

  const dynamicIcon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  return dynamicIcon ?? Box;
}

export { Layers };
