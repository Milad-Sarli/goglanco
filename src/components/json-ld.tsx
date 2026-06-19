export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": "https://goglanco.com",
    name: "Goglanco",
    image: "https://goglanco.com/og-image.svg",
    url: "https://goglanco.com",
    telephone: "+1-408-123-4567",
    email: "support@goglanco.com",
    description: "Expert rug repair, cleaning, and restoration services. Specialized in oriental rugs, Persian carpets, and all types of textile restoration.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Rug Restoration Lane",
      addressLocality: "San Jose",
      addressRegion: "CA",
      postalCode: "10001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.3192311,
      longitude: -121.9837819,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "16:00" },
    ],
    sameAs: [
      "https://facebook.com/goglanco",
      "https://instagram.com/goglanco",
      "https://twitter.com/goglanco",
      "https://youtube.com/@goglanco",
    ],
    priceRange: "$$",
    areaServed: { "@type": "City", name: "San Jose" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Rug Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rug Repair", url: "https://goglanco.com/services/repair" }},
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rug Cleaning", url: "https://goglanco.com/services/cleaning" }},
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rug Restoration", url: "https://goglanco.com/services/restoration" }},
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Color Restoration", url: "https://goglanco.com/services/color-restoration" }},
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Rugs", url: "https://goglanco.com/services/custom" }},
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
    },
    foundingDate: "1996",
    founder: { "@type": "Person", name: "Goglanco Founder" },
    keywords: "rug repair, carpet restoration, oriental rug cleaning, Persian carpet repair",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({ name, description, image, url }: { name: string; description: string; image: string; url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    image: `https://goglanco.com${image}`,
    url,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://goglanco.com",
      name: "Goglanco",
      telephone: "+1-408-123-4567",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Rug Restoration Lane",
        addressLocality: "San Jose",
        addressRegion: "CA",
        postalCode: "10001",
        addressCountry: "US",
      },
    },
    areaServed: [
      { "@type": "City", name: "San Jose" },
      { "@type": "City", name: "Sunnyvale" },
      { "@type": "City", name: "Santa Clara" },
      { "@type": "City", name: "Mountain View" },
      { "@type": "City", name: "Palo Alto" },
      { "@type": "City", name: "Milpitas" },
    ],
    serviceType: name,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: name,
      itemListElement: [{
        "@type": "Offer",
        priceCurrency: "USD",
        priceRange: "$$",
        itemOffered: {
          "@type": "Service",
          name: name,
          description: description,
        },
      }],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
