import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import TableRow from "./TableRow";

export default function PlannerTable({ data, update }) {
  const [attractions, setAttractions] = useState(data);
  const tableHead = ["Name", "Category", "Location", "Delete"];

  return (
    <>
      <Table className="w-75 mx-auto my-5">
        <thead>
          <tr>
            {tableHead.map((title) => {
              return <th key={title}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {attractions.map((data) => {
            return <TableRow key={data.id} data={data} update={update} />;
          })}
        </tbody>
      </Table>
    </>
  );
}
