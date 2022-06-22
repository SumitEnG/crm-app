import { Box } from "@mui/system";
import React from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import "../../styles/Cards.css";
import {
  Card,
  CircularProgress,
  Divider,
  Typography,
  alpha,
} from "@mui/material";

function Cards({ cardData }) {
  return (
    <Card
      className="container"
      sx={{
        color: `${cardData.color}.main`,
        border: "solid 1px",
        width: "10%",
        padding: "0 1%",
        borderRadius: "5px",
        borderBottom: "solid 3px",
        borderColor: `${cardData.color}.main`,
        backgroundColor: (theme) =>
          alpha(theme.palette[cardData.color].main, 0.1),
      }}
    >
      <Box className="header">
        {cardData.title == "Open" && <DriveFileRenameOutlineIcon />}
        {cardData.title == "Progress" && <BoltIcon />}
        {cardData.title == "Closed" && <CheckCircleOutlineIcon />}
        {cardData.title == "Blocked" && <BlockIcon />}
        <Box>{cardData.title}</Box>
      </Box>
      <Divider />
      <Box className="progress-container">
        <Typography variant="h3">{cardData.number.count}</Typography>
        <CircularProgress
          variant="determinate"
          value={cardData.value.percentage}
          sx={{ color: `${cardData.color}.main` }}
        />
      </Box>
    </Card>
  );
}

export default Cards;
