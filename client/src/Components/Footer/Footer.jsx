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
        <Grid  alignItems="center" style={{display: 'flex', justifyContent: 'space-between'}}>
          <Grid item xs={12} sm={6} >

            <img src={logo} alt="elegant book logo" style={{ width: "20vw", height: "auto" }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="column"
              alignItems="center"
              // justifyContent="center"
              style={{ height: "100%" }}
            >
              <Grid item xs={12}>
                <span style={{ fontSize: '2rem', fontFamily: 'Coventry Garden', whiteSpace: 'nowrap' }}>{'{'} L i b e r {'}'}</span>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <p style={{ color: "textSecondary", fontSize: "1.1rem", margin: 0 }}>
                  Copyright © {currentYear}
                </p>
                </div>
                
                <div>
                  <p style={{ color: "textSecondary", fontSize: "1.3rem", margin: 0 }}> Ryan | Peyton | Sal | Pasha</p>
                </div>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
