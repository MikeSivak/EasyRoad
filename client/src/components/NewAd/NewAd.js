import { Container, Box, Typography, FormControl, TextField, Button, Grid, Divider } from "@material-ui/core";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from 'react';
import { getHours } from "date-fns";
import { ru } from "date-fns/locale";

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

export default function NewAd() {
    const [date, setDate] = useState(null);

    const dateChange = (newValue) => {
        setDate(newValue);
    };

    const [time, setTime] = useState(null);

    return (
        <>
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
                                    <TextField
                                        type={'text'}
                                        id="outlined-required-country"
                                        label="Страна"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                    <TextField
                                        type={'text'}
                                        id="outlined-required-city"
                                        label="Город"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                    <TextField
                                        type={'text'}
                                        id="outlined-required-dep-address"
                                        label="Адрес отправления"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                    <TextField
                                        type={'text'}
                                        id="outlined-required-arr-address"
                                        label="Адрес прибытия"
                                    />
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
                                            label="Время"
                                            value={time}
                                            onChange={(newValue) => {
                                                setTime(newValue);
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
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl sx={{ mx: '1rem', mt: '2rem', mb: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                                    <TextField
                                        type={'text'}
                                        id="outlined-required"
                                        label="Количество мест"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Divider />
                        <FormControl sx={{ mx: '1rem', mt: '2rem', maxWidth: 500, minWidth: 300 }} variant='outlined'>
                            <Button variant="contained" sx={{ height: '60px', minWidth: 200, maxWidth: 400, borderRadius: '8px', margin: '0 auto' }}>Создать</Button>
                        </FormControl>
                    </Box>
                </Container>
            </Box>
        </>
    )
}