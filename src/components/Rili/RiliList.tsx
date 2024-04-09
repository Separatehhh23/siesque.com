import React, { useEffect, useState, useRef } from "react";
import { TracingBeam } from "../ui/tracing-beam";
import type {
  FC,
  FormEvent,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import type { RiliArray, RiliObject } from "@/types";
import Title from "../Title";

interface Props {
  rilis: RiliArray;
}

const RiliList: FC<Props> = ({ rilis }: Props) => {
  const [isPlus, setIsPlus] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [password, setPassword] = useState("");
  const [newRilis, setNewRilis]: [
    RiliArray,
    Dispatch<SetStateAction<RiliArray>>,
  ] = useState(
    rilis.map((rili, index) => {
      return { id: rili.id, name: rili.name, amount: 0 };
    }),
  );

  const modalRef: MutableRefObject<HTMLDialogElement | null> = useRef(null);

  const sortedRilis = rilis.toSorted((r1, r2) =>
    r1.amount < r2.amount ? 1 : r1.amount > r2.amount ? -1 : 0,
  );

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "+") setIsPlus(true);
    });
  }, []);

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    modalRef.current?.close();

    const res = await fetch("/api/authorizeMod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });

    if (res.status === 200) {
      setIsMod(true);
    }

    setIsMenuOpen(false);
  };

  const handleMod = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/modifyRilis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rilis: newRilis }),
    });

    setIsMod(false);
  };

  return (
    <>
      {/* Pop-up */}
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Password</h3>
          <form onSubmit={(e) => handlePasswordSubmit(e)}>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="text-text join-item grow"
                placeholder="un-castor-rili"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="flex flex-row justify-end pt-2">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="absolute z-20 flex h-screen w-screen flex-row justify-end">
        <div className="flex flex-col pr-8 pt-2">
          {/* Edit button */}
          <button
            className="btn btn-ghost cursor-pointer rounded-md bg-base-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <p className="p-0.5 text-primary accent-accent">Change</p>
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div className="join join-vertical pt-2">
              <button
                className="btn join-item text-sky-600"
                onClick={() => modalRef.current?.showModal()}
              >
                Alpha
              </button>
              <button
                className="btn join-item text-blue-600"
                onClick={() => modalRef.current?.showModal()}
              >
                Beta
              </button>
              <button
                className="btn join-item text-indigo-600"
                onClick={() => modalRef.current?.showModal()}
              >
                Omega
              </button>
            </div>
          )}

          {/* Submit button */}
          {isMod && (
            <form onSubmit={(e) => handleMod(e)}>
              <button className="btn btn-outline btn-primary">Primary</button>
            </form>
          )}
        </div>
      </div>

      {/* Main list */}
      <TracingBeam>
        <div
          className="relative mx-auto max-w-2xl pt-4 antialiased"
          style={{ minHeight: "calc(100vh - 30px)" }}
        >
          <Title className="pb-4">{`Lista Rili${isPlus ? "+" : ""}`}</Title>
          <div className="min-w-1/4 rounded-xl">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-primary">Rank</th>
                    <th className="text-primary">Name</th>
                    <th className="text-primary">RiliScore</th>
                    {isMod && <th className="text-accent">New Amount</th>}
                  </tr>
                </thead>
                <tbody>
                  {sortedRilis.map((rili, index) => (
                    <tr key={rili.id}>
                      <th className="text-secondary">{index + 1}</th>
                      <td>{rili.name}</td>
                      <td>{rili.amount}</td>
                      {isMod && (
                        <td>
                          <input
                            type="number"
                            placeholder="RiliScore"
                            className="input input-bordered input-primary w-full max-w-xs"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TracingBeam>
    </>
  );
};

export default RiliList;
