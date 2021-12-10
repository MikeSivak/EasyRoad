import { Container, Grid, Box, Card, FormGroup, Divider, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { maxWidth } from "@material-ui/system";

import axios from 'axios';

let stylesAds = {
    mainContainer: {
        padding: '5em 0',
    }
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Ads() {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [ads, setAds] = useState([]);

    useEffect(()=>{
        axios
        .get('/ads', {headers:{'x-access-token': localStorage.getItem('x-access-token')}})
        .then((res)=>{
            setAds(res.data);
            console.log("------ Ads ------");
            console.log(res.data)
            console.log('-----------------')
        })
        .catch((e)=>{
            console.log("ERROR ADS: " + e.message)
        })
    }, [])

    if (localStorage.getItem('x-access-token')) {
        return (
            <>
                <Box style={{ backgroundColor: '#222222' }}>
                    <Container sx={stylesAds.mainContainer} maxWidth='lg'>
                        <Grid container xs={12} spacing={0}>
                            {ads.map((ad) => (
                                <Grid item xs>
                                    <Card sx={{ maxWidth: 500, mx: '1rem', mt: '2rem', minWidth: 300 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar src={`http://localhost:3001/${ad["User.userPhoto"]}`} sx={{ bgcolor: 'darkred' }} aria-label="recipe">
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={ad["User.userName"]}
                                            subheader={`Дата поездки: ${ad.startDate}`}
                                            style={{ backgroundColor: '#E8E8E8' }}
                                        />
                                        {/* <CardMedia
                                            component="img"
                                            height="194"
                                            image="/images/HomeInfo19.jpg"
                                            alt="Paella dish"
                                        /> */}
                                        <CardMedia>
                                            <Box style={{ padding: '2em 0' }}>
                                                <Grid container xs={12}>
                                                    <Grid item xs={3}><img width="50px" src="/images/finish.svg" /></Grid>
                                                    <Grid item xs={7} style={{ placeSelf: 'center', fontSize: '18px' }}>Откуда едем: {ad.startAddressId}</Grid>
                                                </Grid>
                                                <Grid container xs={12}>
                                                    <Grid item xs={3}>
                                                        <img src='/images/line.svg' />
                                                    </Grid>
                                                    <Grid item xs={7} style={{ placeSelf: 'center' }}>
                                                        <Typography style={{ fontSize: '2em' }}>1.3 км.</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container xs={12}>
                                                    <Grid item xs={3}><img width="50px" src="/images/finish.svg" /></Grid>
                                                    <Grid item xs={7} style={{ placeSelf: 'center', fontSize: '18px' }}>Куда едем: {ad.finishAddressId}</Grid>
                                                </Grid>
                                            </Box>
                                            <Divider />
                                            <Box style={{ padding: '2em 0 0 0' }}>
                                                <Grid container xs={12}>
                                                    <Grid item xs style={{ placeSelf: 'center' }}>
                                                        <Box style={{ padding: '0 1em' }}>
                                                            <Typography style={{ fontSize: '1.2em', backgroundColor: '#EEFFF0', padding: '0.3em 0', borderRadius: '8px' }}>{ad.price} руб.</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Button variant="contained" color="success" sx={{ textTransform: 'none', fontSize: '1em' }} startIcon={<DirectionsCarIcon />}>
                                                            Поехали!
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardMedia>
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                <Grid container xs={12}>
                                                    <Grid item xs>
                                                        <FormGroup>

                                                        </FormGroup>
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing style={{ backgroundColor: '#E8E8E8' }}>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <ShareIcon />
                                            </IconButton>
                                            <ExpandMore
                                                expand={expanded}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </ExpandMore>
                                        </CardActions>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph>Method:</Typography>
                                                <Typography paragraph>
                                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                                    aside for 10 minutes.
                                                </Typography>
                                                <Typography paragraph>
                                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                                </Typography>
                                                <Typography paragraph>
                                                    Add rice and stir very gently to distribute. Top with artichokes and
                                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                                    mussels, tucking them down into the rice, and cook again without
                                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                                    minutes more. (Discard any mussels that don’t open.)
                                                </Typography>
                                                <Typography>
                                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </>
        );
    }
    else{
        window.location = '/'
    }
}