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
  className?: string;
}
const TableHead = ({ children, className }: TableHeadProps) => (
  <thead className={className}>
    <tr>{children}</tr>
  </thead>
);

interface TableHeadElementProps {
  children: ReactNode;
  className?: string;
}
const TableHeadElement = ({ children, className }: TableHeadElementProps) => (
  <th className={className}>{children}</th>
);

interface TableBodyProps {
  children: Array<ReactElement<typeof TableBodyElement>>;
  className?: string;
}
const TableBody = ({ children, className }: TableBodyProps) => {
  return <tr className={className}>{children}</tr>;
};

interface TableBodyElementProps {
  children: ReactNode;
  className?: string;
}
const TableBodyElement = ({ children, className }: TableBodyElementProps) => {
  return <td className={className}>{children}</td>;
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
