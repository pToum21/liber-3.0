import React from "react";
import { Box, Container, Grid } from "@mui/material";
import logo from "../../assets/footerlogo.png";

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
            
            <img src={logo} alt="3d book gif" style={{ width: "20vw", height: "auto" }} />
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
              <span style={{ fontSize: '2rem', fontFamily: 'Coventry Garden', whiteSpace: 'nowrap' }}>{'{'} L i b e r {'}'}</span>
              </Grid>
              <Grid item xs={12}>
                <p style={{ color: "textSecondary", fontSize: "1.2rem", margin: 0 }}>
                  {`Copyright © ${currentYear} | Ryan | Peyton | Sal | Pasha`}
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
