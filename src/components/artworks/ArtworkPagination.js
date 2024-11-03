import React from "react";
import Pagination from "@mui/material/Pagination";

export default function ArtworkPagination({ totalCount, handleChange, page }) {
  return (
    <div>
      <Pagination count={totalCount} page={page} onChange={handleChange} />
    </div>
  );
}
