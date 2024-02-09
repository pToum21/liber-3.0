import React from "react";
import { Box, Container, Grid } from "@mui/material";
import gif from '../../../public/3dModels/output-onlinegiftools.gif'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "secondary.main",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <img src={gif} alt="3d book gif" />
                    <Grid item xs={12}>
                        <h2 style={{ color: "black", fontSize: "1.5rem" }}>
                            React Starter App
                        </h2>
                    </Grid>
                    <Grid item xs={12}>
                        <p style={{ color: "textSecondary", fontSize: "1rem" }}>
                            {`${currentYear} | React | Material UI | React Router`}
                        </p>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
