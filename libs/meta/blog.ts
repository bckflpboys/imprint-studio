// import type { Metadata } from 'next';
// import type { BlogPost } from '@/components/blog/BlogCard';

// export function generateBlogMetadata(post: BlogPost): Metadata {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       type: 'article',
//       publishedTime: post.createdAt,
//       authors: [post.author],
//       images: [
//         {
//           url: post.coverImage,
//           width: 1200,
//           height: 630,
//           alt: post.title
//         }
//       ]
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description: post.excerpt,
//       images: [post.coverImage]
//     }
//   };
// }