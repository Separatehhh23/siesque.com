import CountUp from "react-countup";

import { Image, Tags } from "./Shared";
import { formatDate } from "@/lib/utils";

import type { ReactNode } from "react";
import type { ArtData } from "@/types";

type Props = {
  data: ArtData;
};

export const DesktopUi = ({ data }: Props) => {
  const { author, image, publishDate, score, tags, title } = data;
  return (
    <div className="flex min-h-screen w-screen flex-row justify-center">
      <div className="top-24 z-20 mb-8 mt-8 flex h-[810px] w-[960px] flex-row justify-center rounded-lg bg-base-200 pb-8">
        <div>
          <div className="flex w-[480px] flex-col justify-around">
            <div className="pl-[30px]">
              <h1 className=" pt-[30px] text-7xl text-primary">{title}</h1>

              <Tags tags={tags} />

              <Description>Author: {author}</Description>
              <Description>Date: {formatDate(publishDate)}</Description>
              <Description>
                Score: <CountUp end={score} duration={5} />
              </Description>
            </div>
          </div>
        </div>
        <div className="px-[30px] pt-6">
          <Image src={image} alt={title} />
        </div>
      </div>
    </div>
  );
};

type DescriptionProps = {
  children: ReactNode;
};

const Description = ({ children }: DescriptionProps) => (
  <p className="text-lg text-secondary">{children}</p>
);
