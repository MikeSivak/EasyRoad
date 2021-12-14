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
    FormGroup
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { setQuarter } from "date-fns";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Profile() {
    const theme = useTheme();
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleTabChangeIndex = (index) => {
        setTabValue(index);
    };

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
            .catch((reason: AxiosError) => {
                if (reason.response.status == 401) {
                    navigate('/unauth')
                }
                if (reason.response.status == 403) {
                    navigate('/notaccess')
                }
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
                localStorage.setItem('x-user-cars', res.data)
                window.location.reload()
            })
            .catch((err) => {
                console.log("===== CREATE CAR ERROR =====")
                console.log(err.message)
                console.log("===========================")
            })
    }

    const [ads, setAds] = useState([]);

    const getUserAds = async () => {
        await axios.get('/ads/userAds', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
                'x-user-id': localStorage.getItem('x-user-id')
            }
        })
            .then((res) => {
                setAds(res.data);
            })
            .catch((e) => {
                console.log("ERROR ADS: " + e.message)
            })
    }

    const [orders, setOrders] = useState([]);

    const getUserOrders = async () => {
        await axios.get('/orders', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
                'x-user-id': localStorage.getItem('x-user-id')
            }
        })
            .then((res) => {
                setOrders(res.data);
            })
            .catch((e) => {
                console.log("ERROR ORDERS: " + e.message)
            })
    }

    const [usersList, setUsersList] = useState([]);

    const getUsersList = () => {
        axios.get('/admin/users', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then((res) => {
                console.log("===== GET USERS LIST =====")
                console.log(res.data)
                setUsersList(res.data)
                console.log("==============================")
            })
            .catch((err) => {
                console.log("===== GET USERS LIST ERROR =====")
                console.log(err.message)
                console.log("===========================")
            })
    }

    const blockUser = async (id) => {
        await axios.post('/admin/user/block', {
            id: id
        }, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log("BLOCK USER: " + res.data)
                getUsersList();
            })
            .catch((err) => {
                console.log("BLOCK USER ERROR: " + err.message)
            })
    }

    const unblockUser = async (id) => {
        await axios.post('/admin/user/unblock', {
            id: id
        }, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((res) => {
                console.log("UNBLOCK USER: " + res.data)
                getUsersList();
            })
            .catch((err) => {
                console.log("UNBLOCK USER ERROR: " + err.message)
            })
    }

    React.useEffect(() => {
        profileData();
        getUserAds();
        getUsersList();
        getUserOrders();
    }, [])

    return (
        <>
            <Box style={{ backgroundColor: '#222222', padding: '3em' }}>
                <Grid container xs={12} spacing={0} style={{ justifyContent: 'center', background: 'rgb(39 39 39)', padding: '1em' }}>
                    <Grid item xs>
                        <Box style={{ padding: '1em', backgroundColor: '#CFCFCF', maxWidth: 400, minWidth: 300, margin: '0 auto' }}>
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
                    </Grid>
                    <Grid item xs={8}>
                        <Box style={{ padding: '1em 1em 1em 1em', backgroundColor: '#CFCFCF', minWidth: 300 }}>
                            <AppBar position="static">
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    style={{ background: 'rgb(232, 232, 232)' }}
                                >
                                    <Tab label="Объявления" {...a11yProps(0)} />
                                    <Tab label="Заказы" {...a11yProps(1)} />
                                    <Tab label="Отзывы" {...a11yProps(2)} />
                                    {usersList.length !== 0 ? <Tab label="Пользователи" {...a11yProps(3)} /> : ''}
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={tabValue}
                                onChangeIndex={handleTabChangeIndex}
                            >
                                <TabPanel value={tabValue} index={0} dir={theme.direction}>
                                    {ads.length == 0 ? <span>Здесь пока нет объявлений</span> : ''}
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
                                                                        <Typography style={{ fontSize: '1.2em', backgroundColor: '#EEFFF0', padding: '0.3em 0', borderRadius: '8px' }}>{ad.price} руб.</Typography>
                                                                    </Box>
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
                                </TabPanel>
                                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                                    {orders.length == 0 ? <span>У вас пока нет заказов</span> : ''}
                                    {orders.map((order) => (
                                        
                                        <div>
                                            <h3>Объявление</h3>
                                            <p style={{border:'1px solid green'}}>Водитель id: {order.driverId}</p>
                                            <p>Пассажир id: {order.passengerId}</p>
                                            <p>{order.adId}</p>
                                            <p>{order.seatsCount}</p>
                                            <p>{order.totalPrice}</p>
                                            <Divider/>
                                        </div>
                                    ))}
                                </TabPanel>
                                <TabPanel value={tabValue} index={2} dir={theme.direction}>
                                    {/* {reviews.length == 0 ? <span>У вас пока нет отзывов</span> : ''} */}
                                    <span>У вас пока нет отзывов</span>
                                </TabPanel>
                                <TabPanel value={tabValue} index={3} dir={theme.direction}>
                                    <Typography>Список всех пользователей сайта</Typography>
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 900,
                                            minWidth: 300,
                                            bgcolor: 'background.paper',
                                            marginTop: '2em'
                                        }}
                                    >
                                        {usersList.map((user) => (
                                            <>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar src={`http://localhost:3001/${user.userPhoto}`}>
                                                            {/* <ImageIcon /> */}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={user.userName} secondary={`Статус пользователя: ${user.userStatus == 1 ? 'Разблокирован' : 'Заблокирован'}`} />
                                                    {user.userStatus == 1 ? <Button onClick={() => blockUser(user.id)}>Блокировать</Button> : <Button onClick={() => unblockUser(user.id)} >Разблокировать</Button>}
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        ))}
                                    </List>
                                </TabPanel>
                            </SwipeableViews>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}