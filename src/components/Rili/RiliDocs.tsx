import { useStore } from "@nanostores/react";
import { riliDocsAccess as $riliDocsAccess } from "@/stores";
import type { FC } from "react";

const RiliDocs: FC = () => {
  const riliDocsAccess = useStore($riliDocsAccess);

  return (
    <>
      {!riliDocsAccess.access ? (
        <>
          <RiliDocsBar />
          <div className="flex flex-row justify-center">
            <h1 className="glass inline-block bg-red-600 bg-clip-text text-9xl font-extrabold text-transparent shadow-none">
              TOP SECRET
            </h1>
          </div>
          <RiliDocsBar />
          <div className="flex flex-row justify-center pt-20">
            <div className="flex w-1/2 flex-col border-opacity-50">
              <div className="card grid h-20 place-items-center rounded-box">
                Rili Password <br />
                <input type="password" />
              </div>
              <div className="divider">OR</div>
              <div className="card grid h-20 place-items-center rounded-box">
                <a href="/rili/test" className="underline">
                  Rili test
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Docs selector</h1>
      )}
    </>
  );
};

const RiliDocsBar: FC = () => (
  <div className="w-[calc(100vw - 7.5%)] glass mb-2 mt-4 h-6 bg-red-800"></div>
);

export default RiliDocs;
