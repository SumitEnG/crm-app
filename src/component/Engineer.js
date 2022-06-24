import { Box } from "@mui/material";
import React from "react";
import Cards from "../tools/admin/cards";
import Sidebar from "../tools/admin/Sidebar";

function Engineer() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </Box>
    </Box>
  );
}

export default Engineer;
