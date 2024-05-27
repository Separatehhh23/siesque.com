import type { FC, ReactNode, ReactElement } from "react";

interface TableProps {
  children: [
    ReactElement<typeof TableHead>,
    Array<ReactElement<typeof TableBody>>,
  ];
}
const Table: FC<TableProps> = ({ children }) => {
  return (
    <table className="table">
      {children[0]}
      <tbody>{children[1]}</tbody>
    </table>
  );
};

interface TableHeadProps {
  children: Array<ReactElement<typeof TableHeadElement>>;
}
const TableHead: FC<TableHeadProps> = ({ children }) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

interface TableHeadElementProps {
  children: ReactNode;
}
const TableHeadElement: FC<TableHeadElementProps> = ({ children }) => (
  <th>{children}</th>
);

interface TableBodyProps {
  children: Array<ReactElement<typeof TableBodyElement>>;
}
const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <tr>{children}</tr>;
};

interface TableBodyElementProps {
  children: ReactNode;
}
const TableBodyElement: FC<TableBodyElementProps> = ({ children }) => {
  return <td>{children}</td>;
};

export { Table, TableHead, TableHeadElement, TableBody, TableBodyElement };
