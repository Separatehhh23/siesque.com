import { createElement } from "react";
import { TracingBeam } from "./ui/tracing-beam";
import Title from "./Title";
import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

interface Opts {
  specialText?: string;
  specialTextClassName?: string;
}

type RowData = string[] | [string[], Opts];

interface Props {
  title: string;
  tableData: RowData[];
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
}: Props) => {
  /* Deprecated
  const htmlTags = ["<i>"];

  const removeTags = (str: string) => str.replace("<", "").replace(">", "");


  function parseDictionaryKeyWithTag(str: string): ReactNode {
    let found = false;
    let foundIndex = -2;
    let timesFound = 0;

    htmlTags.forEach((tag, index) => {
      if (str.includes(tag)) {
        found = true;
        foundIndex = index;
        timesFound++;
      }
    });
    if (timesFound > 1) throw new Error("Multiple tags found");

    if (!found) return str;

    const foundTag = htmlTags[foundIndex];

    const children = str
      .split(foundTag)[1]
      .replace(foundTag.replace("<", "</"), "");

    const restOfString = htmlTags
      .map((tag) => str.replace(tag, ""))
      .toString()
      .split(children);

    return (
      <>
        {restOfString[0]}
        {createElement(removeTags(foundTag), null, children)}
        {restOfString[2]}
      </>
    );
  }

  function parseDictionaryOpts(rowData: RowData) {
    let type = 0;

    if (rowData.length > 1) {
      const condition = rowData[1];
      if (
        rowData.length > 1 &&
        typeof condition === "object" &&
        !Array.isArray(condition) &&
        condition !== null
      ) {
        type = 2;
      } else {
        type = 1;
      }
    } else {
      type = 1;
    }

    let foundTag = false;
    if (type === 1) {
      (rowData as string[][]).forEach((row) => {
        row.forEach((str) => {
          htmlTags.forEach((tag) => {
            if (str.includes(tag)) {
              foundTag = true;
            }
          });
        });
      });
    }

    let Result: ReactNode;
    if (foundTag) {
      Result = (rowData as string[][]).map((row) =>
        row.map((str) => parseDictionaryKeyWithTag(str)),
      );
    }

    if (type === 2) {

    }

  }
  */

  function parseCell(
    rowData: RowData,
    index: number /* Current row */,
    tableData: RowData[],
  ) {
    rowData.map((cell) => {
      let processedCell;
      if (Array.isArray(cell)) {
        let component: ReactNode[];

        const [cellData, opts] = rowData as [string[], Opts];

        cellData.forEach((subCell) => {
          if (subCell.includes("$special")) {
            const splittedSubCell = subCell.split("$special");

            component.concat(splittedSubCell[0]);
            component.concat(
              <span className={opts.specialTextClassName}>
                {opts.specialText}
              </span>,
            );
            component.concat(splittedSubCell[1]);
          }
        });
      } else {
        processedCell = cell;
      }
    });
  }

  return (
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
                        {}
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
};

export default TitleScrollableTable;
