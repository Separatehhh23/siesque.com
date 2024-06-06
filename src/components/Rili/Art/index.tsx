import { lazy, Suspense } from "react";

import { useScreenDetector } from "@/hooks/useScreenDetector";

const MobileUi = lazy(() =>
  import("./MobileUi").then((d) => ({ default: d.MobileUi })),
);

const DesktopUi = lazy(() =>
  import("./DesktopUi").then((d) => ({ default: d.DesktopUi })),
);

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

export const RiliArt = ({ data }: Props) => {
  const { isMobile } = useScreenDetector();

  return (
    <>
      {isMobile ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MobileUi data={data} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <DesktopUi data={data} />
        </Suspense>
      )}
    </>
  );
};
