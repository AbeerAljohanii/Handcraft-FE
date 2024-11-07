import React from "react";
import { Button } from "@mui/material";
import { useTable } from "react-table";

const ArtworkTable = ({ artworks, handleOpenDialog, handleDeleteArtwork }) => {
  const columns = React.useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Description", accessor: "description" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Price", accessor: "price" },
      // Add the Category column
      {
        Header: "Category",
        accessor: "category", 
        Cell: ({ value }) => value?.name || "No Category",
      },
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
              onClick={() => handleDeleteArtwork(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: artworks,
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

export default ArtworkTable;
