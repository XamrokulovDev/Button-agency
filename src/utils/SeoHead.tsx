import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Button Agency — маркетинговое агентство в Ташкенте | Брендинг, СММ, реклама",
  description = "Button Agency — ведущая маркетинговая компания в Ташкенте. СММ-продвижение, брендинг, разработка сайтов, таргетированная реклама и маркетинговые стратегии для бизнеса.",
  keywords = "маркетинговое агентство Ташкент, реклама в соцсетях, СММ продвижение, брендинг, таргетированная реклама, разработка сайтов, digital маркетинг",
  image = "https://buttonagency.uz/icob.png",
  url = "https://buttonagency.uz/"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Button Agency",
    "url": url,
    "logo": image,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ташкент",
      "addressCountry": "UZ"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998 98 700 80 04",
      "contactType": "customer service",
      "areaServed": "UZ",
      "availableLanguage": ["ru", "en"]
    },
    "sameAs": [
      "https://www.instagram.com/buttonagency",
      "https://www.facebook.com/buttonagency",
      "https://t.me/buttonagency"
    ],
    "keywords": keywords.split(', ')
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Button Agency" />
      <meta name="publisher" content="Button Agency" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="language" content="ru" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Button Agency" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@buttonagency" />

      {/* Favicon */}
      <link rel="icon" href="https://buttonagency.uz/icob.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="https://buttonagency.uz/icob.ico" type="image/x-icon" />
      <link rel="icon" href="https://buttonagency.uz/icob.png" type="image/png" />
      <link rel="apple-touch-icon" href="https://buttonagency.uz/icob.png" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="//buttonagency.uz" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};