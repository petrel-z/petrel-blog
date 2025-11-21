// src/app/posts/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">我的博客文章</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allPostsData.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post.slug}`} className="text-primary hover:underline">
                {post.title}
              </Link>
            </h2>
            <time className="text-sm text-gray-500 mb-3" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}