import { prisma } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await prisma.blogPost.findUnique({
    where: { id },
  });
  if (!data) return notFound();
  return data;
}

type Params = Promise<{ id: string }>;

export default async function EditPost({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getData(id);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[85vh] rounded-lg border shadow"
      >
        {/* Left Panel - Image and Actions */}
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
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer">
                  Save Changes
                </Button>
                <Button className="w-full cursor-pointer" variant="destructive">
                  Delete Post
                </Button>
                <Link href={"/dashboard"}>
                  <Button className="w-full cursor-pointer">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Title and Content */}
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
                  className="w-full"
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
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
