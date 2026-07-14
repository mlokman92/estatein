// Typed shapes for the site_content key/value blocks (see the CMS "Page copy").

export type Stat = { value: string; label: string };

export type SectionHeading = {
  title: string;
  description: string;
  actionLabel?: string;
};

export type HomeHero = {
  heading: string;
  subheading: string;
  primaryButtonLabel: string;
  primaryButtonHref: string | null;
  secondaryButtonLabel: string;
  secondaryButtonHref: string | null;
  badgeText: string;
  heroImage: string;
  heroImageAlt: string;
  stats: Stat[];
};

export type HomeSectionHeadings = {
  featuredProperties: SectionHeading;
  testimonials: SectionHeading;
  faq: SectionHeading;
};

export type AboutHero = {
  heading: string;
  paragraph: string;
  image: string;
  imageAlt: string;
  stats: Stat[];
};

export type AboutSectionHeadings = {
  values: SectionHeading;
  achievements: SectionHeading;
  team: SectionHeading;
  clients: SectionHeading;
  navigating: SectionHeading;
};

export type SimpleHero = { heading: string; paragraph: string };

export type ContactSectionHeadings = {
  form: SectionHeading;
  gallery: SectionHeading;
  offices: SectionHeading;
};

export type CtaContent = {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string | null;
};

export type BannerContent = {
  text: string;
  ctaLabel: string;
  ctaHref: string | null;
  enabled: boolean;
};

export type FooterContent = {
  copyright: string;
  legalLinks: { label: string; href: string | null }[];
  newsletterHeading: string | null;
  newsletterPlaceholder: string;
};

export type InvestmentBlockContent = {
  heading: string;
  intro: string;
  ctaHeading: string;
  ctaParagraph: string;
  ctaButtonLabel: string;
  ctaButtonHref: string | null;
};

export type ServicesSeo = { title: string; description: string };
