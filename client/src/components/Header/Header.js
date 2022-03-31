import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button, Divider } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Modal } from '@material-ui/core';

// import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 300,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  textAlign: 'center',
};

export default function Header() {
  const isLoggedIn = localStorage.getItem('x-access-token')
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userPhone, setUserPhone] = React.useState('');
  const [gender, setGender] = React.useState('male');
  const [checkFields, setCheckFields] = React.useState('none');

  const handleUserName = (event) => {
    setUserName(event.currentTarget.value);
  }
  const handleUserEmail = (event) => {
    setUserEmail(event.currentTarget.value)
  }
  const handleUserPhone = (event) => {
    setUserPhone(event.currentTarget.value)
  }
  const handleGender = (event) => {
    setGender(event.currentTarget.value)
  }

  function signUp() {
    if (userName == '' || userEmail == '' || passRegisterInput.password == '' || userPhone == '') {
      setCheckFields('block')
      console.log(checkFields)
    }
    else {
      setCheckFields('none')
      axios
        .post('http://localhost:3001/auth/signup', {
          userName: userName,
          userEmail: userEmail,
          userPassword: passRegisterInput.password,
          userPhone: userPhone,
          gender: gender
        })
        .then((res) => {
          console.log(res.data)
          setLoginForm(true)
          setRegisterForm(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function signIn() {
    if (userEmail == '' || passLoginInput.password == '') {
      setCheckFields('block')
      console.log(checkFields)
    }
    else {
      setCheckFields('none')
      axios
        .post('http://localhost:3001/auth/signin', {
          userEmail: userEmail,
          userPassword: passLoginInput.password,
        })
        .then((res) => {
          console.log(res.data)
          localStorage.setItem('x-access-token', res.data.accessToken)
          localStorage.setItem('x-user-id', res.data.id)
          localStorage.setItem('x-role-id', res.data.role)
          localStorage.setItem('x-username', res.data.username)
          localStorage.setItem('x-user-cars', res.data.cars)
          localStorage.setItem('x-user-photo', res.data.userPhoto)
          window.location = '/'
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function logout() {
    localStorage.clear();
    window.location = '/'
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [passLoginInput, setPassLoginInput] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [passRegisterInput, setPassRegisterInput] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [loginForm, setLoginForm] = React.useState(false);
  const loginOpen = () => {
    setLoginForm(true)
    setCheckFields('none')
  };
  const loginClose = () => setLoginForm(false);

  const [registerForm, setRegisterForm] = React.useState(false);
  const registerOpen = () => {
    setRegisterForm(true)
    setCheckFields('none')
  };
  const registerClose = () => setRegisterForm(false);

  const handleClickShowPassword = (event) => {
    setPassLoginInput({
      ...passLoginInput,
      showPassword: !passLoginInput.showPassword,
    });
    setPassRegisterInput({
      ...passRegisterInput,
      showPassword: !passRegisterInput.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordLoginChange = (prop) => (event) => {
    setPassLoginInput({ ...passLoginInput, [prop]: event.target.value });
  };

  const passwordRegisterChange = (prop) => (event) => {
    setPassRegisterInput({ ...passRegisterInput, [prop]: event.target.value });
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        !isLoggedIn ?
          <>
            <MenuItem onClick={handleMenuClose} style={{ fontSize: '1.2em' }}>
              <Link sx={{ textDecoration: 'none' }} onClick={loginOpen}>Войти</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} style={{ fontSize: '1.2em' }}>
              <Link sx={{ textDecoration: 'none' }} onClick={registerOpen}>Зарегистрироваться</Link>
            </MenuItem>
          </>
          :
          <MenuItem onClick={handleMenuClose} style={{ fontSize: '1.2em' }}>
            <Link sx={{ textDecoration: 'none' }} href="/profile" >Мой профиль</Link>
          </MenuItem>
      }

      {
        isLoggedIn ? <MenuItem onClick={logout} style={{ fontSize: '1.2em', color: '#1976d2' }}>Выйти</MenuItem> : <span></span>
      }

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        isLoggedIn ?
          <>
            <MenuItem>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <p>Messages</p>
            </MenuItem>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <p>Notifications</p>
            </MenuItem>
          </>
          : <span></span>
      }
      <MenuItem >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
        {
          !isLoggedIn ? <Link sx={{ textDecoration: 'none' }} onClick={loginOpen} >Мой профиль</Link>
            : <Link sx={{ textDecoration: 'none' }} href="/profile" >Мой профиль</Link>
        }
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Modal
        open={loginForm}
        onClose={loginClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{ mb: '2rem' }} component="h1">
            Вход
          </Typography>
          <Divider />
          <Box sx={{ mt: '1rem' }}>
            <FormControl sx={{ mt: '2rem', width: '28ch' }} variant='outlined'>
              <TextField
                type={'email'}
                id="outlined-required"
                label="Email"
                onChange={handleUserEmail}
              />
            </FormControl>
            <FormControl sx={{ mt: '2rem', width: '28ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={passLoginInput.showPassword ? 'text' : 'password'}
                value={passLoginInput.password}
                onChange={passwordLoginChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passLoginInput.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <span style={{ color: 'red', display: checkFields }}>Заполните все поля</span>
            <FormControl sx={{ mt: "3rem", width: '28ch' }} variant='outlined'>
              <Button variant="contained" sx={{ width: '140px', height: '50px', borderRadius: '8px', margin: '0 auto' }}
                onClick={signIn}>Войти</Button>
            </FormControl>
            {/* <Link style={{fontSize:'14px'}}>Зарегистрироваться</Link> */}
            <FormControl sx={{ m: 1, width: '28ch' }} variant='outlined'>
              <Button variant="text"
                style={{ borderRadius: '8px', margin: '0 auto', fontSize: '16px', textTransform: 'none' }}
                onClick={() => { registerOpen(); loginClose(); }}
              >
                Зарегистрироваться
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={registerForm}
        onClose={registerClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{ mb: '2rem' }} component="h1">
            Регистрация
          </Typography>
          <Divider />
          <Box sx={{ mt: '1rem' }}>
            <FormControl sx={{ mt: "2rem", width: '28ch' }} variant='outlined'>
              <TextField
                type={'text'}
                id="outlined-required"
                label="User Name"
                onChange={handleUserName}
              />
            </FormControl>
            <FormControl sx={{ mt: "2rem", width: '28ch' }} variant='outlined'>
              <TextField
                type={'email'}
                id="outlined-required"
                label="Email"
                onChange={handleUserEmail}
              />
            </FormControl>
            <FormControl sx={{ mt: "2rem", width: '28ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={passRegisterInput.showPassword ? 'text' : 'password'}
                value={passRegisterInput.password}
                onChange={passwordRegisterChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passRegisterInput.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ mt: "2rem", width: '28ch' }} variant='outlined'>
              <TextField
                type={'phone'}
                id="outlined-required"
                label="Phone"
                onChange={handleUserPhone}
              />
            </FormControl>
            <Box style={{ marginTop: '1em', padding: '1em' }}>
              <FormControl component="fieldset">
                {/* <FormLabel component="legend" style={{ fontSize: '1.5em' }}>Gender</FormLabel> */}
                <FormLabel component="legend" style={{ fontSize: '1.1em', marginTop: '0.5em' }}>Выбрать пол</FormLabel>
                <RadioGroup row defaultValue="male" aria-label="gender" name="customized-radios" style={{ marginTop: '0.5em' }}
                  onChange={handleGender}>
                  <FormControlLabel value="female" control={<Radio />} label={<FemaleIcon fontSize='large' sx={{ color: 'firebrick' }} />} />
                  <FormControlLabel value="male" control={<Radio />} label={<MaleIcon fontSize='large' sx={{ color: '#1976d2' }} />} />
                  <FormControlLabel value="other" control={<Radio />} label={<TransgenderIcon fontSize='large' sx={{ color: 'purple' }} />} />
                </RadioGroup>
              </FormControl>
            </Box>
            <span style={{ color: 'red', display: checkFields }}>Заполните все поля</span>
            <FormControl sx={{ mt: "1rem", width: '28ch' }} variant='outlined'>
              <Button variant="contained" sx={{ height: '50px', borderRadius: '8px', margin: '0 auto' }}
                onClick={signUp}>Зарегистрироваться</Button>
            </FormControl>
            {/* <Link style={{fontSize:'14px'}}>Зарегистрироваться</Link> */}
            <FormControl sx={{ m: 1, width: '28ch' }} variant='outlined'>
              <Button variant="text"
                style={{ borderRadius: '8px', margin: '0 auto', fontSize: '16px', textTransform: 'none' }}
                onClick={() => { loginOpen(); registerClose(); }}
              >
                Войти
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: 'black' }} position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Easy Road
            </Typography>
            <Box sx={{ flexGrow: 2 }}>
              <Button variant='success' href='/'>Главная</Button>
              <Button variant='success'>О нас</Button>
              <Button variant='success'>Портфолио</Button>
              <Button variant='success'>Блог</Button>
            </Box>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {
              isLoggedIn ?
                <Box sx={{ flexGrow: 2 }}>
                  <Button variant='success' href='/ads'>Выбрать поездку</Button>
                  <Button variant='success' href='/newad'>Предложить поездку</Button>
                </Box>
                :
                <span></span>
            }
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {
                !isLoggedIn ? <Button variant='success' onClick={loginOpen}>Войти</Button> : <span></span>
              }
              {
                isLoggedIn ?
                  <>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <Badge badgeContent={4} color="error">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </>
                  : <span></span>
              }

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle fontSize="large"  /> */}
                <Avatar style={{ borderRadius: '50%', width: '50px', height: '50px', margin: '0 auto' }} src={`http://localhost:3001/${localStorage.getItem('x-user-photo')}`} sx={{ bgcolor: 'darkred' }} aria-label="recipe">
                </Avatar>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
