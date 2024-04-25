import { TracingBeam } from "./ui/tracing-beam";
import Title from "./Title";
import type { FC } from "react";

interface Props {
  title: string;
  tableData: string[][];
  tableHead: string[];
}

const TitleScrollableTable: FC<Props> = ({
  title,
  tableData,
  tableHead,
}: Props) => (
  <TracingBeam>
    <div
      className="relative mx-auto max-w-2xl pt-4 antialiased"
      style={{ minHeight: "calc(100vh - 30px)" }}
    >
      <Title>{title}</Title>
      <div className="min-w-1/4 rounded-xl">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                {tableHead.map((text, index) => (
                  <th className="text-primary" key={index}>
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((rowData, index) => (
                <tr key={index}>
                  {rowData.map((text, index) => (
                    <td key={index}>{text}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </TracingBeam>
);

export default TitleScrollableTable;
