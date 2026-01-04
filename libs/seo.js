// SEO utilities (JavaScript version)
export function generateSEOTags(title, description, image, url) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : [],
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}
