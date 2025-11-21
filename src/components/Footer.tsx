// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} 我的博客. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with Next.js, Tailwind CSS & MDX.</p>
      </div>
    </footer>
  );
}