"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");

  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: url as string,
      authorId: user?.id as string,
      authorImage: user?.picture as string,
      authorName: user?.given_name as string,
    },
  });
  return redirect("/dashboard");
}

export async function handleUpdateSubmission(formData: FormData, id: string) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const url = formData.get("url") as string;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, message: "Post not found." };
    }

    const updateData: {
      title?: string;
      content?: string;
      imageUrl?: string;
    } = {};

    if (title && title !== existing.title) updateData.title = title;
    if (content && content !== existing.content) updateData.content = content;
    if (url && url !== existing.imageUrl) updateData.imageUrl = url;

    if (Object.keys(updateData).length === 0) {
      return { success: false, message: "No changes made." };
    }

    await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return { success: true, message: "Post updated successfully!" };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}

export async function handleDeleteSubmission(id: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return redirect("/api/auth/register");
    }

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, message: "Post not found." };
    }

    // Optional: you can check if user is author before allowing delete
    if (existing.authorId !== user.id) {
      return { success: false, message: "Unauthorized to delete this post." };
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return { success: true, message: "Post deleted successfully!" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Something went wrong during deletion." };
  }
}
