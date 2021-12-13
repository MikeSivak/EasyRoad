import { Container, Box, Typography, FormControl, TextField, Button, Grid, Modal, Divider, Select, InputLabel, MenuItem } from "@material-ui/core";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useEffect, useState } from 'react';
import { getHours, set } from "date-fns";
import { ru } from "date-fns/locale";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

let stylesNewAd = {
    mainContainer: {
        padding: '5em 0',
    },
    newAddBox: {
        maxWidth: 800,
        minWidth: 320,
        margin: '0 auto',
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
        textAlign: 'center',
    }
}

const modalError = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function NewAd() {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/profile')
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [coutries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [finishTime, setFinishTime] = useState(null);
    const [role, setRole] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [startAddress, setStartAddress] = useState('');
    const [finishAddress, setFinishAddress] = useState('')
    const [price, setPrice] = useState('');
    const [seatsCount, setSeatsCount] = useState('');
    const [cars, setCars] = useState([]);

    const [carField, setCarField] = useState('none');
    const [carId, setCarId] = useState(undefined);

    const dateChange = (newValue) => {
        setDate(newValue);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value)
        if (event.target.value == 'driver') {
            if (localStorage.getItem('x-user-cars') == []) {
                handleOpen()
                setRole('passenger')
            }
            else {
                getCars();
                setCarField('block')
            }
        }
        else {
            setCarField('none')
        }
    }

    const handleCarIdChange = (event) => {
        setCarId(event.target.value);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value)
        getCities(event.target.value)
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
        getAddresses(event.target.value)
    }

    const handleStartAddressChange = (event) => {
        setStartAddress(event.target.value)
    }

    const handleFinishAddressChange = (event) => {
        setFinishAddress(event.target.value)
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }

    const handleSeatsCountChange = (event) => {
        setSeatsCount(event.target.value)
    }

    const getCountries = () => {
        axios.get('/ads/countries', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
            .then((res) => {
                setCountries(res.data);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getCities = (param) => {
        axios.get(`/ads/cities/${param}`, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } })
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

    const getCars = () => {
        axios.get(`/ads/cars`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
                'x-user-id': localStorage.getItem('x-user-id')
            }
        })
            .then((res) => {
                setCars(res.data)
                console.log('----- CARS LIST -----')
                console.log(res.data)
                console.log('---------------------')
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    const createAd = async () => {
        const pad = num => ("0" + num).slice(-2);

        const getTimeFromDate = timestamp => {
            const date = new Date(timestamp);
            let hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds();
            return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
        }
        const startT = getTimeFromDate(startTime);
        const finishT = getTimeFromDate(finishTime);

        await axios.post('/ads/create', {
            userId: localStorage.getItem('x-user-id'),
            role: role,
            carId: carId,
            country: country,
            city: city,
            startAddress: startAddress,
            finishAddress: finishAddress,
            startDate: date,
            startTime: startT,
            finishTime: finishT,
            seatsCount: seatsCount,
            price: price
        }, {
            headers: { 'x-access-token': localStorage.getItem('x-access-token') }
        })
            .then((res) => {
                console.log("===== CREATE AD RESPONSE =====")
                console.log(res.data)
                console.log("==============================")
            })
            .catch((err) => {
                console.log("===== CREATE AD ERROR =====")
                console.log(err.message)
                console.log("===========================")
            })

        navigate('/profile')
    }

    useEffect(() => {
        getCountries();
    }, [])

    if (localStorage.getItem('x-access-token')) {
        return (
            <>
                <Box style={{ backgroundColor: '#222222' }}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalError}>
                            <Typography id="modal-modal-title" style={{ textAlign: 'center', color: 'red' }} variant="h6" component="h2">
                                Ошибка :(
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                                Для того, чтобы создавать объявления в качестве водителя, нужно добавить в свой профиль ваш автомобиль
                            </Typography>
                            <Box style={{ textAlign: 'center', padding: '2em 0 0 0' }}>
                                <Button variant="text" onClick={goToProfile} style={{ margin: '0 auto', color: 'green' }}>Перейти в профиль</Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Box>
                        <Container style={stylesNewAd.mainContainer} maxWidth='lg'>
                            <Box sx={stylesNewAd.newAddBox}>
                                <Typography id="modal-modal-title" sx={{ mb: '2rem' }} variant="h5" component="h1">
                                    Создание объявления
                                </Typography>
                                <Divider />
                                <Grid container xs={12}>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            {/* <TextField
                                            type={'text'}
                                            id="outlined-required-country"
                                            label="Страна"
                                        /> */}
                                            <InputLabel id="demo-simple-select-label">Страна</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={country}
                                                label="Страна"
                                                onChange={handleCountryChange}
                                            >
                                                {coutries.map((country) => (
                                                    <MenuItem value={country.country}>{country.country}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            {/* <TextField
                                            type={'text'}
                                            id="outlined-required-city"
                                            label="Город"
                                        /> */}
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
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            <InputLabel id="demo-simple-select-label">Адрес отправления</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={startAddress}
                                                label="Адрес отправления"
                                                onChange={handleStartAddressChange}
                                            >
                                                {addresses.map((address) => (
                                                    <MenuItem value={address.street + ', ' + address.streetNum}>{address.street + ', ' + address.streetNum}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            <InputLabel id="demo-simple-select-label">Адрес прибытия</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={finishAddress}
                                                label="Адрес прибытия"
                                                onChange={handleFinishAddressChange}
                                            >
                                                {addresses.map((address) => (
                                                    <MenuItem value={address.street + ', ' + address.streetNum}>{address.street + ', ' + address.streetNum}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }}>
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
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                                                <TimePicker
                                                    label="Время отправления"
                                                    value={startTime}
                                                    inputFormat="HH:mm"
                                                    onChange={(newValue) => {
                                                        setStartTime(newValue)
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                                                <TimePicker
                                                    label="Время прибытия"
                                                    value={finishTime}
                                                    onChange={(newValue) => {
                                                        setFinishTime(newValue)
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            <TextField
                                                type={'text'}
                                                id="outlined-required"
                                                label="Цена поездки"
                                                value={price}
                                                onChange={handlePriceChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', mb: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                            <TextField
                                                type={'text'}
                                                id="outlined-required"
                                                label="Количество мест"
                                                value={seatsCount}
                                                onChange={handleSeatsCountChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }}>
                                            <InputLabel id="demo-simple-select-label">Выбрать роль</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={role}
                                                label="Выбрать роль"
                                                onChange={handleRoleChange}
                                            >
                                                <MenuItem value={'driver'}>Водитель</MenuItem>
                                                <MenuItem value={'passenger'}>Пассажир</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs style={{ display: carField }}>
                                        <FormControl sx={{ mx: '1rem', pb: '2em', maxWidth: 800, minWidth: 300 }}>
                                            <InputLabel id="demo-simple-select-label">Выбрать авто</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={carId}
                                                label="Выбрать авто"
                                                onChange={handleCarIdChange}
                                            >
                                                {cars.map((car) => (
                                                    <MenuItem value={car.id}>{car.carBrand} {car.carModel} {car.carNumber}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                    <Button
                                        variant="contained"
                                        sx={{ height: '60px', minWidth: 200, maxWidth: 400, borderRadius: '8px', margin: '0 auto' }}
                                        onClick={createAd}
                                    >
                                        Создать
                                    </Button>
                                </FormControl>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }
    else {
        window.location = '/'
    }
}