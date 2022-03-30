import style from './CreateProduct.module.scss';

//COMPONENTES
import { useDropzone } from 'react-dropzone';
import { notifyError, notifySuccess } from '../../utils/notifications';
import baseURL from '../../config/baseUrl';
import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/SideBar/Sidebar';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CreateProduct = () => {
	const token = useSelector((state) => state.currentUser.accessToken);
	const [categories, setCategories] = useState([]);
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
				console.log('Hola');
				setProduct({
					...product,
					categories: [...product.categories, event.target.value],
				});
				return;
			default:
				console.log('Hola2');
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

	//TEMP
	const handleDrop = (acceptedFiles, fileRejections) => {
		if (fileRejections.length === 0) imageFileToBase64File(acceptedFiles);
	};

	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		multiple: false,
		maxFiles: 5,
		accept: 'image/jpg ,image/jpeg, image/png',
		onDrop: (acceptedFiles, fileRejections) =>
			handleDrop(acceptedFiles, fileRejections),
	});

	const imageFileToBase64File = (acceptedFiles) => {
		let files = [];
		if (acceptedFiles.length) {
			acceptedFiles.forEach((item) => {
				const reader = new FileReader();
				console.log(item);
				reader.readAsDataURL(item);

				reader.onloadend = () => {
					files.push(reader.result);
					if (files.length === acceptedFiles.length) {
						setProduct({
							...product,
							images: [...product.images, ...files],
						});
					}
				};
			});
		}
	};

	return (
		<div className={style.container}>
			<Sidebar />
			<form onSubmit={handlerSubmit} className={style.formContainer}>
				<div {...getRootProps()} className={style.dropZone}>
					<input {...getInputProps()} />
					<p>Add image</p>
				</div>
				<select onChange={handlerChange} name='category'>
					{categories.length
						? categories.map((item) => <option>{item.name}</option>)
						: ''}
				</select>

				<TextField label='Title' name='title' onChange={handlerChange} />

				<TextField
					label='Price'
					name='price'
					type='number'
					onChange={handlerChange}
				/>
				<TextField
					label='Stock'
					name='stock'
					type='number'
					onChange={handlerChange}
				/>
				<textarea
					productss={15}
					cols={80}
					name='description'
					placeholder='Description'
					onChange={handlerChange}
				/>
				<Button type='submit' variant='contained'>
					Crear
				</Button>
			</form>
		</div>
	);
};

export default CreateProduct;
