import { Image, Tags, formatDate } from "./Shared";

import type { ArtData } from "@/types";

type Props = {
  data: Array<{
    id: string;
    collection: "art";
    data: ArtData;
  }>;
};

export const Gallery = ({ data }: Props) => {
  return (
    <div className="flex w-screen flex-row justify-center">
      <div className="mb-8 mt-8 grid w-[90vw] grid-cols-5 gap-12 pb-8 pt-8 ">
        {data.map((art, index) => (
          <div
            key={index}
            className="center h-[460px] w-[262px] rounded-lg bg-base-200"
          >
            <div className="flex flex-col justify-evenly">
              <h1 className="text-xl text-primary">{art.data.title}</h1>
              <p className="text-sm text-secondary">
                {art.data.author} // {formatDate(art.data.publishDate)} //{" "}
                {art.data.score}
              </p>
              <Image
                src={art.data.image}
                alt={art.data.title}
                width={192}
                className="py-2"
              />
              <Tags tags={art.data.tags} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
