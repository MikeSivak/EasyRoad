import { AppBar, Container, Toolbar, Typography, Box, Link, Grid, Button } from "@material-ui/core"
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import RoomIcon from '@material-ui/icons/Room';

let stylesFooter = {
    // Main footer container styles
    mainBoxContainer: {
        backgroundColor: 'black',
        padding: '5em 2em',
    },

    // First grid styles
    firstGrid: {
        textAlign: 'left',
        color: '#6c757d',
    },
    firstGridLabel: {
        fontSize: '3em'
    },
    firstGridShareIconsBox: {
        color: '#6c757d',
        marginTop: '80px',
        '& .MuiSvgIcon-root': {
            fontSize: '3em'
        }
    },
    firstGridCopyright: {
        fontSize: '2em'
    },

    // Second grid styles
    secondGrid: {
        textAlign: 'left',
        color: 'white'
    },
    secondGridLabel: {
        fontSize: '2em'
    },
    secondGridMenuItems: {
        marginTop: '10px',
        '& .MuiBox-root': {
            fontSize: '1.5em'
        },
        '& .MuiBox-root > .MuiLink-root': {
            color: '#6c757d'
        }
    },
    secondGridDevLabel: {
        fontSize: '1.5em',
        marginTop: '40px',
    },
    secondGridDevInfo: {
        marginTop: '10px',
        '& .MuiLink-root': {
            color: 'white',
        },
        '& .MuiLink-root > .MuiBox-root.MuiBox-root-34': {
            marginLeft: '23px'
        }
    },

    // Third grid styles
    thirdGrid: {
        color: 'White',
        textAlign: 'center'
    },
    thirdGridLabel: {
        fontSize: '2em'
    },
    thirdGridLocation: {
        fontSize: '1.5em',
        marginTop: '10px',
        color: '#6c757d',
        '& .MuiLink-root': {
            color: '#6c757d'
        },
        '& .MuiLink-root > .MuiBox-root.MuiBox-root-42 > .MuiSvgIcon-root': {
            fontSize: '2.5em',
            color: 'darkred'
        }
    }
}

export default function Footer() {
    return (
        <>
            <Box style={stylesFooter.mainBoxContainer}>
                <Container maxWidth="lg">
                    <Grid container xs={12}>
                        <Grid item xs={12} sm={6} style={stylesFooter.firstGrid}>
                            <Box style={stylesFooter.firstGridLabel}>EasyRoad.</Box>
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
                        <Grid item xs={12} sm={2} style={stylesFooter.secondGrid}>
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
                        <Grid item xs={12} sm={4} style={stylesFooter.thirdGrid}>
                            <Box style={stylesFooter.thirdGridLabel}>Address</Box>
                            <Box sx={stylesFooter.thirdGridLocation}>
                                <Link href="#">
                                    <Box>
                                        <RoomIcon/>
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