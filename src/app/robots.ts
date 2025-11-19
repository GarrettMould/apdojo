import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://apdojo.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/purchase/',
          '/success/',
          '/cancel/',
          '/tutoring/',
          '/availability/',
          '/feedback/',
          '/block/',
          '/board/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}



