import { Box, Container, Grid, Input, Divider, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
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

let stylesHome = {
    bannerBoxImage: {
        backgroundImage: 'url(/images/HomeBanner1.jpg)',
        minHeight: '400px',
        padding: '10em 0 0 0',
        filter:'none'
    },
    mainSearchContainer: {
        // maxWidth: '800px',
        padding: '0.5em',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    searchInput: {
        textAlign: 'center'
    }
}

export default function Home() {
    const [city, setCity] = useState('');
    const [depAddress, setDepAddress] = useState('');
    const [arrAddress, setArrAddress] = useState('');

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
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
                <Container style={stylesHome.mainSearchContainer} maxWidth='lg'>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={2}>
                            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={city}
                                    label="Город"
                                    onChange={cityChange}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <MenuItem value={10}>Минск</MenuItem>
                                    <MenuItem value={20}>Мозырь</MenuItem>
                                    <MenuItem value={30}>Гомель</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
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
                            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
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
                            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Дата поездки"
                                            inputFormat="MM/dd/yyyy"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl margin='normal'>
                                <Button variant="contained" size='large' color='primary'><SearchIcon />Search</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}