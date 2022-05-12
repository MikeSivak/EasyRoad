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
import Search from '../Shared/Search/Shearch'

import { useNavigate } from 'react-router-dom'

import stylesHome from './styles'
import { addDays, daysToWeeks, set } from 'date-fns';

import { YMaps, Map, ZoomControl, TypeSelector, RouteButton } from 'react-yandex-maps'

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
            <Box style={stylesHome.bannerBoxImage}>
                <Search />
            </Box>
            {/* <Box style={{ backgroundColor: '#282828', padding: '5em 0' }}>
                <Box>
                    <Typography variant='h3' color='white'>Как пользоваться нашим сервисом</Typography>
                </Box>
                <Container style={{ marginTop: '80px' }} maxWidth='lg'>
                    <Box>

                        <YMaps>
                            <div>
                                <Map width={'100%'} height={600} defaultState={{ center: [55.75, 37.57], zoom: 10, controls: [] }}>
                                    <ZoomControl options={{ float: 'right' }} />
                                    <TypeSelector options={{ float: 'right' }} />
                                    <RouteButton options={{ float: 'right' }} />
                                </Map>
                            </div>
                        </YMaps>
                    </Box>
                </Container>
            </Box> */}
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