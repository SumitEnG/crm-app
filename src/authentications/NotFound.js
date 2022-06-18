import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import NotFoundAsset from "../assests/NotFoundAsset";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h2" color="error">
        Not Found
      </Typography>
      <NotFoundAsset />
      <Button variant="contained" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </Box>
  );
}

export default NotFound;
