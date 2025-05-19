import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IappProps {
  data: {
    title: string;
    id: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function BlogPostCardEdit({ data }: IappProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/dashboard/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="blog image"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="relative p-2 m-2">
            <Link href={`/dashboard/edit/${data.id}`}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-blue-600 rounded-lg shadow-xl">
                      <Pencil size={36} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {data.title}
          </h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {data.content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="relative size-8 overflow-hidden">
                <AvatarImage src={data.authorImage} alt={data.authorName} />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium text-gray-700">
                {data.authorName}
              </p>
            </div>
            <time className="text-xs text-gray-500">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(data.createdAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
}
