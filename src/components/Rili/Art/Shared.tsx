import moment from "moment";

import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  className?: string;
};

export const Image = ({ src, alt, width, className }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width ?? 420}
      className={cn("aspect-[9/16] rounded-lg", className)}
    />
  );
};

type TagsProps = {
  tags?: string[];
};

export const Tags = ({ tags }: TagsProps) => (
  <div className="flex h-9 w-full flex-row ">
    {tags?.map((tag, index) => (
      <div
        key={index}
        className="mb-[30px] mr-2 h-full rounded-lg bg-accent px-2 py-1 text-white"
      >
        {tag}
      </div>
    ))}
  </div>
);

export function formatDate(date: string) {
  return moment(date).format("DD/MM/YY");
}
