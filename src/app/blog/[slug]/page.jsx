import blogData from '../blog.json';        // adjust if blog.json is elsewhere
import BlogPostPage from '../Blogpostpage';

export async function generateStaticParams() {
  return blogData.posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogData.posts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      images: [{ url: post.seo.ogImage }],
      type: 'article',
    },
    alternates: { canonical: post.seo.canonical },
  };
}

export default function Page({ params }) {
  return <BlogPostPage params={params} />;
}