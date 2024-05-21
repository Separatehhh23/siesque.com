import { TracingBeam } from "./ui/tracing-beam";
import Title from "./Title";
import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

interface Props {
  title: string;
  tableData: string[][];
  tableHead: string[];
  hasPrimaryKey?: boolean;
  children?: ReactNode;
}

const TitleScrollableTable: FC<Props> = ({
  title,
  tableData,
  tableHead,
  hasPrimaryKey = false,
  children,
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
                    <td
                      key={index}
                      className={cn(hasPrimaryKey && "text-secondary")}
                    >
                      {text}
                    </td>
                  ))}
                  {children}
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
