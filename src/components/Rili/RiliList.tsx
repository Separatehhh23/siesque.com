import type { RiliArray } from "@/types";

export default function RiliList({ rilis }: { rilis: RiliArray }) {
  return (
    <>
      <div className="absolute flex w-screen flex-row justify-end">
        <div className="pr-8 pt-2">
          <button className="btn btn-ghost cursor-pointer rounded-md bg-base-200">
            <p className="p-0.5 text-primary accent-accent">Change</p>
          </button>
        </div>
      </div>
      <div className="flex h-screen w-screen flex-row justify-center pt-32">
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
                {rilis.map((rili) => (
                  <tr>
                    <th className="text-secondary">{rili.id}</th>
                    <td>{rili.name}</td>
                    <td>{rili.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
