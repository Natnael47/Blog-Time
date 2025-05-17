import { BlogPostCard } from "@/component/general/BlogPostCard";
import { Suspense } from "react";
import { BlogPostCardSkeleton } from "./BlogPostCardSkeleton";
import { prisma } from "./utils/db";

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
  });
  return data;
}

export default function Home() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Post</h1>
      <Suspense fallback={<BlogPostSkeletonGrid />}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}

type BlogPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  updatedAt: Date;
};

async function BlogPosts() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item: BlogPost) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}

function BlogPostSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <BlogPostCardSkeleton key={idx} />
      ))}
    </div>
  );
}
