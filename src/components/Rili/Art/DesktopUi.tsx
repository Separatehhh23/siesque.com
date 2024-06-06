import { ArrowRight } from "lucide-react";

type Props = {
  data: {
    title: string;
    author: string;
    tags?: string[];
    score: number;
    publishDate: string;
    image: string;
  };
};

export const DesktopUi = ({ data }: Props) => {
  const { author, image, publishDate, score, tags, title } = data;
  return (
    <div className="flex min-h-screen w-screen flex-row justify-center">
      <div className="top-24 z-20 mb-8 mt-8 flex h-[810px] w-[960px] flex-row justify-center rounded-lg bg-base-200 pb-8">
        <div>
          <div className="flex w-[480px] flex-col justify-around">
            <h1 className="pl-[30px] pt-[30px] text-primary">{title}</h1>
            <div className="flex flex-row pl-[30px]">
              <ArrowRight />
              <p className="text-secondary">{author}</p>
            </div>
            <div className="flex h-9 w-full flex-row pl-[30px]">
              {tags?.map((tag, index) => (
                <div
                  key={index}
                  className="mb-[30px] mr-2 h-full rounded-lg bg-accent px-2 py-1 text-white"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[30px] pt-6">
          <img
            src={image}
            alt={title}
            width={420}
            className="aspect-[9/16] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
