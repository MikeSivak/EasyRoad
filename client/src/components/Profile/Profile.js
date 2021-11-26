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
    Button
} from "@material-ui/core";

import EmailIcon from '@mui/icons-material/Email';
import MaleIcon from '@mui/icons-material/Male';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIphone from "@mui/icons-material/PhoneIphone";
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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

    const handeChangeData = (event) => {
        if (changeData == 'none') {
            setChangeData('block');
            setShowData('none');
        }
        else {
            setChangeData('none');
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

    return (
        <>
            <Box style={{ backgroundColor: '#222222', padding: '3em' }}>
                <Box style={{ padding: '1em 1em 1em 1em', backgroundColor: '#CFCFCF', maxWidth: 400, minWidth: 300, margin: '0 auto' }}>
                    <Box style={{ backgroundColor: '#E8E8E8', padding: '4em 0'}}>
                        <img style={{ borderRadius: '50%', width: 200, height: 200 }} src='/images/portfolio.jpg' />
                        <Typography style={{ fontSize: '30px', fontWeight: '400' }}>Mike Sivak</Typography>
                        <Typography style={{ fontSize: '30px', fontWeight: '400' }}>
                            <Button sx={{ textTransform: 'none', fontSize: '0.6em' }} onClick={handeChangeData}>Edit profile</Button>
                        </Typography>
                    </Box>
                    {/* After "Edit profile" button clicked*/}
                    <Box style={{ display: changeData }}>
                        <Box style={{padding:'1em', color:'green'}}>
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
                                            defaultValue='noizemcnorm@gmail.com'
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
                                            defaultValue='+375297314004'
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
                                            <RadioGroup row defaultValue="male" aria-label="gender" name="customized-radios" style={{ marginTop: '0.5em' }}>
                                                <FormControlLabel value="female" control={<Radio />} label={<FemaleIcon  fontSize='large' sx={{color:'firebrick'}}/>} />
                                                <FormControlLabel value="male" control={<Radio />} label={<MaleIcon fontSize='large' sx={{color:'#1976d2'}}/>} />
                                                <FormControlLabel value="other" control={<Radio />} label={<TransgenderIcon fontSize='large' sx={{color:'purple'}} />} />
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
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    {/* After "Edit profile" button clicked*/}
                    <Box style={{ display: showData }}>
                        <Box style={{ marginTop: 5 }}>
                            <Box style={{ backgroundColor: '#E8E8E8', height: 360, margin: '0 auto' }}>
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
                                            defaultValue='noizemcnorm@gmail.com'
                                            disabled
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
                                            defaultValue='+375297314004'
                                            disabled
                                        />
                                    </FormControl>
                                    <Box style={{ backgroundColor: '#CFCFCF', padding: '1em' }}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend" style={{ fontSize: '1.5em' }}>Gender</FormLabel>
                                            <FormLabel component="legend" style={{ fontSize: '1.1em', marginTop: '0.5em' }}>Ваш пол</FormLabel>
                                            {/* <RadioGroup row defaultValue="male" aria-label="gender" name="customized-radios" style={{ marginTop: '0.5em' }}> */}
                                                {/* <FormControlLabel value="female" disabled control={<Radio />} label={<FemaleIcon fontSize='large' />} /> */}
                                                <FormControlLabel value="male" control={<><Radio checked disabled/> Мужской</>} label={<MaleIcon sx={{color:'#1976d2'}} fontSize='large' />} />
                                                {/* <FormControlLabel value="other" disabled control={<Radio />} label={<TransgenderIcon fontSize='large' />} /> */}
                                            {/* </RadioGroup> */}
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
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                </Box>
            </Box>
        </>
    )
}