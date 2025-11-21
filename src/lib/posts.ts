// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { codeImport } from 'mdx-bundler/plugins';
import shiki from 'shiki';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // 获取 posts 目录下的所有文件名
  const fileNames = fs.readdirSync(postsDirectory);
  console.log('fileName', fileNames)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // 移除文件名的 ".md" 后缀，作为 id
      const id = fileName.replace(/\.md$/, '');

      // 读取 markdown 文件内容
      const fullPath = path.join(postsDirectory, fileName);
      console.log('fullPath', fullPath)
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 使用 gray-matter 解析 frontmatter
      const matterResult = matter(fileContents);

      // 组合数据
      return {
        id,
        slug: id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString(),
        excerpt: matterResult.data.excerpt || '',
        tags: matterResult.data.tags || [],
      };
    });

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const highlighter = await shiki.getHighlighter({
    theme: 'github-dark',
  });

  const { code, frontmatter } = await bundleMDX({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [shiki.rehypePlugin, { highlighter }],
      ];
      return options;
    },
  });

  return {
    code,
    frontmatter: {
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString(),
      excerpt: frontmatter.excerpt || '',
      tags: frontmatter.tags || [],
      ...frontmatter,
    },
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }));
}