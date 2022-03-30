import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import baseURL from '../../config/baseUrl';
import style from './CreateProduct.module.scss';
import SideBar from '../../components/SideBar/Sidebar';
import Everylogopf from '../../components/img/Everylogopf.png';

//COMPONENTES
import uploadImage from '../../utils/uploadImage';
import { useDropzone } from 'react-dropzone';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
	},
});

const CreateProduct = () => {
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
		<ThemeProvider theme={theme}>
			<SideBar />
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					
						<img src={Everylogopf} alt='img' width='150px' height='100px' />
					
					<Typography component='h1' variant='h5'>
						Create product exclusive
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handlerSubmit}
						sx={{ mt: 3 }}
					>
						{product.image ? (
							<div>
								<img src={product.image} />
								<Button
									variant='contained'
									onClick={() => {
										setProduct({ ...product, image: '' });
										setStatus({ running: 0 });
									}}
								>
									{' '}
									Delete{' '}
								</Button>
								<p>{product.image.length} / 5</p>
								<progress value={status.running} max='100' />
							</div>
						) : (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<Button variant='contained' component='span'>
									Selec a image
								</Button>

								<progress value={status.running} max='100' />
							</div>
						)}
						<select onChange={handlerChange} name='category'>
							{categories.length
								? categories.map((item) => (
										<option key={item.name}>{item.name}</option>
								  ))
								: ''}
						</select>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									label='Title'
									name='title'
									onChange={handlerChange}
								/>
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
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Create product
							</Button>
							<Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Promote your product here !
                </Link>
              </Grid>
            </Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default CreateProduct;
