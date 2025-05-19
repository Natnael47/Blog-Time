import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";
import EditPost from "./EditPost";

async function getData(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const { id } = await params;

  const data = await getData(id);

  return <EditPost data={data} />;
}
