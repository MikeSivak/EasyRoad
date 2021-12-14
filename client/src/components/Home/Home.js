import { Box, Container, Grid, Input, Divider, Card, FormGroup, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { height } from '@material-ui/system';
import Avatar from '@mui/material/Avatar';
import axios from 'axios'

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom'

import stylesHome from './styles'
import { addDays, daysToWeeks, set } from 'date-fns';

export default function Home() {
    const navigate = useNavigate();

    const [errorOpen, setErrorOpen] = useState(false);

    const handleErrorClickOpen = () => {
        setErrorOpen(true);
    };

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    const [city, setCity] = useState('');
    const [depAddress, setDepAddress] = useState('');
    const [arrAddress, setArrAddress] = useState('');
    const [ads, setAds] = useState([]);
    const [date, setDate] = React.useState(null);

    const [searchMenu, setSearchMenu] = useState('none');

    const handleSearchMenu = () => {
        setSearchMenu('none')
    }

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

    useEffect(() => {
        getCities()
    }, [])

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
            <Box style={stylesHome.bannerBoxImage}>
                <Box>
                    <Typography variant='h2' color='white'>Выберите поездку</Typography>
                </Box>
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
                <Box maxWidth='lg' style={{ background: 'white', padding: '2em', maxHeight: '600px', margin: '5px auto', backgroundColor: 'white', overflowY: 'scroll', borderRadius: '10px', display: searchMenu }}>
                    <Grid container xs={12} style={{ textAlign: '-webkit-center' }}>
                        {ads.length == 0 ? <Typography style={{ margin: '0 auto', fontSize: '1.6em' }}>По результатам поиска ничего не найдено :(</Typography> : ''}
                        {ads.map((ad) => (
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
                                {/* <Card sx={{ maxWidth: 300, mx: '1rem', mt: '2rem', minWidth: 300 }}>
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
                                    </Card> */}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <br></br>
            </Box>
            <Box style={{ backgroundColor: '#282828', padding: '5em 0' }}>
                <Box>
                    <Typography variant='h3' color='white'>Как пользоваться нашим сервисом</Typography>
                </Box>
                <Container style={{ marginTop: '80px' }} maxWidth='lg'>
                    <Box>
                        <Typography variant='h1' color='gray'>Здесь будет видео или карусель</Typography>
                    </Box>
                </Container>
            </Box>
            <Box style={{ backgroundColor: '#19181C', padding: '5em 0' }}>
                <Box>
                    <Typography variant='h3' color='white'>Наши преимущества</Typography>
                </Box>
                <Container style={{ marginTop: '80px' }} maxWidth='lg'>

                    <Grid container xs={12}>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ maxWidth: 600, minWidth: 300 }}>
                                <img src='/images/HomeInfo17.jpg' width='100%' />
                            </Box>
                        </Grid>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ textAlign: 'justify', maxWidth: 600, minWidth: 300 }}>
                                <Typography fontSize='2.4em' color='white'>
                                    Всегда под рукой
                                </Typography>
                                <Typography fontSize='1.2em' color='white'>
                                    Вы можете совершать заказы поездок как на компьютере, так и на вашем смартфоне благодаря адаптивности сайта.
                                    Для этого вам не нужно ничего устанавливать на вашем смартфоне, вам нужно просто перейти на наш сайт в браузере
                                    вашего мобильного телефона. В дальнейшем разработчик создаст приложение для мобильных устройств на платформах Android и IOS.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ textAlign: 'justify', maxWidth: 600, minWidth: 300 }}>
                                <Typography fontSize='2.4em' color='white'>
                                    Экономия времени
                                </Typography>
                                <Typography fontSize='1.2em' color='white'>
                                    Вам больше не нужно тратить время на поиски попутчиков или водителей, чтобы дораться до желаемого места,
                                    вам просто достаточно ввести данные о поездке в форму поиска и нажать на кнопку - вам сразу отобразится
                                    список со всеми актуальными объявлениями как от водителей, желающих найти попутчиков, так и от клиентов,
                                    желающих найти водителя.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ maxWidth: 600, minWidth: 300 }}>
                                <img src='/images/HomeInfo19.jpg' width='100%' />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ maxWidth: 600, minWidth: 300 }}>
                                <img src='/images/HomeInfo12.jpg' width='100%' />
                            </Box>
                        </Grid>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ textAlign: 'justify', maxWidth: 600, minWidth: 300 }}>
                                <Typography fontSize='2.4em' color='white'>
                                    Гарантия безопасности
                                </Typography>
                                <Typography fontSize='1.2em' color='white'>
                                    Вам не стоит беспокоится о качестве поездки, ведь техническое состояние автомобилей и все документы,
                                    необходимые для установления соответствия всех данных водителя и его авто строго проверяются нашим сервисом.
                                    Для регистрации своего авто в приложении необходимо предоставить реальную фотографию прав, документы на автомобиль,
                                    включая номер авто и последнюю дату ТО, а также фотографии своего автомобиля с разных ракурсов. В случае, если
                                    хоть одно из требований не будет выполнено, регистрация транспортного средства не будет осуществлена.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ textAlign: 'justify', maxWidth: 600, minWidth: 300 }}>
                                <Typography fontSize='2.4em' color='white'>
                                    Почему стоит выбрать нас
                                </Typography>
                                <Typography fontSize='1.2em' color='white'>
                                    Мы гарантируем безопасноить и конфиденциальность наших клиентов и держим обраную связь с каждым, кому
                                    необходима консультация или помощь в решении какого-либо вопроса, касаемого нашего сервиса. Вы просто можете написать нам - а мы ответим вам.
                                    Наш сервис имеет свою уникальность, чего достаточно трудно добится в настоящее время. В заключении мы скажем следующее:
                                    всегда можно попробовать что-то новое - только так вы узнаете, подходит ли это вам. Выбор за вами...
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ maxWidth: 600, minWidth: 300 }}>
                                <img src='/images/HomeInfo2.jpg' width='100%' />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}