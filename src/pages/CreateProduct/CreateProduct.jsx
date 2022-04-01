import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import baseURL from '../../config/baseUrl';
import style from './CreateProduct.module.scss';
import Sidebar from '../../components/SideBar/Sidebar';
import Everylogopf from '../../components/img/Everylogopf.png';

//COMPONENTES
import ImageCarrousel from '../../components/imageCarrousel/ImageCarrousel';
import uploadImage from '../../utils/uploadImage';
import { useDropzone } from 'react-dropzone';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { TextField, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadIcon from '@mui/icons-material/Upload';
import LinearProgress from '@mui/material/LinearProgress';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const CreateProduct = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [category, setCategory] = React.useState('');
	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	const token = useSelector((state) => state.currentUser.accessToken);
	const [categories, setCategories] = useState([]);
	const [status, setStatus] = useState({});
	const [product, setProduct] = useState({
		image: '',
		title: '',
		categories: '',
		description: '',
		price: '',
		stock: '',
	});

	const handlerChange = (event) => {
		switch (event.target.name) {
			case 'category':
				setProduct({
					...product,
					categories: [...product.categories, event.target.value],
				});
				return;
			default:
				setProduct({
					...product,
					[event.target.name]: event.target.value,
				});
		}
	};

	const handlerSubmit = (event) => {
		event.preventDefault();
		console.log(product);
		baseURL
			.post(
				'product',
				{ ...product },
				{
					headers: {
						token,
					},
				}
			)
			.then((res) => notifySuccess(res.data.success))
			.catch((err) => notifyError(err.response.data.error));
	};

	useEffect(async () => {
		await baseURL
			.get('category')
			.then((res) => setCategories(res.data))
			.catch((err) => notifyError(err.response.data.error));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: true,
		maxFiles: 5,
		accept: 'image/jpg ,image/jpeg, image/png',
		onDrop: (acceptedFiles, fileRejections) => {
			if (fileRejections.length === 0)
				uploadImage(acceptedFiles, setStatus, setProduct);
		},
	});

	return (
		<Sidebar title='Crear producto'>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box
						component='form'
						noValidate
						onSubmit={handlerSubmit}
						sx={{ mt: 3 }}
					>
						<Grid item xs={12} sm={6} >
							<div className={style.dropzone} {...getRootProps()}>
								<input {...getInputProps()} />
								<p>Puede arrastras las imagenes en esta zona</p>
							</div>
							<Box sx={{ width: '100%' }} className={style.test}>
								<Typography> {product.image.length} / 5</Typography>
								<progress value={!status.running ? 0 : status.running === 100 ? 0 : status.running } max='100' />
							</Box>
						</Grid>

						<div className={style.preview}>
							<ImageCarrousel images={product.image}/>
							{product.image ?
								<Button
									value='clear'
									fullWidth
									sx={{ mt: 3, mb: 2 }}
									variant='contained'
									startIcon={<ClearIcon />}
									onClick={() => {
										setProduct({ ...product, image: '' });
										setStatus({ running: 0 });
									}}
								>
									Delete image
								</Button>
								: null
							}
							
						</div>

						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									label='Title'
									name='title'
									onChange={handlerChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<InputLabel id='category'>Select Category</InputLabel>
									<Select
										onChange={handlerChange}
										name='category'
										labelId='category'
										id='category'
										value={category}
										label='Age'
									>
										{categories.map((item) => (
											<MenuItem key={item.name} value={item.name}>
												{item.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label='Price'
									name='price'
									type='number'
									onChange={handlerChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label='Stock'
									name='stock'
									type='number'
									onChange={handlerChange}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<TextField
									fullWidth
									label='Description'
									id='fullWidth'
									productss={15}
									cols={80}
									name='description'
									placeholder='Description'
									onChange={handlerChange}
								/>
							</Grid>
						</Grid>
						<Button
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							color='primary'
							onClick={handleClickOpen}
						>
							Create product
						</Button>
						<Dialog
							open={open}
							TransitionComponent={Transition}
							keepMounted
							onClose={handleClose}
							aria-describedby='alert-dialog-slide-description'
						>
							<DialogTitle>
								{'Create product termins and condition'}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id='alert-dialog-slide-description'>
									Sure to create product ?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Not Create</Button>
								<Button type='submit' onClick={handlerSubmit}>
									Yes Create
								</Button>
							</DialogActions>
						</Dialog>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='#' variant='body2'>
									Promote your product here !
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</Sidebar>
	);
};

export default CreateProduct;
