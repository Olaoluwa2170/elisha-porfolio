import { Helmet } from "react-helmet-async";
import { SITE_URL, absoluteUrl } from "@/lib/blog";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: "website" | "article";
}

export function SEO({ title, description, image, url, type = "website" }: SEOProps) {
  const absoluteImage = absoluteUrl(image ?? "/og-image.png");
  const absoluteCanonical = url.startsWith("http") ? url : `${SITE_URL}${url}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteCanonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={absoluteCanonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}
