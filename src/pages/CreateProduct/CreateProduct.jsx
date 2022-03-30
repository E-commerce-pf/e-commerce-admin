import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import baseURL from '../../config/baseUrl';
import style from './CreateProduct.module.scss';

//COMPONENTES
import uploadImage from '../../utils/uploadImage';
import { useDropzone } from 'react-dropzone';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { TextField, Button } from '@mui/material';


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
		baseURL.post('product', { ...product }, {
						headers: {
							token,
						},
					})
			.then((res) => notifySuccess(res.data.success))
			.catch((err) => notifyError(err.response.data.error));
	};

	useEffect(async () => {
		await baseURL.get('category')
			.then((res) => setCategories(res.data))
			.catch((err) => notifyError(err.response.data.error));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: true,
		maxFiles: 5,
		accept: 'image/jpg ,image/jpeg, image/png',
		onDrop: (acceptedFiles, fileRejections) => {
			if (fileRejections.length === 0) uploadImage(acceptedFiles, setStatus, setProduct);
		}
	});

	return (
		<div className={style.container}>
			<Button onClick={() => window.history.go(-1)} variant='contained'>
				Back
			</Button>

			<form onSubmit={handlerSubmit} className={style.formContainer}>
				{product.image ? <div className={style.preview} >
					<img src={product.image} />
					<Button variant='contained' onClick={ () => {
						setProduct({...product, image : ''})
						setStatus({running : 0})
					}}> Delete </Button>
					<p>{product.image.length} / 5</p>
					<progress value={status.running} max='100'/>
				</div> 
				:
				<div {...getRootProps()} className={style.dropZone}>
					<input {...getInputProps()} />
					<p>Add image</p>
					<progress value={status.running} max='100'/>
				</div>
				}
				<select onChange={handlerChange} name='category'>
					{categories.length
						? categories.map((item) => <option key={item.name}>{item.name}</option>)
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
