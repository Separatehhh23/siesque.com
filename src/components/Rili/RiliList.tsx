import type { RiliArray, RiliObject } from "@/types";
import { TracingBeam } from "../ui/tracing-beam";

interface Props {
  rilis: RiliArray;
}

export default function RiliList(props: Props) {
  const rilis = props.rilis;

  rilis.sort((r1, r2) =>
    r1.amount < r2.amount ? 1 : r1.amount > r2.amount ? -1 : 0,
  );

  return (
    <>
      <div className="absolute z-20 flex w-screen flex-row justify-end">
        <div className="pr-8 pt-2">
          <button className="btn btn-ghost cursor-pointer rounded-md bg-base-200">
            <p className="p-0.5 text-primary accent-accent">Change</p>
          </button>
        </div>
      </div>
      <TracingBeam>
        {/*<div className="flex h-screen w-screen flex-row justify-center pt-32">*/}
        <div className="relative mx-auto max-w-2xl pt-4 antialiased">
          <div className="min-w-1/4 rounded-xl">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-primary">Rank</th>
                    <th className="text-primary">Name</th>
                    <th className="text-primary">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {rilis.map((rili, index) => (
                    <tr key={index}>
                      <th className="text-secondary">{index + 1}</th>
                      <td>{rili.name}</td>
                      <td>{rili.amount}</td>
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
}
