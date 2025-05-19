// EditPost.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

import { handleDeleteSubmission, handleUpdateSubmission } from "@/app/action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";

export default function EditPost({ data }: { data: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", titleRef.current?.value || "");
    formData.append("content", contentRef.current?.value || "");
    formData.append("url", urlRef.current?.value || "");

    startTransition(async () => {
      const res = await handleUpdateSubmission(formData, data.id);

      toast(res.message, {
        description: new Date().toLocaleString(),
        action: res.success
          ? undefined
          : {
              label: "Retry",
              onClick: handleSave,
            },
      });

      if (res.success) {
        //router.refresh();
        redirect("/dashboard");
      }
    });
  };

  const handleDeleteConfirmed = () => {
    startTransitionDelete(async () => {
      const res = await handleDeleteSubmission(data.id);

      toast(res.message, {
        description: new Date().toLocaleString(),
        action: res.success
          ? undefined
          : {
              label: "Retry",
              onClick: handleDeleteConfirmed,
            },
      });

      if (res.success) {
        redirect("/dashboard");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[85vh] rounded-lg border shadow"
      >
        <ResizablePanel defaultSize={30} minSize={25}>
          <div className="flex h-full items-start justify-center p-6">
            <div className="w-full max-w-sm space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border shadow-lg">
                <Image
                  src={data.imageUrl}
                  alt={data.title}
                  fill
                  className="object-fill"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl" className="block mb-1">
                  New Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={data.imageUrl}
                  ref={urlRef}
                />
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleSave}
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full"
                      variant="destructive"
                      disabled={isPendingDelete}
                    >
                      {isPendingDelete ? "Deleting..." : "Delete Post"}
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteConfirmed}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Link href="/dashboard">
                  <Button className="w-full">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70} minSize={40}>
          <div className="flex h-full items-start justify-center p-6">
            <div className="w-full space-y-4">
              <div>
                <Label htmlFor="title" className="block mb-1 text-lg">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter post title"
                  defaultValue={data.title}
                  ref={titleRef}
                />
              </div>
              <div>
                <Label htmlFor="content" className="block mb-1 text-lg">
                  Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your post content here..."
                  defaultValue={data.content}
                  rows={15}
                  ref={contentRef}
                />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
