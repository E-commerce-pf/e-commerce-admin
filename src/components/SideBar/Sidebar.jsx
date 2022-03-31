import style from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import { useSelector } from 'react-redux';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import Everylogopf from '../../components/img/Everylogopf.png';
import { CardActionArea, Grid } from '@mui/material';

const drawerWidth = 240;

function Sidebar(props) {
	const user = useSelector((state) => state.currentUser);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const navigate = useNavigate();

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
					<AdminPanelSettingsIcon  color='secondary' />
				<Typography variant='body4' color='textSecondary' component='p'> 
				<strong>{user.name}</strong> <br /> <strong>{user.lastName}</strong> 
				</Typography>
				</ListItemIcon>
				<ListItemText/>
			</ListItem>
			<Divider />

			<ListItem  button onClick={() => navigate('/home')}>
				<ListItemIcon >
					<HomeIcon color='secondary' />
				</ListItemIcon>
				<ListItemText primary='Home' />
			</ListItem>

			<ListItem button onClick={() => navigate('/categories')}>
				<ListItemIcon>
					<CategoryIcon color='secondary'  />
				</ListItemIcon>
				<ListItemText primary='Category' />
			</ListItem>
			<ListItem button onClick={() => navigate('/users')}>
				<ListItemIcon>
					<GroupIcon  color='secondary'  />
				</ListItemIcon>
				<ListItemText primary='User' />
			</ListItem>
			<ListItem button onClick={() => navigate('/create/product')}>
				<ListItemIcon>
					<AddIcon  color='secondary'  />
				</ListItemIcon>
				<ListItemText primary='Crear Producto' />
			</ListItem>
			<Divider />
			
			<ListItem>
				<ListItemIcon>
					<LogoutIcon   color='secondary' />
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
}

export default Sidebar;
