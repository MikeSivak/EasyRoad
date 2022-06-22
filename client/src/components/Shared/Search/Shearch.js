import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Stack,
    Avatar,
    CardMedia,
    IconButton,
    CardContent,
    Input,
    Divider,
    Card,
    FormGroup,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Rating
} from '@material-ui/core';

import axios from 'axios'
import CardHeader from '@mui/material/CardHeader';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import stylesHome from './styles'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardActions from '@mui/material/CardActions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [date, setDate] = React.useState(null);
    const [addresses, setAddresses] = useState([]);
    const [depAddress, setDepAddress] = useState('');
    const [arrAddress, setArrAddress] = useState('');
    const [ads, setAds] = useState([]);
    const [searchMenu, setSearchMenu] = useState('none');
    const [errorOpen, setErrorOpen] = useState(false);

    const handleErrorClickOpen = () => {
        setErrorOpen(true);
    };

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

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
                setAds(res.data);
            })
        setDate(null);
        setCity('');
        setDepAddress('');
        setArrAddress('');
    }

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

    useEffect(() => {
        getCities()
    }, [])

    return (
        <Box>
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
            <Box style={{ backgroundColor: "rgb(34, 34, 34)" }}>
                <Container style={stylesHome.mainSearchContainer} maxWidth='lg'>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs>
                            <FormControl sx={{ m: 1, maxWidth: 800, minWidth: 200 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={city}
                                    label="Город"
                                    onChange={handleCityChange}
                                >
                                    {cities.map((city) => (
                                        <MenuItem value={city.city}>{city.city}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl sx={{ m: 1, maxWidth: 800, minWidth: 200 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Адрес отправления</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={depAddress}
                                    label="Адрес отправления"
                                    onChange={depAddressChange}
                                >
                                    {addresses.map((address) => (
                                        <MenuItem value={address.street + ', ' + address.streetNum}>{address.street + ', ' + address.streetNum}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl sx={{ m: 1, maxWidth: 800, minWidth: 200 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Адрес прибытия</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={arrAddress}
                                    label="Адрес прибытия"
                                    onChange={arrAddressChange}
                                >
                                    {addresses.map((address) => (
                                        <MenuItem value={address.street + ', ' + address.streetNum}>{address.street + ', ' + address.streetNum}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl sx={{ m: 1, maxWidth: 800, minWidth: 200 }} fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Дата поездки"
                                            inputFormat="MM/dd/yyyy"
                                            value={date}
                                            onChange={dateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl sx={{ ml: 1, maxWidth: 800, minWidth: 200 }} margin='normal' >
                                <Button variant="contained" size='large' onClick={searchAds} color='primary'><SearchIcon />Поиск</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
                <Box maxWidth='lg' style={{ background: 'white', padding: '2em', maxHeight: '600px', marginTop: '10px', margin: '0px auto', backgroundColor: 'white', overflowY: 'scroll', borderRadius: '10px', display: searchMenu }}>
                    <Grid container xs={12} style={{ textAlign: '-webkit-center' }}>
                        {ads.length == 0 ? <Typography style={{ margin: '0 auto', fontSize: '1.6em' }}>По результатам поиска ничего не найдено :(</Typography> : ''}
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
                                                title={
                                                    <>
                                                        <Grid container xs={12}>
                                                            <Grid item xs={3}>
                                                                <Avatar src={`http://localhost:3001/${ad["User.userPhoto"]}`} sx={{ bgcolor: 'darkred', width: '50px', height: '50px' }} aria-label="recipe">
                                                                </Avatar>
                                                            </Grid>
                                                            <Grid item xs={7}>
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
                                                        <Accordion style={{ boxShadow: 'none', backgroundColor: 'inherit' }}>
                                                            <AccordionSummary
                                                                // expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel2a-content"
                                                                id="panel2a-header"
                                                                style={{ padding: '0' }}
                                                            >
                                                                <Typography style={{
                                                                    color: 'black',
                                                                    backgroundColor: 'rgb(199 201 255)',
                                                                    padding: '0.4em 1em',
                                                                    borderRadius: '10px',
                                                                    width: '100%',
                                                                    fontSize: '1.2em'
                                                                }}>
                                                                    Подробнее
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
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

                                                                {
                                                                    ad.role == 'driver' ?
                                                                        <CardMedia
                                                                            component="img"
                                                                            height="194"
                                                                            image={
                                                                                `http://localhost:3001/${ad["Car.carPhotoLink"]}`
                                                                            }
                                                                            alt="car"
                                                                        />
                                                                        :
                                                                        ""
                                                                }
                                                            </AccordionDetails>
                                                            <Divider style={{ padding: "0.2em 0" }} />
                                                        </Accordion>
                                                    </>
                                                }
                                            />
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
                                                            {/* <Typography style={{ fontSize: '2em' }}><span style={{ fontWeight: 'bold' }}>1.3 км.</span></Typography> */}
                                                            <img src="https://img.icons8.com/fluent/76/000000/car.png" />
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
                                                                        backgroundColor: 'rgb(199 201 255)',
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
                                                <Box style={{ padding: '1em 1em', width: '100%' }}>
                                                    {/* <Grid container xs={12}> */}
                                                    {/* <Grid item xs style={{ placeSelf: 'center' }}>
                                                                <Box style={{ padding: '0 1em' }}>
                                                                    <Typography style={{ fontSize: '1.2em', backgroundColor: '#EEFFF0', padding: '0.3em 0.5em', borderRadius: '8px' }}><span id={'price' + ad.id}>{ad.price}</span> руб.</Typography>
                                                                </Box>
                                                            </Grid> */}
                                                    {/* <Grid> */}
                                                    <Button
                                                        variant="contained"

                                                        onClick={
                                                            () => setRoles(ad.role, ad.userId, ad.id, ad.price, ad.seatsCount)
                                                        }
                                                        sx={{ textTransform: 'none', fontSize: '1em' }}
                                                        startIcon={<DirectionsCarIcon />}
                                                    >
                                                        Поехали!
                                                    </Button>
                                                    {/* </Grid> */}
                                                    {/* </Grid> */}
                                                </Box>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </>
                                :
                                ''
                        ))}
                        {/* {ads.map((ad) => (
                        <Grid item xs={4}>
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
                                                <img src="https://img.icons8.com/fluent/76/000000/car.png" />
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
                                                    {ad.role == 'driver' ? 'Поехали!' : 'Подобрать'}
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
                    ))} */}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}