import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logOut } from '../../redux/actions';

//COMPONENTES
import {
	Toolbar,
	CssBaseline,
	Divider,
	IconButton,
	Typography,
	Box,
} from '@mui/material';
import {
	ListItemIcon,
	ListItemText,
	ListItem,
	AppBar,
	Drawer,
	Grid,
} from '@mui/material';
import Everylogopf from '../../components/img/Everylogopf.png';

//ICONOS
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const Sidebar = (props) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const dispatch = useDispatch();
	const user = useSelector((state) => state.currentUser);
	const token = useSelector((state) => state.currentUser.accessToken);

	const [mobileOpen, setMobileOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/');
		}
	}, []);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar>
				<Grid>
					<img src={Everylogopf} alt='img' width='90px' height='49px' />
				</Grid>
			</Toolbar>
			<ListItem>
				<ListItemIcon>
					<AdminPanelSettingsIcon color='secondary' />
					<Typography variant='body4' color='textSecondary' component='p'>
						<strong>{user.name}</strong> <br /> <strong>{user.lastName}</strong>
					</Typography>
				</ListItemIcon>
				<ListItemText />
			</ListItem>
			<Divider />

			<ListItem button onClick={() => navigate('/home')}>
				<ListItemIcon>
					<HomeIcon color='secondary' />
				</ListItemIcon>
				<ListItemText primary='Home' />
			</ListItem>

			<ListItem button onClick={() => navigate('/categories')}>
				<ListItemIcon>
					<CategoryIcon color='secondary' />
				</ListItemIcon>
				<ListItemText primary='Category' />
			</ListItem>
			<ListItem button onClick={() => navigate('/users')}>
				<ListItemIcon>
					<GroupIcon color='secondary' />
				</ListItemIcon>
				<ListItemText primary='User' />
			</ListItem>
			<ListItem button onClick={() => navigate('/transactions')}>
				<ListItemIcon>
					<CategoryIcon color='secondary' />
				</ListItemIcon>
				<ListItemText primary='Transactions' />
			</ListItem>
			<Divider />
			<ListItem button onClick={handleClickOpen}>
				<Dialog
					open={open}
					onClose={handleClose} //funcion para cerrar el dialog
					aria-labelledby='alert-dialog-title'
				>
					<DialogTitle id='alert-dialog-title'>
						{'Are you sure you want to log out?'}
					</DialogTitle>
					<DialogActions>
						<Button onClick={handleClose}>Disagree</Button>
						<Button
							onClick={() => {
								dispatch(logOut());
								navigate('/');
							}}
							autoFocus
						>
							log out
						</Button>
					</DialogActions>
				</Dialog>
				<ListItemIcon>
					<LogoutIcon color='secondary' />
				</ListItemIcon>
				<ListItemText primary='Logout' />
			</ListItem>
		</div>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						{props.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 1,
					width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{props.children}
			</Box>
		</Box>
	);
};

export default Sidebar;
