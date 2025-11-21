// src/app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/posts" className="text-primary hover:underline mb-8 inline-block">
        ← 返回文章列表
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
        <time className="text-lg text-gray-500" dateTime={post.frontmatter.date}>
          {new Date(post.frontmatter.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.frontmatter.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-lg max-w-none">
        <MDXRemote code={post.code} />
      </div>
    </article>
  );
}