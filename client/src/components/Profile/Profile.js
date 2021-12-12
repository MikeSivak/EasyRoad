import {
    Grid,
    Box,
    Typography,
    TextField,
    Radio,
    FormControlLabel,
    IconButton,
    FormLabel,
    RadioGroup,
    InputAdornment,
    Input,
    FormControl,
    InputLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Link,
    Button,
    getNativeSelectUtilityClasses,
    Divider,
} from "@material-ui/core";

import EmailIcon from '@mui/icons-material/Email';
import MaleIcon from '@mui/icons-material/Male';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIphone from "@mui/icons-material/PhoneIphone";
import FemaleIcon from '@mui/icons-material/Female';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { setQuarter } from "date-fns";

export default function Profile() {
    const [changePassword, setChangePassword] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [changeData, setChangeData] = useState('none');
    const [showData, setShowData] = useState('block');
    const [loadPhoto, setLoadPhoto] = useState('none');

    const handeChangeData = (event) => {
        if (changeData == 'none') {
            setChangeData('block');
            setLoadPhoto('block');
            setShowData('none');
        }
        else {
            setChangeData('none');
            setLoadPhoto('none');
            setShowData('block');
        }
    }

    const handleChange = (prop) => (event) => {
        setChangePassword({ ...changePassword, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setChangePassword({
            ...changePassword,
            showPassword: !changePassword.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [user, setUser] = useState({});
    const [cars, setCars] = useState([]);

    let navigate = useNavigate();
    const profileData = async () => {
        await axios.get('/profile', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
                'x-user-id': localStorage.getItem('x-user-id')
            }
        }
        )
            .then((res) => {
                setUser(res.data['data']['user'])
                setCars(res.data['data']['cars'])
            })
            .catch(() => {
                navigate('/unauth')
            })
    }

    // const [photo, setPhoto] = useState({});

    function uploadHandler(event) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        axios.post('http://localhost:3001/upload', data, { headers: { 'x-user-id': localStorage.getItem('x-user-id') } })
            .then((res) => {
                setUser({ ...user, userPhoto: res.data.filename })
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const [carPhoto, setCarPhoto] = useState('');

    async function uploadCarPhoto(event) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        await axios.post('http://localhost:3001/uploadcarphoto', data)
            .then((res) => {
                console.log("CAR PHOTO: " + res.data.filename);
                // setCarPhoto(res.data.filename)
                setCarPhoto(res.data.filename)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }


    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carNumber, setCarNumber] = useState('');

    const handleCarBrandChange = (event) => {
        setCarBrand(event.target.value)
        console.log(event.target.value)
    }
    const handleCarModelChange = (event) => {
        setCarModel(event.target.value)
        console.log(event.target.value)
    }
    const handleCarNumberChange = (event) => {
        setCarNumber(event.target.value)
        console.log(event.target.value)
    }

    const addCar = async () => {
        await axios.post('/profile/addCar', {
            userId: localStorage.getItem('x-user-id'),
            carBrand: carBrand,
            carModel: carModel,
            carNumber: carNumber,
            carPhotoLink: carPhoto
        }, {
            headers: { 'x-access-token': localStorage.getItem('x-access-token') }
        })
            .then((res) => {
                console.log("===== CREATE CAR RESPONSE =====")
                console.log(res.data)
                localStorage.setItem('x-user-cars', res.data)
                console.log("==============================")
                window.location.reload()
            })
            .catch((err) => {
                console.log("===== CREATE CAR ERROR =====")
                console.log(err.message)
                console.log("===========================")
            })
    }

    React.useEffect(() => {
        profileData();
    }, [])

    return (
        <>
            <Box style={{ backgroundColor: '#222222', padding: '3em' }}>
                <Box style={{ padding: '1em 1em 1em 1em', backgroundColor: '#CFCFCF', maxWidth: 400, minWidth: 300, margin: '0 auto' }}>
                    <Box style={{ backgroundColor: '#E8E8E8', padding: '4em 0' }}>
                        {
                            // <img style={{ borderRadius: '50%', width: 200, height: 200 }} src={`http://localhost:3001/${user.userPhoto}`} alt="photo" />
                        }
                        <Avatar style={{ borderRadius: '50%', width: 240, height: 240, margin: '0 auto' }} src={`http://localhost:3001/${user.userPhoto}`} sx={{ bgcolor: 'darkred' }} aria-label="recipe">
                        </Avatar>
                        <Box style={{ display: loadPhoto, marginTop: '20px' }}>
                            <FormControl variant="standard" >
                                <label htmlFor="icon-button-file">
                                    <Input sx={{ display: 'none' }} accept="image/*" onChange={uploadHandler} id="icon-button-file" type="file" name='file' />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera style={{ fontSize: '2em' }} />
                                    </IconButton>
                                </label>
                            </FormControl>
                        </Box>
                        <Typography style={{ fontSize: '30px', fontWeight: '400' }}>{user.userName}</Typography>
                        <Typography style={{ fontSize: '30px', fontWeight: '400' }}>
                            <Button sx={{ textTransform: 'none', fontSize: '0.6em' }} onClick={handeChangeData}>Редактировать</Button>
                        </Typography>
                    </Box>
                    {/* After "Edit profile" button clicked*/}
                    <Box style={{ display: changeData }}>
                        <Box style={{ padding: '1em', color: 'green' }}>
                            <Typography style={{ fontSize: '1.4em' }}>Редактирование профиля</Typography>
                        </Box>
                        <Box style={{ marginTop: 5 }}>
                            <Box style={{ backgroundColor: '#E8E8E8', height: 450, margin: '0 auto' }}>
                                <Box sx={{ '& > :not(style)': { m: 2 } }}>
                                    <FormControl variant="standard" style={{ width: '84%' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                            Изменить почту
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <EmailIcon fontSize='large' />
                                                </InputAdornment>
                                            }
                                            // defaultValue={profile.userEmail}
                                            value={user.userEmail}
                                        />
                                    </FormControl>
                                    <FormControl variant="standard" style={{ width: '84%' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                            Изменить телефон
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PhoneIphoneIcon fontSize='large' />
                                                </InputAdornment>
                                            }
                                            value={user.userPhone}
                                        />
                                    </FormControl>
                                    <FormControl style={{ width: '84%' }} variant="standart">
                                        <InputLabel htmlFor="change-password" style={{ fontSize: '1.1em' }}>
                                            Изменить пароль
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="change-password"
                                            type={changePassword.showPassword ? 'text' : 'password'}
                                            value={changePassword.password}
                                            onChange={handleChange('password')}
                                            placeholder='Введите новый пароль'
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {changePassword.showPassword ? <VisibilityOff fontSize='large' /> : <Visibility fontSize='large' />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <Box style={{ backgroundColor: '#CFCFCF', padding: '1em' }}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend" style={{ fontSize: '1.5em' }}>Gender</FormLabel>
                                            <FormLabel component="legend" style={{ fontSize: '1.1em', marginTop: '0.5em' }}>Изменить пол</FormLabel>
                                            <RadioGroup row aria-label="gender" name="customized-radios" style={{ marginTop: '0.5em' }}>
                                                <FormControlLabel
                                                    value="female"
                                                    control={
                                                        user.gender == 'female' ? <Radio checked /> : <Radio />
                                                    }
                                                    label={<FemaleIcon
                                                        fontSize='large'
                                                        sx={{ color: 'firebrick' }}
                                                    />}
                                                />
                                                <FormControlLabel
                                                    value="male"
                                                    control={
                                                        user.gender == 'male' ? <Radio checked /> : <Radio />
                                                    }
                                                    label={<MaleIcon fontSize='large'
                                                        sx={{ color: '#1976d2' }}
                                                    />}
                                                />
                                                <FormControlLabel
                                                    value="other"
                                                    control={
                                                        user.gender == 'other' ? <Radio checked /> : <Radio />
                                                    }
                                                    label={<TransgenderIcon
                                                        fontSize='large'
                                                        sx={{ color: 'purple' }}
                                                    />}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Accordion style={{ padding: '1em', backgroundColor: '#E8E8E8' }}>
                            <Box style={{ backgroundColor: '#CFCFCF' }}>
                                <AccordionSummary
                                    expandIcon={<DirectionsCarIcon fontSize='large' />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ flexDirection: 'column', padding: '1em 0' }}
                                >
                                    <Typography style={{ fontSize: '1.2em' }}>Нажмите здесь, чтобы добавить автомобиль</Typography>
                                </AccordionSummary>
                            </Box>
                            <AccordionDetails>
                                <Box sx={{ '& > :not(style)': { mt: 4 } }}>
                                    <FormControl variant="standard" style={{ width: '100%' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                            Марка авто
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="input-with-icon-adornment"
                                            value={carBrand}
                                            defaultValue=''
                                            onChange={handleCarBrandChange}
                                            placeholder='Введите марку авто'
                                        />
                                    </FormControl>
                                    <FormControl variant="standard" style={{ width: '100%' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                            Модель автомобиля
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="input-with-icon-adornment"
                                            value={carModel}
                                            defaultValue=''
                                            onChange={handleCarModelChange}
                                            placeholder='Введите модель авто'
                                        />
                                    </FormControl>
                                    <FormControl variant="standard" style={{ width: '100%' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                            Номер автомобиля
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="input-with-icon-adornment"
                                            value={carNumber}
                                            defaultValue=''
                                            onChange={handleCarNumberChange}
                                            placeholder='Введите номер авто'
                                        />
                                    </FormControl>
                                    <Box>
                                        <FormControl variant="standard" >
                                            <label htmlFor="icon-button-car-photo-file">
                                                <Input sx={{ display: 'none' }} accept="image/*" onChange={uploadCarPhoto} id="icon-button-car-photo-file" type="file" name='file' />
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <PhotoCamera style={{ fontSize: '2em' }} />
                                                </IconButton>
                                            </label>
                                        </FormControl>
                                    </Box>
                                    <img style={{ width: 300 }} src={`http://localhost:3001/${carPhoto}`} alt='car photo' />
                                    <Box style={{ padding: '0 0 0 0' }}>
                                        <Button variant='contained' size='large' onClick={addCar} >Добавить</Button>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    {/* Before "Edit profile" button clicked*/}
                    <Box style={{ display: showData }}>
                        <Box style={{ marginTop: 5 }}>
                            <Box style={{ backgroundColor: '#E8E8E8', height: 360, margin: '0 auto' }}>
                                <Box sx={{ '& > :not(style)': { m: 2 } }}>
                                    <FormControl variant="standard" style={{ width: '84%' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                            Ваша почта
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <EmailIcon fontSize='large' />
                                                </InputAdornment>
                                            }
                                            value={user.userEmail}
                                            disabled
                                        />
                                    </FormControl>
                                    <FormControl variant="standard" style={{ width: '84%' }}>
                                        <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                            Ваш телефон
                                        </InputLabel>
                                        <Input
                                            style={{ fontSize: '1.4em' }}
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PhoneIphoneIcon fontSize='large' />
                                                </InputAdornment>
                                            }
                                            value={user.userPhone}
                                            disabled
                                        />
                                    </FormControl>
                                    <Box style={{ backgroundColor: '#CFCFCF', padding: '1em' }}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend" style={{ fontSize: '1.5em' }}>Gender</FormLabel>
                                            <FormLabel component="legend" style={{ fontSize: '1.1em', marginTop: '0.5em' }}>Ваш пол</FormLabel>
                                            {
                                                user.gender == 'male' ?
                                                    <FormControlLabel
                                                        value="male"
                                                        control={<><Radio checked disabled /> Мужской</>}
                                                        label={<MaleIcon sx={{ color: '#1976d2' }}
                                                            fontSize='large' />}
                                                    /> :
                                                    user.gender == 'female' ?
                                                        <FormControlLabel
                                                            value="female"
                                                            control={<><Radio checked disabled /> Женский</>}
                                                            label={<FemaleIcon fontSize='large' />}
                                                        /> :
                                                        <FormControlLabel
                                                            value="other"
                                                            control={<><Radio checked disabled /> Другой</>}
                                                            label={<TransgenderIcon fontSize='large' />}
                                                        />
                                            }
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Accordion style={{ padding: '1em', backgroundColor: '#E8E8E8' }}>
                            <Box style={{ backgroundColor: '#CFCFCF' }}>
                                <AccordionSummary
                                    expandIcon={<DirectionsCarIcon fontSize='large' />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ flexDirection: 'column', padding: '1em 0' }}
                                >
                                    <Typography style={{ fontSize: '1.2em' }}>Информация о ваших автомобилях</Typography>
                                </AccordionSummary>
                            </Box>
                            <AccordionDetails>
                                {cars.map((car) => (
                                    <Card style={{ width: '100%', marginTop: '2em' }}>
                                        {/* <CardMedia
                                            component="img"
                                            height="200"
                                            image="/images/portfolio.jpg"
                                            alt="car"
                                        /> */}
                                        <CardContent style={{}}>
                                            <Typography gutterBottom variant="h4" component="div">
                                                {car.carBrand} {car.carModel}
                                            </Typography>
                                            <Divider sx={{ backgroundColor: 'red' }} />
                                            <Typography style={{ fontSize: '20px', marginTop: '1em' }} component="div">
                                                Номер: {car.carNumber}
                                            </Typography>
                                        </CardContent>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            style={{ width: '300px', margin: '0 auto' }}
                                            image={car.carPhotoLink}
                                            alt="car"
                                        />
                                        <Divider style={{ marginTop: '20px' }} />
                                        <Grid container xs={12} p={"0.5em 0em"}>
                                            <Grid item xs>
                                                <Tooltip title="Изменить" placement="right">
                                                    <IconButton aria-label="edit" size="medium">
                                                        <EditIcon fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item xs>
                                                <Tooltip title="Удалить" placement="left">
                                                    <IconButton aria-label="delete" size="medium">
                                                        <DeleteIcon fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                </Box>
            </Box>
        </>
    )
}