import { NextRequest, NextResponse } from 'next/server';

interface OptimizeRequest {
  businessName: string;
  businessType: string;
  description: string;
  keywords: string;
  language?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { businessName, businessType, description, keywords, language = 'en' }: OptimizeRequest = await request.json();

    if (!businessName || !businessType || !description) {
      return NextResponse.json(
        { error: 'Business name, type, and description are required' },
        { status: 400 }
      );
    }

    // Generate Schema.org type based on business type
    const schemaTypes: Record<string, string> = {
      restaurant: 'Restaurant',
      accounting: 'AccountingService',
      consulting: 'ProfessionalService',
      retail: 'Store',
      services: 'LocalBusiness',
    };

    const schemaType = schemaTypes[businessType] || 'LocalBusiness';

    // Generate optimized HTML with AI-friendly markup
    const optimizedCode = `<!DOCTYPE html>
<html lang="${language === 'he' ? 'he' : 'en'}" ${language === 'he' ? 'dir="rtl"' : ''}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - ${description.slice(0, 60)}</title>

  <!-- AI-Optimized Meta Tags -->
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="googlebot" content="index, follow">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${businessName}">
  <meta property="og:description" content="${description}">
  <meta property="og:locale" content="${language === 'he' ? 'he_IL' : 'en_US'}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${businessName}">
  <meta name="twitter:description" content="${description}">

  <!-- Schema.org Structured Data for AI -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${schemaType}",
    "name": "${businessName}",
    "description": "${description}",
    "url": "https://yourwebsite.com",
    ${businessType === 'restaurant' ? `"servesCuisine": "${keywords.split(',')[0].trim()}",` : ''}
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IL"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    }
  }
  </script>

  <!-- FAQ Schema for AI Assistants -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does ${businessName} offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${description}"
        }
      },
      {
        "@type": "Question",
        "name": "Where is ${businessName} located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${businessName} is located in Israel and provides ${businessType} services."
        }
      }
    ]
  }
  </script>

  <!-- Breadcrumb Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yourwebsite.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "${businessName}",
        "item": "https://yourwebsite.com/${businessName.toLowerCase().replace(/\\s+/g, '-')}"
      }
    ]
  }
  </script>
</head>
<body>
  <main>
    <h1>${businessName}</h1>
    <p>${description}</p>

    <section>
      <h2>About ${businessName}</h2>
      <p>We specialize in ${keywords.split(',').slice(0, 3).join(', ')}.</p>
    </section>

    <!-- AI-friendly contact information -->
    <section itemscope itemtype="https://schema.org/ContactPoint">
      <h2>Contact Us</h2>
      <p itemprop="contactType">Customer Service</p>
      <p>Email: <span itemprop="email">contact@${businessName.toLowerCase().replace(/\\s+/g, '')}.com</span></p>
    </section>
  </main>
</body>
</html>`;

    return NextResponse.json({
      code: optimizedCode,
      metadata: {
        schemaType,
        keywordsCount: keywords.split(',').length,
        descriptionLength: description.length,
        aiOptimized: true,
      }
    });

  } catch (error) {
    console.error('Optimize error:', error);
    return NextResponse.json(
      { error: 'Failed to generate optimized code' },
      { status: 500 }
    );
  }
}
