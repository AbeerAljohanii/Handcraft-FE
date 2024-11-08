import React from "react";
import { Button } from "@mui/material";
import { useTable } from "react-table";

const OrderTable = ({ orders, handleOpenDialog, handleDeleteItem }) => {
  const columns = React.useMemo(
    () => [
      { Header: "Customer Name", accessor: "user.name" },
      { Header: "Phone Number", accessor: "user.phoneNumber" },
      { Header: "Email", accessor: "user.email" },
      { Header: "Total Amount", accessor: "totalAmount" },
      { Header: "Shipping Address", accessor: "shippingAddress" },
      { Header: "Created At", accessor: "createdAt" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <Button
              size="small"
              color="primary"
              onClick={() => handleOpenDialog(row.original)}
            >
              Update
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => handleDeleteItem("orders", row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [handleOpenDialog, handleDeleteItem]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: orders,
    });

  return (
    <table
      {...getTableProps()}
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.id || headerGroup.headers[0].id}
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id || rowIndex}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                  key={cell.column.id}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
