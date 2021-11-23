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
  const loginOpen = () => setLoginForm(true);
  const loginClose = () => setLoginForm(false);

  const [registerForm, setRegisterForm] = React.useState(false);
  const registerOpen = () => setRegisterForm(true);
  const registerClose = () => setRegisterForm(false);

  const handleClickShowPassword = () => {
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
        vertical: 'top',
        horizontal: 'right',
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
                      {passLoginInput.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ mt: "3rem", width: '28ch' }} variant='outlined'>
              <Button variant="contained" sx={{ width: '140px', height: '50px', borderRadius: '8px', margin: '0 auto' }}>Войти</Button>
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
                type={'email'}
                id="outlined-required"
                label="Email"
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
                      {passRegisterInput.showPassword ? <Visibility /> : <VisibilityOff />}
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
              />
            </FormControl>
            <FormControl sx={{ mt: "3rem", width: '28ch' }} variant='outlined'>
              <Button variant="contained" sx={{ height: '50px', borderRadius: '8px', margin: '0 auto' }}>Зарегистрироваться</Button>
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
        <AppBar style={{ backgroundColor: 'black' }} position="static">
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
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 2 }}>
              <Button variant='success' href='/'>Главная</Button>
              <Button variant='success'>О нас</Button>
              <Button variant='success'>Портфолио</Button>
              <Button variant='success'>Блог</Button>
              <Button variant='success' href='/ads'>Выбрать поездку</Button>
              <Button variant='success' href='/newad'>Предложить поездку</Button>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* <Button variant='success'>Выбрать поездку</Button>
            <Button variant='success'>Предложить поездку</Button> */}
              <Button variant='success' onClick={loginOpen}>Войти</Button>
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

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
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
