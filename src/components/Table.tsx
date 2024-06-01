import { cn } from "@/lib/utils";

import type { ReactNode, ReactElement, CSSProperties } from "react";

interface TableProps {
  children: [
    ReactElement<typeof TableHead>,
    Array<ReactElement<typeof TableBody>> | ReactElement<typeof TableBody>,
  ];
  className?: string;
  style?: CSSProperties;
}
const TableRoot = ({ children, className, style }: TableProps) => {
  return (
    <table className={cn("table", className)} style={style}>
      {children[0]}
      <tbody>{children[1]}</tbody>
    </table>
  );
};

interface TableHeadProps {
  children: Array<ReactElement<typeof TableHeadElement>>;
}
const TableHead = ({ children }: TableHeadProps) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

interface TableHeadElementProps {
  children: ReactNode;
}
const TableHeadElement = ({ children }: TableHeadElementProps) => (
  <th>{children}</th>
);

interface TableBodyProps {
  children: Array<ReactElement<typeof TableBodyElement>>;
}
const TableBody = ({ children }: TableBodyProps) => {
  return <tr>{children}</tr>;
};

interface TableBodyElementProps {
  children: ReactNode;
}
const TableBodyElement = ({ children }: TableBodyElementProps) => {
  return <td>{children}</td>;
};

export const Table = TableRoot as typeof TableRoot & {
  Head: typeof TableHead;
  HeadItem: typeof TableHeadElement;
  Body: typeof TableBody;
  BodyItem: typeof TableBodyElement;
};
Table.Head = TableHead;
Table.HeadItem = TableHeadElement;
Table.Body = TableBody;
Table.BodyItem = TableBodyElement;
