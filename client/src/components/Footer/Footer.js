import { AppBar, Container, Toolbar, Typography, Box, Link, Grid, Button } from "@material-ui/core"
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import RoomIcon from '@material-ui/icons/Room';

import stylesFooter from "./styles";

export default function Footer() {
    return (
        <>
            <Box style={stylesFooter.mainBoxContainer}>
                <Container maxWidth="lg">
                    <Grid container xs={12} spacing={5}>
                        <Grid item xs={6} style={stylesFooter.firstGrid}>
                            <Box>
                                <Typography variant="body1" style={stylesFooter.firstGridLabel}>
                                    Easy Road.
                                </Typography>
                            </Box>
                            <Box sx={stylesFooter.firstGridShareIconsBox}>
                                <FacebookIcon />
                                <LinkedInIcon />
                                <TwitterIcon />
                                <InstagramIcon />
                            </Box>
                            <Box>
                                <Typography variant="body1" style={stylesFooter.firstGridCopyright}>
                                    © 2021 Easy Road
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs style={stylesFooter.secondGrid}>
                            <Box style={stylesFooter.secondGridLabel}>Menu</Box>
                            <Box sx={stylesFooter.secondGridMenuItems}>
                                <Box>
                                    <Link href="/Home">Home</Link>
                                </Box>
                                <Box>
                                    <Link href="#">About</Link>
                                </Box>
                                <Box>
                                    <Link href="#">Blog</Link>
                                </Box>
                                <Box>
                                    <Link href="#">Portfolio</Link>
                                </Box>
                            </Box>

                            <Box style={stylesFooter.secondGridDevLabel}>
                                Developer
                            </Box>
                            <Box sx={stylesFooter.secondGridDevInfo}>
                                <Link href='https://github.com/MikeSivak'>
                                    <Box><GitHubIcon /></Box>
                                    <Box>MikeSivak</Box>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs style={stylesFooter.thirdGrid}>
                            <Box style={stylesFooter.thirdGridLabel}>Address</Box>
                            <Box sx={stylesFooter.thirdGridLocation}>
                                <Link href="#">
                                    <Box>
                                        <RoomIcon />
                                    </Box>
                                    <Box>
                                        605, RATAN ICON BUILDING
                                        SEAWOODS SECTOR
                                    </Box>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box >
        </>
    )
}