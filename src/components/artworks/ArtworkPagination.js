import React from "react";
import Pagination from "@mui/material/Pagination";

export default function ArtworkPagination({
  totalCount,
  handleChange,
  page,
  artworksPerPage,
}) {
  const totalPages = Math.ceil(totalCount / artworksPerPage);
  return (
    <div>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </div>
  );
}
