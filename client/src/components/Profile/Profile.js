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
    FormGroup,
    Checkbox,
    ListItemButton,
} from "@material-ui/core";

import EmailIcon from '@mui/icons-material/Email';
import MaleIcon from '@mui/icons-material/Male';
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';

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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import { fontSize } from "@material-ui/system";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

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

    const [snackState, setSnackState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = snackState;

    const snackHandleClick = (newState) => () => {
        setSnackState({ open: true, ...newState });
    }

    const snackHandleClose = () => {
        setSnackState({ ...snackState, open: false });
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackHandleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const [rateValue, setRateValue] = React.useState(5);

    const [commentsOpen, setCommentsOpen] = React.useState(false);

    const handleCommentsClickOpen = () => {
        setCommentsOpen(true);
    };

    const handleCommentsClose = () => {
        setCommentsOpen(false);
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const theme = useTheme();
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleTabChangeIndex = (index) => {
        setTabValue(index);
    };

    const [newPassword, setNewPassword] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userRole, setUserRole] = useState('');

    const handleChangeUserEmail = (event) => {
        setUserEmail(event.currentTarget.value)
    }
    const handleChangeUserPhone = (event) => {
        setUserPhone(event.currentTarget.value)
    }
    const handleChangeUserName = (event) => {
        setUserName(event.currentTarget.value)
    }
    const handleChangeUserGender = (event) => {
        setUserGender(event.currentTarget.value)
    }

    const [oldPassword, setOldPassword] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    })

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

    const handleChangeOldPass = (prop) => (event) => {
        setOldPassword({ ...oldPassword, [prop]: event.target.value });
    }
    const handleChangeNewPass = (prop) => (event) => {
        setNewPassword({ ...newPassword, [prop]: event.target.value });
    };

    const handleClickShowNewPass = () => {
        setNewPassword({
            ...newPassword,
            showPassword: !newPassword.showPassword,
        });
    };

    const handleClickShowOldPass = () => {
        setOldPassword({
            ...oldPassword,
            showPassword: !oldPassword.showPassword,
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
                setUserEmail(res.data['data']['user'].userEmail)
                setUserName(res.data['data']['user'].userName)
                setUserPhone(res.data['data']['user'].userPhone)
                setUserGender(res.data['data']['user'].gender)
                setUserRole(res.data['data']['user'].roleId)
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

    const updateProfileInfo = async () => {
        await axios.put('/profile/update', {
            userId: localStorage.getItem('x-user-id'),
            userEmail: userEmail,
            number: userPhone,
            name: userName,
            gender: userGender
        }, {
            headers: { 'x-access-token': localStorage.getItem('x-access-token') }
        })
            .then(() => {
                window.location.reload()
            })
            .catch((err) => {
                throw err.message;
            })
    }

    const changePassword = async () => {
        await axios.patch('/profile/changePassword', {
            userId: localStorage.getItem('x-user-id'),
            oldPassword: oldPassword.password,
            newPassword: newPassword.password,
        }, {
            headers: { 'x-access-token': localStorage.getItem('x-access-token') }
        })
            .then(() => {
                window.location.reload()
            })
            .catch((err) => {
                throw err.message;
            })
    }

    const getCars = async () => {
        await axios.get('/profile/cars', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
                'x-user-id': localStorage.getItem('x-user-id')
            }
        })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('x-user-cars', res.data);
                setCars(res.data);
            })
            .catch((err) => {
                throw err.message
            })
    }

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

    const updateCar = async (carId) => {
        await axios.put(`/profile/updateCar/${carId}`, {
            carBrand: carBrand,
            carModel: carModel,
            carNumber: carNumber,
            carPhotoLink: carPhoto
        }, {
            headers: { 'x-access-token': localStorage.getItem('x-access-token') }
        })
            .then(() => {
                getCars();
                setCarBrand('');
                setCarModel('');
                setCarNumber('');
                setCarPhoto('');
            })
            .catch((err) => {
                throw err.message
            })
    }

    const deleteCar = async (carId) => {
        await axios.delete(`/profile/car/${carId}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
                'x-user-id': localStorage.getItem('x-user-id')
            }
        })
            .then((res) => {
                getCars();
            })
            .catch((e) => {
                if (e.status === 404) {
                    throw e.message
                }
                throw e
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
    const [roleOrder, setRoleOrder] = useState('driver');

    const handleRoleChange = (event) => {
        setRoleOrder(event.target.value);
        getUserOrders(event.target.value);
    };

    const getUserOrders = async (role) => {
        await axios.get(`/orders/${role}`, {
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
    const [allCommentsList, setAllCommentsList] = useState([]);

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

    const [commentValue, setCommentValue] = useState('');

    const handleCommentValueChange = async (event) => {
        setCommentValue(event.target.value)
        console.log("COMMENT CURRENT VALUE" + event.target.value);
    }

    const postComments = async (driver, passenger) => {
        await axios.post('http://localhost:3001/orders/addreview', {
            driverId: driver,
            passengerId: passenger,
            rate: rateValue,
            comment: commentValue,
        },
            {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            }
        )
            .then((res) => {
                console.log("REVIEW CREATE RESULT: " + res.data)
                window.location.reload();
            })
            .catch((err) => {
                console.log("REVIEW CREATE ERROR: " + err.message)
            })
    }

    const [adOrders, setAdOrders] = useState([]);

    const getOrdersByAd = async (adId) => {
        axios.get(`/orders/ordersByAd/${adId}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then((res) => {
                setAdOrders(res.data)
                console.log("------ Вот твои данные пидор! ------")
                console.log(res.data)
                console.log('====================================')
            })
            .catch((err) => {
                throw err.message
            })
    }

    const [usersComments, setUsersComments] = useState([]);

    const getUserComments = async () => {
        await axios.get('/orders/getreviews', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
                'x-user-id': localStorage.getItem('x-user-id')
            }
        })
            .then((res) => {
                console.log("GET COMMENTS RESULT: " + res.data)
                setUsersComments(res.data)
                // window.location.reload();
            })
            .catch((err) => {
                console.log("GET COMMENTS: " + err.message)
            })
    }

    const getAllUserComments = async () => {
        await axios.get('/admin/allComments', {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then((res) => {
                console.log("GET COMMENTS RESULT: " + res.data)
                setAllCommentsList(res.data)
            })
            .catch((err) => {
                console.log("GET COMMENTS: " + err.message)
            })
    }

    const deleteComment = async (id) => {
        await axios.delete(`/orders/comment/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then(() => {
                getUserComments();
                getAllUserComments();
                snackHandleClick({
                    vertical: 'bottom',
                    horizontal: 'right',
                })();
            })
            .catch((err) => {
                throw err.message
            })
    }

    const cancelOrder = async (id) => {
        await axios.delete(`/orders/cancel/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then(() => {
                getUserOrders(roleOrder);
                // snackHandleClick({
                //     vertical: 'bottom',
                //     horizontal: 'right',
                // })();
            })
            .catch((err) => {
                throw err.message
            })
    }

    const deleteAd = async (id) => {
        await axios.delete(`/ads/delete/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then(() => {
                getUserAds()
            })
            .catch((err) => {
                throw err.message
            })
    }

    const deleteUser = async (id) => {
        await axios.delete(`/admin/user/delete/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then(() => {
                getUsersList();
            })
            .catch((err) => {
                throw err.message
            })
    }

    const deleteProfile = async (id) => {
        await axios.delete(`/profile/delete/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token'),
            }
        })
            .then(() => {
                logout();
            })
            .catch((err) => {
                throw err.message
            })
    }

    function logout() {
        localStorage.clear();
        window.location = '/'
    }

    React.useEffect(() => {
        profileData();
        getUserAds();
        getUsersList();
        getUserOrders(roleOrder);
        getUserComments();
        getAllUserComments();
    }, [])

    return (
        <>
            <Snackbar
                open={snackState.open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical, horizontal }}
                onClose={snackHandleClose}
                message="Comment deleted successfully!"
                action={action}
                key={vertical + horizontal}
            />
            <Box style={{ backgroundColor: '#222222', padding: '3em' }}>
                <Grid container xs={12} spacing={0} style={{ justifyContent: 'center', background: 'rgb(39 39 39)', padding: '1em' }}>
                    <Grid item xs>
                        <Box style={{ padding: '1em', backgroundColor: '#CFCFCF', maxWidth: 400, minWidth: 300, margin: '0 auto' }}>
                            <Box style={{ backgroundColor: '#E8E8E8', padding: '4em 0' }}>
                                {
                                    // <img style={{ borderRadius: '50%', width: 200, height: 200 }} src={`http://localhost:3001/${user.userPhoto}`} alt="photo" />
                                    localStorage.setItem('x-user-photo', user.userPhoto)
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
                                <Typography style={{ fontSize: '20px', fontWeight: '400' }}>
                                    <Button sx={{ textTransform: 'none', fontSize: '0.6em' }} onClick={() => deleteProfile(user.id)}>Удалить профиль</Button>
                                </Typography>
                            </Box>
                            {/* After "Edit profile" button clicked*/}
                            <Box style={{ display: changeData }}>
                                <Box style={{ padding: '1em', color: 'rgb(133, 133, 133)' }}>
                                    <Typography style={{ fontSize: '1.4em' }}>Редактирование профиля</Typography>
                                </Box>
                                <Box>
                                    <Box style={{ backgroundColor: '#E8E8E8', height: 540, margin: '0 auto' }}>
                                        <Box sx={{ '& > :not(style)': { m: 2 } }}>
                                            <FormControl variant="standard" style={{ width: '84%' }}>
                                                <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                                    Изменить имя
                                                </InputLabel>
                                                <Input
                                                    style={{ fontSize: '1.4em' }}
                                                    id="input-with-icon-adornment"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <DriveFileRenameOutlineIcon fontSize='large' />
                                                        </InputAdornment>
                                                    }
                                                    value={userName}
                                                    onChange={handleChangeUserName}
                                                />
                                            </FormControl>
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
                                                    value={userEmail}
                                                    onChange={handleChangeUserEmail}
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
                                                    value={userPhone}
                                                    onChange={handleChangeUserPhone}
                                                />
                                            </FormControl>
                                            <Divider />
                                            <Box style={{ backgroundColor: '#CFCFCF', padding: '1em' }}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" style={{ fontSize: '1.5em' }}>Gender</FormLabel>
                                                    <FormLabel component="legend" style={{ fontSize: '1.1em', marginTop: '0.5em' }}>Изменить пол</FormLabel>
                                                    <RadioGroup row aria-label="gender" name="customized-radios" style={{ marginTop: '0.5em' }}
                                                        onChange={handleChangeUserGender}
                                                    >
                                                        <FormControlLabel
                                                            value="female"
                                                            control={
                                                                userGender == 'female' ? <Radio checked /> : <Radio />
                                                            }
                                                            label={<FemaleIcon
                                                                fontSize='large'
                                                                sx={{ color: 'firebrick' }}
                                                            />}
                                                        />
                                                        <FormControlLabel
                                                            value="male"
                                                            control={
                                                                userGender == 'male' ? <Radio checked /> : <Radio />
                                                            }
                                                            label={<MaleIcon fontSize='large'
                                                                sx={{ color: '#1976d2' }}
                                                            />}
                                                        />
                                                        <FormControlLabel
                                                            value="other"
                                                            control={
                                                                userGender == 'other' ? <Radio checked /> : <Radio />
                                                            }
                                                            label={<TransgenderIcon
                                                                fontSize='large'
                                                                sx={{ color: 'purple' }}
                                                            />}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Box style={{ backgroundColor: 'rgb(232, 232, 232)', marginBottom: '1em', padding: '0em 0em 0em 0em' }}>
                                                <Button variant="contained" style={{ width: '100%', height: '50px' }} onClick={() => updateProfileInfo()}> Изменить</Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                {/* --------------------------------------------------------------------- */}
                                <Accordion style={{ padding: '1em', backgroundColor: '#E8E8E8' }}>
                                    <Box style={{ backgroundColor: '#CFCFCF' }}>
                                        <AccordionSummary
                                            aria-controls="change-password-content"
                                            id="change-password-header"
                                            style={{ flexDirection: 'column', padding: '0em 0' }}
                                        >
                                            <Typography style={{ fontSize: '1.2em' }}>Нажмите для изменения пароля</Typography>
                                        </AccordionSummary>
                                    </Box>
                                    <AccordionDetails>
                                        <Box style={{ color: '#1976d2' }}>
                                            <Typography style={{ fontSize: '1.2em' }}>Изменение пароля</Typography>
                                        </Box>
                                        <FormControl style={{ width: '90%', marginTop: '3em' }} variant="standart">
                                            <Input
                                                style={{ fontSize: '1.2em' }}
                                                id="old-password"
                                                type={oldPassword.showPassword ? 'text' : 'password'}
                                                value={oldPassword.password}
                                                onChange={handleChangeOldPass('password')}
                                                placeholder='Введите старый пароль'
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowOldPass}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {oldPassword.showPassword ? <Visibility fontSize='large' /> : <VisibilityOff fontSize='large' />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <FormControl style={{ width: '90%', marginTop: '1em' }} variant="standart">
                                            <Input
                                                style={{ fontSize: '1.2em', marginTop: '1.5em' }}
                                                id="new-password"
                                                type={newPassword.showPassword ? 'text' : 'password'}
                                                value={newPassword.password}
                                                onChange={handleChangeNewPass('password')}
                                                placeholder='Введите новый пароль'
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowNewPass}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {newPassword.showPassword ? <Visibility fontSize='large' /> : <VisibilityOff fontSize='large' />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <Box style={{ backgroundColor: 'rgb(232, 232, 232)', marginTop: '2em', padding: '1em 0em 0em 0em' }}>
                                            <Button variant="contained" style={{ width: '80%', height: '50px' }} onClick={() => changePassword()}>Изменить пароль</Button>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
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
                                            {
                                                carPhoto
                                                    ? <img style={{ width: 300 }} src={`http://localhost:3001/${carPhoto}`} alt='car photo' />
                                                    : ''
                                            }
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
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <Tooltip title="Изменить" placement="left">
                                                                <IconButton aria-label="edit" size="medium">
                                                                    <EditIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        }
                                                        aria-label="Expand"
                                                        aria-controls="additional-actions1-content"
                                                        id="additional-actions1-header"
                                                        style={{ padding: '0em 3em' }}
                                                    >
                                                        <FormControlLabel
                                                            aria-label="Acknowledge"
                                                            onClick={(event) => event.stopPropagation()}
                                                            onFocus={(event) => event.stopPropagation()}
                                                            control={
                                                                <Tooltip title="Удалить" placement="right">
                                                                    <IconButton aria-label="delete" size="medium">
                                                                        <DeleteIcon fontSize="inherit" onClick={() => deleteCar(car.id)} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            }
                                                            label=""
                                                        />
                                                    </AccordionSummary>
                                                    <Divider />
                                                    <AccordionDetails>
                                                        <Typography style={{ fontSize: '1.1em', marginTop: '20px', color: '#1976d2' }}>
                                                            Редактирование
                                                        </Typography>
                                                        <Box sx={{ '& > :not(style)': { mt: 4 } }}>
                                                            <FormControl variant="standard" style={{ width: '100%' }}>
                                                                <InputLabel htmlFor="input-with-icon-adornment" style={{ fontSize: '1.1em' }}>
                                                                    Марка автомобиля
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
                                                            {
                                                                carPhoto
                                                                    ? <img style={{ width: 300 }} src={`http://localhost:3001/${carPhoto}`} alt='car photo' />
                                                                    : ''
                                                            }
                                                            <Box style={{ padding: '0 0 0 0' }}>
                                                                <Button variant='contained' size='large' onClick={() => updateCar(car.id)} >Изменить</Button>
                                                            </Box>
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
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
                                    <Tab label="Мои объявления" {...a11yProps(0)} />
                                    <Tab label="Заказы" {...a11yProps(1)} />
                                    <Tab label="Отзывы" {...a11yProps(2)} />
                                    {usersList.length !== 0 ? <Tab label="Пользователи" {...a11yProps(3)} /> : ''}
                                    {userRole === 1 ? <Tab label="Модерация отзывов" {...a11yProps(4)} /> : ''}
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
                                                            <Avatar src={`http://localhost:3001/${ad["User.userPhoto"]}`} sx={{ bgcolor: 'darkred', width: '50px', height: '50px' }} aria-label="recipe">
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
                                                        {/* <Box style={{ padding: '2em 0 0 0' }}>
                                                            <Grid container xs={12}>
                                                                <Grid item xs style={{ placeSelf: 'center' }}>
                                                                    <Box style={{ padding: '0 1em' }}>
                                                                        <Typography style={{ fontSize: '1.2em', backgroundColor: '#EEFFF0', padding: '0.3em 0', borderRadius: '8px' }}>{ad.price} руб.</Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Box> */}
                                                    </CardMedia>
                                                    {
                                                        ad.role == 'driver'
                                                            ?
                                                            <CardActions disableSpacing>
                                                                <div style={{ width: '100%', textAlign: 'center', padding: '1em 0em' }}>
                                                                    <Box style={{ marginTop: '0em' }}>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="success"
                                                                            sx={{ textTransform: 'none', fontSize: '1em' }}
                                                                            startIcon={<DirectionsCarIcon />}
                                                                            onClick={() => deleteAd(ad.id)}
                                                                        >
                                                                            Закрыть заказ
                                                                        </Button>
                                                                    </Box>
                                                                </div>
                                                            </CardActions>
                                                            : ''
                                                    }
                                                    {/* <CardContent>
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography>Посмотреть заказы</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Divider />
                                                                <List
                                                                    sx={{
                                                                        width: '100%',
                                                                        minWidth: 300,
                                                                        bgcolor: 'background.paper',
                                                                        marginTop: '2em'
                                                                    }}
                                                                >
                                                                    <>
                                                                        <ListItem>
                                                                            <ListItemAvatar>
                                                                                <Avatar src={`http://localhost:3001/${user.userPhoto}`} sx={{ width: '50px', height: '50px' }}>
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary={user.userName} secondary={`Статус пользователя: ${user.userStatus == 1 ? 'Разблокирован' : 'Заблокирован'}`} />

                                                                        </ListItem>
                                                                    </>
                                                                </List>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </CardContent> */}
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                                    <Box sx={{ minWidth: 120, maxWidth: 200 }}>
                                        <FormControl sx={{ m: 1, minWidth: 120 }} variant='outlined'>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={roleOrder}
                                                style={{ backgroundColor: 'white' }}
                                                onChange={handleRoleChange}
                                            >
                                                <MenuItem value={'driver'}>Список заявок пассажиров</MenuItem>
                                                <MenuItem value={'passenger'}>Список ваших заявок</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {orders.length == 0 ? <span>У вас пока нет заказов</span> : ''}
                                    <Grid container xs={12} spacing={0}>
                                        {orders.map((order) => (
                                            <Grid item xs style={{ textAlign: '-webkit-center' }}>
                                                <Card sx={{ maxWidth: 350, mx: '1rem', mt: '2rem', minWidth: 300 }}>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar sx={{ bgcolor: red[500], width: '50px', height: '50px' }} aria-label="recipe" src={
                                                                roleOrder == 'driver'
                                                                    ? `http://localhost:3001/${order['PassengerId.userPhoto']}`
                                                                    : `http://localhost:3001/${order['DriverId.userPhoto']}`
                                                            }>
                                                            </Avatar>
                                                        }
                                                        action={
                                                            <IconButton aria-label="settings">
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        }
                                                        titleTypographyProps={{ fontSize: '1.2em' }}
                                                        title={
                                                            roleOrder == 'driver'
                                                                ? 'Пассажир: ' + order['PassengerId.userName']
                                                                : 'Водитель: ' + order['DriverId.userName']
                                                        }
                                                    />
                                                    <Divider />
                                                    <CardContent>
                                                        <Typography variant="body2" fontSize="1.3em" >
                                                            {
                                                                roleOrder == 'driver'
                                                                    ? 'Информация о пассажире'
                                                                    : 'Информация о водителе'
                                                            }
                                                        </Typography>
                                                        <Typography variant="body2" style={{ textAlign: 'left', padding: '0 2em', marginTop: '2em' }} fontSize="1em" >
                                                            Email: {
                                                                roleOrder == 'driver'
                                                                    ? order['PassengerId.userEmail']
                                                                    : order['DriverId.userEmail']
                                                            }
                                                        </Typography>
                                                        <Typography variant="body2" style={{ textAlign: 'left', padding: '0 2em' }} fontSize="1em" >
                                                            Телефон: {
                                                                roleOrder == 'driver'
                                                                    ? order['PassengerId.userPhone']
                                                                    : order['DriverId.userPhone']
                                                            }
                                                        </Typography>
                                                        <Typography variant="body2" style={{ textAlign: 'left', padding: '0 2em' }} fontSize="1em" >
                                                            {
                                                                roleOrder == 'driver'
                                                                    ? `Пол пассажира: ${order['PassengerId.gender'] === 'male' ? 'мужской' : order['PassengerId.gender'] === 'female' ? 'женский' : 'другой'} `
                                                                    : `Пол водителя: ${order['DriverId.gender'] === 'male' ? 'мужской' : order['PassengerId.gender'] === 'female' ? 'женский' : 'другой'} `
                                                            }
                                                        </Typography>
                                                        <Typography variant="body2" style={{ textAlign: 'center', marginTop: '1em', padding: '0 2em' }} fontSize="1em" >
                                                            {
                                                                roleOrder == 'driver'
                                                                    ? 'Мест заказано: ' + order.seatsCount
                                                                    : 'Вы заказали мест: ' + order.seatsCount
                                                            }
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <div style={{ width: '100%', textAlign: 'center', padding: '1em 0em' }}>
                                                            {
                                                                roleOrder == 'driver'
                                                                    ?
                                                                    <Box style={{ marginTop: '0em' }}>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="error"
                                                                            sx={{ textTransform: 'none', fontSize: '1em' }}
                                                                            startIcon={<DirectionsCarIcon />}
                                                                            onClick={() => cancelOrder(order.id)}
                                                                        >
                                                                            Отклонить заявку
                                                                        </Button>
                                                                    </Box>
                                                                    // <></>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                roleOrder == 'passenger' ?
                                                                    <Button style={{ marginTop: '2em' }}
                                                                        onClick={handleCommentsClickOpen}>
                                                                        Оставить отзыв</Button>
                                                                    : ''
                                                            }
                                                        </div>
                                                    </CardActions>

                                                    <Dialog open={commentsOpen} onClose={handleCommentsClose}>
                                                        <DialogTitle style={{ fontSize: '1.6em', textAlign: 'center' }}>Оставьте ваш отзыв о водителе</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText style={{ textAlign: 'center', fontSize: '1.2em' }}>
                                                                Чтобы оставить отзыв, оцените водителя и оставте свой комментарий о поездке.
                                                            </DialogContentText>
                                                            <Box style={{ textAlign: 'center', marginTop: '2em' }}>
                                                                <Typography style={{ fontSize: '1.6em' }} component="legend">Оцените поездку</Typography>
                                                                <Rating
                                                                    style={{ marginTop: '5px' }}
                                                                    name="simple-controlled"
                                                                    value={rateValue}
                                                                    onChange={(event, newValue) => {
                                                                        setRateValue(newValue);
                                                                    }}
                                                                />
                                                            </Box>
                                                            <TextField
                                                                autoFocus
                                                                margin="dense"
                                                                id="name"
                                                                label="Написать комментарий"
                                                                type="text"
                                                                fullWidth
                                                                variant="standard"
                                                                onChange={handleCommentValueChange}
                                                            />
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleCommentsClose}>Закрыть</Button>
                                                            <Button onClick={() => postComments(order['DriverId.id'], order.passengerId)}>Отправить</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={tabValue} index={2} dir={theme.direction}>
                                    {
                                        usersComments.length == 0
                                            ? <span>У вас пока нет отзывов</span>
                                            :
                                            <>
                                                <Box>
                                                    <Typography>Список комментариев пользователей</Typography>
                                                </Box>
                                                <List
                                                    sx={{
                                                        width: '100%',
                                                        // maxWidth: 900,
                                                        minWidth: 300,
                                                        bgcolor: 'background.paper',
                                                        marginTop: '2em'
                                                    }}
                                                >

                                                    {usersComments.map((comment) => (
                                                        <>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar src={`http://localhost:3001/${comment['User.userPhoto']}`} sx={{ width: '50px', height: '50px' }}>
                                                                        {/* <ImageIcon /> */}
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={'Имя: ' + comment['User.userName']} secondary={'Комментарий: ' + comment.comment} />
                                                                <ListItemText
                                                                    style={{ textAlign: 'right' }}
                                                                    primary={
                                                                        <Typography component="legend">Оценка</Typography>
                                                                    }
                                                                    secondary={
                                                                        <Rating
                                                                            name="read-only"
                                                                            value={comment.rate}
                                                                        />
                                                                    }
                                                                />
                                                                <Box style={{ paddingLeft: '2em' }}>
                                                                    <Tooltip title="Удалить комментарий">
                                                                        <IconButton aria-label="delete"
                                                                            onClick={() => deleteComment(comment.id)}
                                                                        >
                                                                            <HighlightOffIcon
                                                                                style={{
                                                                                    color: 'darkred'
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" />
                                                        </>
                                                    ))}

                                                </List>
                                            </>
                                    }
                                </TabPanel>
                                <TabPanel value={tabValue} index={3} dir={theme.direction}>
                                    <Typography>Список всех пользователей сайта</Typography>
                                    <List
                                        sx={{
                                            width: '100%',
                                            // maxWidth: 900,
                                            minWidth: 300,
                                            bgcolor: 'background.paper',
                                            marginTop: '2em'
                                        }}
                                    >
                                        {usersList.map((user) => (
                                            <>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar src={`http://localhost:3001/${user.userPhoto}`} sx={{ width: '50px', height: '50px' }}>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={user.userName} secondary={`Статус пользователя: ${user.userStatus == 1 ? 'Разблокирован' : 'Заблокирован'}`} />
                                                    {user.userStatus == 1 ? <Button onClick={() => blockUser(user.id)}>Блокировать</Button> : <Button onClick={() => unblockUser(user.id)} >Разблокировать</Button>}
                                                    <Box style={{ paddingLeft: '2em' }}>
                                                        <Tooltip title="Удалить пользователя">
                                                            <IconButton aria-label="delete"
                                                                onClick={() => deleteUser(user.id)}
                                                            >
                                                                <HighlightOffIcon
                                                                    style={{
                                                                        color: 'darkred'
                                                                    }}
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        ))}
                                    </List>
                                </TabPanel>
                                <TabPanel value={tabValue} index={4} dir={theme.direction}>
                                    {
                                        allCommentsList.length == 0
                                            ? <span>На сайте ещё нет отзывов</span>
                                            :
                                            <>
                                                <Box>
                                                    <Typography>Список всех отзывов в системе</Typography>
                                                </Box>
                                                <List
                                                    sx={{
                                                        width: '100%',
                                                        // maxWidth: 900,
                                                        minWidth: 300,
                                                        bgcolor: 'background.paper',
                                                        marginTop: '2em'
                                                    }}
                                                >

                                                    {allCommentsList.map((comment) => (
                                                        <>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar src={`http://localhost:3001/${comment['User.userPhoto']}`} sx={{ width: '50px', height: '50px' }}>
                                                                        {/* <ImageIcon /> */}
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={'Имя: ' + comment['User.userName']} secondary={'Комментарий: ' + comment.comment} />
                                                                <ListItemText
                                                                    style={{ textAlign: 'right' }}
                                                                    primary={
                                                                        <Typography component="legend">Оценка</Typography>
                                                                    }
                                                                    secondary={
                                                                        <Rating
                                                                            name="read-only"
                                                                            value={comment.rate}
                                                                        />
                                                                    }
                                                                />
                                                                <Box style={{ paddingLeft: '2em' }}>
                                                                    <Tooltip title="Удалить комментарий">
                                                                        <IconButton aria-label="delete"
                                                                            onClick={() => deleteComment(comment.id)}
                                                                        >
                                                                            <HighlightOffIcon
                                                                                style={{
                                                                                    color: 'darkred'
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" />
                                                        </>
                                                    ))}

                                                </List>
                                            </>
                                    }
                                </TabPanel>
                            </SwipeableViews>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}