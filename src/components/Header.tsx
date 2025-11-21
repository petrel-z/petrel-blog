// src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
            B
          </div>
          <span className="text-xl font-bold">我的博客</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-primary">首页</Link>
          <Link href="/posts" className="text-gray-700 hover:text-primary">文章</Link>
          <Link href="/tags" className="text-gray-700 hover:text-primary">标签</Link>
          <Link href="/about" className="text-gray-700 hover:text-primary">关于</Link>
        </nav>
      </div>
    </header>
  );
}