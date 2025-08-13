import { Helmet } from "react-helmet-async";

type Language = "uz" | "en" | "ru";

type HelmetContent = {
  baseTitle: string;
  description: string;
};

const helmetData: Record<Language, HelmetContent> = {
  uz: {
    baseTitle: "Button Agency — маркетинговое агентство в Ташкенте | Брендинг, СММ, реклама",
    description: "Button Agency — ведущая маркетинговая компания в Ташкенте. СММ-продвижение, брендинг, разработка сайтов, таргетированная реклама и маркетинговые стратегии для бизнеса.",
  },
  en: {
    baseTitle: "Button Agency — marketing agency in Tashkent | Branding, SMM, Advertising",
    description: "Button Agency is a leading marketing company in Tashkent. SMM promotion, branding, website development, targeted advertising, and marketing strategies for businesses.",
  },
  ru: {
    baseTitle: "Button Agency — маркетинговое агентство в Ташкенте | Брендинг, СММ, реклама",
    description: "Button Agency — ведущая маркетинговая компания в Ташкенте. СММ-продвижение, брендинг, разработка сайтов, таргетированная реклама и маркетинговые стратегии для бизнеса.",
  },
};

interface HelmetPageProps {
  lang: Language;
  pageTitle?: string;
}

export default function HelmetPage({ lang, pageTitle }: HelmetPageProps) {
  const content = helmetData[lang];
  const fullTitle = pageTitle
    ? `${content.baseTitle} - ${pageTitle}`
    : content.baseTitle;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={content.description} />
    </Helmet>
  );
}