import { Box, Container, Grid, Input, Divider, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { height } from '@material-ui/system';

import stylesHome from './styles'

export default function Home() {
    const [city, setCity] = useState('');
    const [depAddress, setDepAddress] = useState('');
    const [arrAddress, setArrAddress] = useState('');

    const [date, setDate] = React.useState(null);

    const dateChange = (newValue) => {
        setDate(newValue);
    };
    const cityChange = (event) => {
        setCity(event.target.value);
    };
    const depAddressChange = (event) => {
        setDepAddress(event.target.value);
    }
    const arrAddressChange = (event) => {
        setArrAddress(event.target.value);
    }
    return (
        <>
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
                                    onChange={cityChange}
                                >
                                    <MenuItem value={10}>Минск</MenuItem>
                                    <MenuItem value={20}>Мозырь</MenuItem>
                                    <MenuItem value={30}>Гомель</MenuItem>
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
                                    <MenuItem value={10}>Минск</MenuItem>
                                    <MenuItem value={20}>Мозырь</MenuItem>
                                    <MenuItem value={30}>Гомель</MenuItem>
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
                                    <MenuItem value={10}>Минск</MenuItem>
                                    <MenuItem value={20}>Мозырь</MenuItem>
                                    <MenuItem value={30}>Гомель</MenuItem>
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
                                <Button variant="contained" size='large' color='primary'><SearchIcon />Поиск</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
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
                                <img src='/images/HomeInfo19.jpg' width='100%'/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs sx={{ m: 1 }}>
                            <Box style={{ maxWidth: 600, minWidth: 300 }}>
                                <img src='/images/HomeInfo12.jpg'width='100%' />
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
                                <img src='/images/HomeInfo2.jpg' width='100%'/>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* <Grid container xs={12} spacing={6}>
                        <Grid item xs>
                            <img src='/images/HomeInfo17.jpg' style={{minWidth:300, maxWidth:600}} />
                        </Grid>
                        <Grid item xs>
                            <Box style={{minWidth:300, maxWidth:600, textAlign: 'justify'}}>
                                <Typography fontSize='2em' color='white'>
                                    Всегда под рукой
                                </Typography>
                                <Typography color='white'>
                                    Вы можете совершать заказы поездок как на компьютере, так и на вашем смартфоне благодаря адаптивности сайта.
                                    Для этого вам не нужно ничего устанавливать на вашем смартфоне, вам нужно просто перейти на наш сайт в браузере
                                    вашего мобильного телефона. В дальнейшем разработчик создаст приложение для мобильных устройств на платформах Android и IOS.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Box style={{minWidth:300, maxWidth:600, textAlign: 'justify'}}>
                                <Typography fontSize='2em' color='white'>
                                    Экономия времени
                                </Typography>
                                <Typography color='white'>
                                    Вам больше не нужно тратить время на поиски попутчиков или водителей, чтобы дораться до желаемого места,
                                    вам просто достаточно ввести данные о поездке в форму поиска и нажать на кнопку - вам сразу отобразится
                                    список со всеми актуальными объявлениями как от водителей, желающих найти попутчиков, так и от клиентов,
                                    желающих найти водителя.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <img src='/images/HomeInfo19.jpg' style={{minWidth:300, maxWidth:600}}/>
                        </Grid>
                        <Grid item xs>
                            <img src='/images/HomeInfo12.jpg' style={{minWidth:300, maxWidth:600}}/>
                        </Grid>
                        <Grid item xs>
                            <Box style={{minWidth:300, maxWidth:600, textAlign: 'justify'}}>
                                <Typography fontSize='2em' color='white'>
                                    Гарантия безопасности
                                </Typography>
                                <Typography color='white'>
                                    Вам не стоит беспокоится о качестве поездки, ведь техническое состояние автомобилей и все документы,
                                    необходимые для установления соответствия всех данных водителя и его авто строго проверяются нашим сервисом.
                                    Для регистрации своего авто в приложении необходимо предоставить реальную фотографию прав, документы на автомобиль,
                                    включая номер авто и последнюю дату ТО, а также фотографии своего автомобиля с разных ракурсов. В случае, если
                                    хоть одно из требований не будет выполнено, регистрация транспортного средства не будет осуществлена.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Box style={{minWidth:300, maxWidth:600, textAlign: 'justify'}}>
                                <Typography fontSize='2em' color='white'>
                                    Почему стоит выбрать нас
                                </Typography>
                                <Typography color='white'>
                                    Мы гарантируем безопасноить и конфиденциальность наших клиентов и держим обраную связь с каждым, кому
                                    необходима консультация или помощь в решении какого-либо вопроса, касаемого нашего сервиса. Вы просто можете написать нам - а мы ответим вам.
                                    Наш сервис имеет свою уникальность, чего достаточно трудно добится в настоящее время. В заключении мы скажем следующее:
                                    всегда можно попробовать что-то новое - только так вы узнаете, подходит ли это вам. Выбор за вами...
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <img src='/images/HomeInfo2.jpg'  style={{minWidth:300, maxWidth:600}}/>
                        </Grid>
                    </Grid> */}
                </Container>
            </Box>
        </>
    )
}