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
import { fontWeight, maxWidth } from "@material-ui/system";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { min } from "date-fns";

let stylesAds = {
    mainContainer: {
        padding: '5em 0',
    }
}

export default function Ads() {
    const navigate = useNavigate();

    const [errorOpen, setErrorOpen] = useState(false);

    const handleErrorClickOpen = () => {
        setErrorOpen(true);
    };

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios
            .get('/ads', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
            .then((res) => {
                setAds(res.data);
                console.log("------ Ads ------");
                console.log(res.data)
                console.log('-----------------')
            })
            .catch((e) => {
                console.log("ERROR ADS: " + e.message)
            })
    }, [])

    const setRoles = async (role, user, ad, price) => {
        if (role == 'driver') {

            console.log('AD ID: ' + ad)
            console.log("DRIVER ID: " + user);
            console.log("PASSENGER ID: " + localStorage.getItem('x-user-id'))
            console.log("AD PRICE: " + price)

            await axios.post('/orders/create', {
                driverId: user,
                passengerId: localStorage.getItem('x-user-id'),
                adId: ad,
                seatsCount: 1,
                totalPrice: price
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
                .then((res) => {
                    console.log("CREATE ORDER RESPONSE: " + res.data)
                })
                .catch((err) => {
                    console.log("CREATE ORDER ERROR: " + err.message)
                })
            navigate('/profile');
        }
        else {

            if (localStorage.getItem('x-user-cars') == []) {
                handleErrorClickOpen();
            }
            else {
                console.log('AD ID: ' + ad)
                console.log("DRIVER ID: " + localStorage.getItem('x-user-id'));
                console.log("PASSENGER ID: " + user)
                console.log("AD PRICE: " + price)

                await axios.post('/orders/create', {
                    driverId: localStorage.getItem('x-user-id'),
                    passengerId: user,
                    adId: ad,
                    seatsCount: 1,
                    totalPrice: price
                }, {
                    headers: {
                        'x-access-token': localStorage.getItem('x-access-token')
                    }
                })
                    .then((res) => {
                        console.log("CREATE ORDER RESPONSE: " + res.data)
                    })
                    .catch((err) => {
                        console.log("CREATE ORDER ERROR: " + err.message)
                    })

                navigate('/profile');
            }
        }
    }

    if (localStorage.getItem('x-access-token')) {
        return (
            <>
                <Dialog
                    open={errorOpen}
                    onClose={handleErrorClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ textAlign: 'center', fontSize: '2em' }} id="alert-dialog-title">
                        Ошибка!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ textAlign: 'center', fontSize: '1.4em' }} id="alert-dialog-description">
                            Для того, чтобы ответить на заявку пассажира, нужно добавить автомобиль в свой профиль
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { navigate('/profile') }}>Перейти к профилю</Button>
                        <Button onClick={handleErrorClose} autoFocus>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box style={{ backgroundColor: '#222222' }}>
                    <Container sx={stylesAds.mainContainer} maxWidth='lg'>
                        <Grid container xs={12} spacing={0}>
                            {ads.map((ad) => (
                                <Grid item xs style={{ textAlign: '-webkit-center' }}>
                                    <Card sx={{ maxWidth: 350, mx: '1rem', mt: '2rem', minWidth: 300 }}>
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
                                            title={ad.role == 'driver' ? 'Водитель: ' + ad["User.userName"] : 'Пассажир: ' + ad["User.userName"]}
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
                                                    <Grid item xs={7} style={{ placeSelf: 'center', fontSize: '18px' }}><span style={{ fontWeight: 'bold' }}>Адрес отправления:</span><br /> г. {ad.city} - ул. {ad.startAddress}</Grid>
                                                </Grid>
                                                <Grid container xs={12}>
                                                    <Grid item xs={3}>
                                                        <img src='/images/line.svg' />
                                                    </Grid>
                                                    <Grid item xs={7} style={{ placeSelf: 'center' }}>
                                                        <Typography style={{ fontSize: '2em' }}><span style={{ fontWeight: 'bold' }}>1.3 км.</span></Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container xs={12}>
                                                    <Grid item xs={3}><img width="50px" src="/images/finish.svg" /></Grid>
                                                    <Grid item xs={7} style={{ placeSelf: 'center', fontSize: '18px' }}><span style={{ fontWeight: 'bold' }}>Адрес прибытия:</span><br /> г. {ad.city} - ул. {ad.finishAddress}</Grid>
                                                </Grid>
                                            </Box>
                                            <Divider />
                                            <Box style={{ padding: '2em 0 0 0' }}>
                                                <Grid container xs={12}>
                                                    <Grid item xs style={{ placeSelf: 'center' }}>
                                                        <Box style={{ padding: '0 1em' }}>
                                                            <Typography style={{ fontSize: '1.2em', backgroundColor: '#EEFFF0', padding: '0.3em 0', borderRadius: '8px' }}><span id={'price' + ad.id}>{ad.price}</span> руб.</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={
                                                                () => setRoles(ad.role, ad.userId, ad.id, ad.price)
                                                            }
                                                            sx={{ textTransform: 'none', fontSize: '1em' }}
                                                            startIcon={<DirectionsCarIcon />}
                                                        >
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
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </>
        );
    }
    else {
        window.location = '/'
    }
}