import { Container, Grid, Box, Card, FormGroup, Divider, Button, Rating } from "@material-ui/core";
import Input from '@mui/material/Input';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from "@material-ui/icons/Search";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { fontSize, fontWeight, maxWidth, width } from "@material-ui/system";
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import stylesHome from '../Home/styles'
import Search from "../Shared/Search/Shearch";

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

    const [city, setCity] = useState('');
    const [depAddress, setDepAddress] = useState('');
    const [arrAddress, setArrAddress] = useState('');
    const [date, setDate] = useState(null);
    const [searchMenu, setSearchMenu] = useState('none');

    const dateChange = (newValue) => {
        setDate(newValue);
        console.log("Date: " + newValue)
    };
    const handleCityChange = (event) => {
        setCity(event.target.value)
        setDate(null)
        setDepAddress('')
        setArrAddress('')
        console.log("City: " + event.target.value)
        getAddresses(event.target.value)
    }
    const depAddressChange = (event) => {
        setDepAddress(event.target.value);
        console.log("Start Address " + event.target.value)
    }
    const arrAddressChange = (event) => {
        setArrAddress(event.target.value);
        console.log("Finish Address: " + event.target.value)
    }

    const [cities, setCities] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const getCities = () => {
        axios.get(`/ads/allcities`, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
            .then((res) => {
                setCities(res.data);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getAddresses = (param) => {
        axios.get(`/ads/addresses/${param}`, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
            .then((res) => {
                setAddresses(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const searchAds = async () => {
        setSearchMenu('block')
        const pad = num => ("0" + num).slice(-2);

        const getTimeFromDate = timestamp => {
            const dt = new Date(timestamp).toISOString();
            let date = dt.split('T')[0];
            return date
        }
        const startDate = getTimeFromDate(date);
        console.log('Времечко: ' + startDate);

        await axios.post('/ads/searchAds', {
            city: city,
            startAddress: depAddress,
            finishAddress: arrAddress,
            startDate: startDate
        }, {
            headers: { 'x-access-token': localStorage.getItem('x-access-token') }
        })
            .then((res) => {
                console.log("==== SEARCH RESULT ====")
                console.log(res.data);
                console.log("=======================")
                setAds(res.data);
            })
        setDate(null);
        setCity('');
        setDepAddress('');
        setArrAddress('');
    }

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

        getCities()
    }, [])

    const setRoles = async (role, user, ad, price, seatsAvailable) => {
        if (role == 'driver') {

            let seatsCount = Number(document.getElementById('seatsCount' + ad).value);
            price *= seatsCount;

            console.log("SEATS COUNT: " + seatsCount)
            console.log('AD ID: ' + ad)
            console.log("DRIVER ID: " + user);
            console.log("PASSENGER ID: " + localStorage.getItem('x-user-id'))
            console.log("AD PRICE: " + price)

            await axios.post('/orders/create', {
                driverId: user,
                passengerId: localStorage.getItem('x-user-id'),
                adId: ad,
                seatsCount: seatsCount,
                totalPrice: price,
                seatsAvailable: seatsAvailable
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
                console.log("FFFFFFFFFFFFFFFFFFFFFF: " + seatsAvailable)

                await axios.post('/orders/create', {
                    driverId: localStorage.getItem('x-user-id'),
                    passengerId: user,
                    adId: ad,
                    seatsCount: seatsAvailable,
                    totalPrice: price,
                    seatsAvailable: seatsAvailable
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

    const incrementCount = async (id) => {
        let current = Number(document.getElementById('seatsCount' + id).value);
        let seatsAvailable = Number(document.getElementById('seat' + id).innerHTML);
        current === seatsAvailable
            ? current = seatsAvailable
            : current++
        document.getElementById('seatsCount' + id).value = current;
    }

    const decrementCount = async (id) => {
        let current = Number(document.getElementById('seatsCount' + id).value);
        if (current > 1) {
            current--;
        }
        document.getElementById('seatsCount' + id).value = current;
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
                    <br></br>
                    <Search />
                    <Container sx={stylesAds.mainContainer} maxWidth='lg'>
                        <Grid container xs={12} spacing={0}>
                            {ads.map((ad) => (
                                ad['User.id'] != localStorage.getItem('x-user-id')
                                    ?
                                    <>
                                        <Grid
                                            item
                                            xs
                                            style={
                                                ad.seatsCount !== 0
                                                    ? { textAlign: '-webkit-center' }
                                                    : {
                                                        textAlign: '-webkit-center',
                                                        pointerEvents: 'none',
                                                        opacity: '0.4'
                                                    }
                                            }
                                        >
                                            <Card sx={{ maxWidth: 350, mx: '1rem', mt: '2rem', minWidth: 300 }}>
                                                <CardHeader
                                                    // avatar={
                                                    //     <Avatar src={`http://localhost:3001/${ad["User.userPhoto"]}`} sx={{ bgcolor: 'darkred', width: '50px', height: '50px' }} aria-label="recipe">
                                                    //     </Avatar>
                                                    // }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    }
                                                    title={
                                                        <>
                                                            <Grid container xs={12}>
                                                                <Grid item xs>
                                                                    <Avatar src={`http://localhost:3001/${ad["User.userPhoto"]}`} sx={{ bgcolor: 'darkred', width: '50px', height: '50px' }} aria-label="recipe">
                                                                    </Avatar>
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    <Grid>
                                                                        {ad.role == 'driver' ? <span style={{ fontSize: '16px' }}>{'Водитель: ' + ad["User.userName"]}</span>
                                                                            : <span style={{ fontSize: '16px' }}>{'Пассажир: ' + ad["User.userName"]}</span>}
                                                                    </Grid>
                                                                    <Grid>
                                                                        <span style={{ fontSize: '16px' }}>
                                                                            {`Тел: ${ad['User.userPhone']}`}
                                                                        </span>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Divider style={{ padding: "0.2em 0" }} />
                                                        </>
                                                    }
                                                    subheader={
                                                        <>
                                                            <Typography style={{
                                                                color: 'black',
                                                                backgroundColor: 'rgb(210 158 255)',
                                                                padding: '0.4em 1em',
                                                                borderRadius: '10px',
                                                                marginTop: '1em',
                                                                width: '100%',
                                                                fontSize: '1.2em'
                                                            }}>
                                                                Информация о поездке
                                                            </Typography>
                                                            <Grid container mt={2} pl={2}>
                                                                <Grid>
                                                                    <span style={{ fontSize: '15px' }}>
                                                                        <span style={{ fontWeight: 'bold' }}>Дата поездки: </span>
                                                                        <span style={{ color: 'rgb(25, 118, 210)' }}>{ad.startDate}</span>
                                                                    </span>
                                                                </Grid>
                                                                <Grid>
                                                                    <span style={{ fontSize: '15px' }}>
                                                                        <span style={{ fontWeight: 'bold' }}>Отправление в: </span>
                                                                        <span style={{ color: 'rgb(25, 118, 210)' }}>{ad.startTime}</span>
                                                                    </span>
                                                                </Grid>
                                                                <Grid>
                                                                    <span style={{ fontSize: '15px' }}>
                                                                        <span style={{ fontWeight: 'bold' }}>Прибытие в: </span>
                                                                        <span style={{ color: 'rgb(25, 118, 210)' }}>{ad.finishTime}</span>
                                                                    </span>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container xs p={2}>
                                                                <Grid item>
                                                                    <Typography style={{ fontSize: '1.2em' }}>
                                                                        Рейтинг:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item ml={1} mt={0.2}>
                                                                    <Rating
                                                                        precision={0.5}
                                                                        name="read-only"
                                                                        value={ad['User.rate']}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                    }
                                                    style={{ backgroundColor: '#E8E8E8' }}
                                                />
                                                {/* <CardMedia
                                            component="img"
                                            height="194"
                                            image={ad.carPhotoLink}
                                            alt="photo"
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
                                                    {
                                                        ad.seatsCount !== 0
                                                            ?
                                                            <>
                                                                <Box style={{ padding: '1em 1em' }}>
                                                                    {
                                                                        ad.role == 'driver'
                                                                            ?
                                                                            <Typography>
                                                                                Кол. своб. мест:
                                                                            </Typography>
                                                                            :
                                                                            <Typography>
                                                                                Кол. ожид. мест:
                                                                            </Typography>
                                                                    }
                                                                    <Typography
                                                                        style={{
                                                                            fontSize: '1.4em',
                                                                            backgroundColor: '#EEFFF0',
                                                                            borderRadius: '8px',
                                                                            width: '100px'
                                                                        }}><span id={'seat' + ad.id}>{ad.seatsCount}</span>
                                                                    </Typography>
                                                                </Box>
                                                                {
                                                                    ad.role == 'driver'
                                                                        ?
                                                                        <Box style={{ padding: '2em 0 0em 0' }}>
                                                                            <Typography>
                                                                                Выберите количество мест
                                                                            </Typography>
                                                                            <FormControl variant="standard">
                                                                                <Input
                                                                                    id={'seatsCount' + ad.id}
                                                                                    defaultValue={1}
                                                                                    startAdornment={
                                                                                        <IconButton
                                                                                            aria-label="minus"
                                                                                            onClick={() => decrementCount(ad.id)}
                                                                                        >
                                                                                            <RemoveCircleIcon
                                                                                                style={{
                                                                                                    color: 'rgb(25, 118, 210)',
                                                                                                    fontSize: '1.4em'
                                                                                                }}
                                                                                            />
                                                                                        </IconButton>
                                                                                    }
                                                                                    endAdornment={
                                                                                        <IconButton
                                                                                            aria-label="plus"
                                                                                            onClick={() => incrementCount(ad.id)}
                                                                                        >
                                                                                            <AddCircleIcon
                                                                                                style={{
                                                                                                    color: 'rgb(25, 118, 210)',
                                                                                                    fontSize: '1.4em'
                                                                                                }}
                                                                                            />
                                                                                        </IconButton>
                                                                                    }
                                                                                    inputProps={{
                                                                                        min: 0,
                                                                                        style: {
                                                                                            textAlign: 'center',
                                                                                            width: '100px',
                                                                                            fontSize: '1.4em'
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </Box>
                                                                        :
                                                                        <></>
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                <Box style={{ padding: '2em 0em 0em 0em' }}>
                                                                    <Typography style={{ fontSize: '1.4em' }}>
                                                                        Свободных мест нет :(
                                                                    </Typography>
                                                                </Box>
                                                            </>
                                                    }

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
                                                    <Box style={{ padding: '1em 1em' }}>
                                                        <Grid container xs={12}>
                                                            <Grid item xs style={{ placeSelf: 'center' }}>
                                                                <Box style={{ padding: '0 1em' }}>
                                                                    <Typography style={{ fontSize: '1.2em', backgroundColor: '#EEFFF0', padding: '0.3em 0.5em', borderRadius: '8px' }}><span id={'price' + ad.id}>{ad.price}</span> руб.</Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs>
                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    onClick={
                                                                        () => setRoles(ad.role, ad.userId, ad.id, ad.price, ad.seatsCount)
                                                                    }
                                                                    sx={{ textTransform: 'none', fontSize: '1em' }}
                                                                    startIcon={<DirectionsCarIcon />}
                                                                >
                                                                    Поехали!
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </>
                                    :
                                    ''
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