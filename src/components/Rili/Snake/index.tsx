import { Stage, Sprite, Container } from "@pixi/react";
import { ErrorBoundary } from "react-error-boundary";
import TileGrid from "./TileGrid";
import type { FC, ReactNode } from "react";

const CastorSnake: FC = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <ErrorBoundary
        fallback={<p className="text-error">Error loading castake</p>}
      >
        <div className="flex h-[70px] flex-row justify-evenly bg-[#4a752d]">
          <CenteredImage
            href="https://www.google.com/logos/fnbx/snake_arcade/v17/apple_00.png"
            alt="Apple"
            number={0}
          />
          <CenteredImage
            href="https://www.google.com/logos/fnbx/snake_arcade/v18/trophy_00.png"
            alt="Trophy"
            number={0}
          />
        </div>
        <div className="h-[460px] w-[460px] bg-[#568a35]">
          <Stage
            width={400}
            height={400}
            className="left-0 top-0 translate-x-[30px] translate-y-[30px] transform"
          >
            {/* Beaver icon created by Freepik - Flaticon || https://www.flaticon.com/free-icons/beaver */}
            <Sprite
              x={200}
              y={200}
              image="../beaver.png"
              width={38}
              height={38}
            />

            <TileGrid
              tileSize={50}
              cols={16}
              rows={16}
              colors={[0xa9d751, 0xa2d049]}
            />
          </Stage>
        </div>
      </ErrorBoundary>
    </div>
  );
};

interface CenteredImageProps {
  href: string;
  alt: string;
  number?: number;
}

const CenteredImage: FC<CenteredImageProps> = ({ href, alt, number }) => (
  <div className="flex flex-col justify-center justify-self-start">
    <div className="flex flex-row">
      <img src={href} alt={alt} className="relative h-[38px] w-[38px]" />
      <p className="pt-2 text-xl text-white">{number}</p>
    </div>
  </div>
);

export default CastorSnake;
