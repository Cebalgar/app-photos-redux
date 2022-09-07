import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} position="static">
        <AppBar
          position="static"
          sx={{ backgroundColor: "rgb(184,184,183)", marginBottom: "20px" }}
        >
          <Toolbar
            sx={{
              flexWrap: "wrap",
              justifyContent: { xs: "space-between", sm: "space-between" },
            }}
          >
            <Typography>
              <Button
                component={NavLink}
                to="/"
                sx={{
                  fontSize: {
                    xs: "15px",
                    sm: "15px",
                    md: "18px",
                    lg: "18px",
                  },
                  color: "white",
                  fontWeight: "900",
                  marginLeft: "20px",
                }}
              >
                PHOTOS
              </Button>
              <Button
                component={NavLink}
                to="/favourites"
                sx={{
                  fontSize: {
                    xs: "15px",
                    sm: "15px",
                    md: "18px",
                    lg: "18px",
                  },
                  color: "white",
                  marginLeft: "20px",
                  fontWeight: 900,
                }}
              >
                FAVOURITES
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
