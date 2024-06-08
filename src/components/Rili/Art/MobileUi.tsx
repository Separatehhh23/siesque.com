import { ArrowRight } from "lucide-react";
import CountUp from "react-countup";

import { Image, Tags } from "./Shared";
import { formatDate } from "@/lib/utils";

import type { ReactNode } from "react";
import type { ArtData } from "@/types";

type Props = {
  data: ArtData;
};

export const MobileUi = ({ data }: Props) => {
  const { author, image, publishDate, score, tags, title } = data;
  return (
    <div className="min-h-screen w-screen">
      <div className="flex flex-row justify-center">
        <div className="top-24 z-20 mb-8 mt-8 flex min-h-[700px] w-[480px] flex-col justify-around rounded-lg bg-base-200 pb-8">
          <h1 className="pl-[30px] pt-[30px] text-primary">{title}</h1>
          <Description>{author}</Description>
          <Description>{formatDate(publishDate)}</Description>
          <Description>
            <CountUp end={score} />
          </Description>

          <Tags tags={tags} />

          <div className="px-[30px] pt-6">
            <Image src={image} alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

type DescriptionProps = {
  children: ReactNode;
};

const Description = ({ children }: DescriptionProps) => (
  <div className="flex flex-row pl-[30px]">
    <ArrowRight />
    <p className="text-secondary">{children}</p>
  </div>
);
