'use client';

import * as PhosphorIconsRaw from '@phosphor-icons/react';

export const PhosphorIcons = {
  Hamburger: PhosphorIconsRaw.List,
  X: PhosphorIconsRaw.X,
  ArrowRight: PhosphorIconsRaw.ArrowRight,
  ArrowLeft: PhosphorIconsRaw.ArrowLeft,
  ArrowDown: PhosphorIconsRaw.ArrowDown,
  Check: PhosphorIconsRaw.Check,
  Mail: PhosphorIconsRaw.Envelope,
  Phone: PhosphorIconsRaw.Phone,
  Chat: PhosphorIconsRaw.ChatCircle,
  Whatsapp: PhosphorIconsRaw.WhatsappLogo,
  Trophy: PhosphorIconsRaw.Trophy,
  Medal: PhosphorIconsRaw.Medal,
  SoccerBall: PhosphorIconsRaw.SoccerBall,
  UsersThree: PhosphorIconsRaw.UsersThree,
  Whistle: PhosphorIconsRaw.ChalkboardTeacher,
  Lightning: PhosphorIconsRaw.Lightning,
  Target: PhosphorIconsRaw.Target,
  ShieldCheck: PhosphorIconsRaw.ShieldCheck,
  Heart: PhosphorIconsRaw.Heart,
  Star: PhosphorIconsRaw.Star,
  Flag: PhosphorIconsRaw.Flag,
  MapPin: PhosphorIconsRaw.MapPin,
};

export type PhosphorIconName = keyof typeof PhosphorIcons;
