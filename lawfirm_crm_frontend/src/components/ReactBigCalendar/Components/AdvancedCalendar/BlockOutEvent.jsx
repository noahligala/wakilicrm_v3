import React from "react";
import { Box, Typography } from "@mui/material";
import { Blockout } from "./CustomCalendar.types";

export default function BlockoutEvent({ blockout }) {
  return (
    <Box
      sx={{
        backgroundColor: "lightgray",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ color: "gray", fontWeight: "bold", fontSize: "body2.fontSize", textAlign: "center" }}>
        {blockout.name}
      </Typography>
    </Box>
  );
}
