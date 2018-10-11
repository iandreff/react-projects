import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = props => {
  //Interface!!!
  const { sortColumn, onSort, columns, data } = props;

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;

// use just props as argument and destructuring
//we can replace destructuring arguments and replace (props) and use ({sortColumn, onSort, //columns, data}) as an argument.

/* const Table = ({ sortColumn, onSort, columns, data }) => {
  //Interface!!!
  const  = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}; */
