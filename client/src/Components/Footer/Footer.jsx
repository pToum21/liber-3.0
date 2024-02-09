import React from "react";
import { Box, Container, Grid } from "@mui/material";
import gif from "../../../public/3dModels/output-onlinegiftools.gif";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6}>
            
            <img src={gif} alt="3d book gif" style={{ width: "18%", height: "auto" }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center" 
              style={{ height: "100%" }}
            >
              <Grid item xs={12}>
                <h2 id="liber" style={{ color: "black", fontSize: "2rem" }}>Liber</h2>
              </Grid>
              <Grid item xs={12}>
                <p style={{ color: "textSecondary", fontSize: "1.2rem", margin: 0 }}>
                  {`${currentYear} | Ryan | Peyton | Sal | Pasha`}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
