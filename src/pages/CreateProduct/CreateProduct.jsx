import style from './CreateProduct.module.scss';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

//COMPONENTES
import { useDropzone } from 'react-dropzone';
import { notifyError, notifySuccess } from '../../utils/notifications';
import baseURL from '../../config/baseUrl';
import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebaseConfing from '../../config/firebase';

const CreateProduct = () => {
	const firebaseConfig = {
            apiKey: "AIzaSyCLPv_0OD28irbXx8efWvki-_JeESAmdss",
            authDomain: "everyones-app.firebaseapp.com",
            projectId: "everyones-app",
            storageBucket: "everyones-app.appspot.com",
      };

      const app = initializeApp(firebaseConfig);
	const storage = getStorage( app )
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

	//TEMP
	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		multiple: false,
		maxFiles: 5,
		accept: 'image/jpg ,image/jpeg, image/png',
		onDrop: (acceptedFiles, fileRejections) => {
			if (fileRejections.length === 0) uploadImage(acceptedFiles);
		},
	});

	const uploadImage = ( acceptedFiles )=>{
		const file = acceptedFiles[0];
		const filename = new Date().getTime() + file.name;
		const storageRef = ref(storage, filename);
		const uploadTask = uploadBytesResumable(storageRef , file)
		uploadTask.on( 'state_changed', (snapshot) =>{
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log(`Upload is ${progress}% done`);
			switch(snapshot.state){
				case 'pause' :
					console.log('Upload is paused');
					break;
				case 'running' :
					console.log('Upload is running');
					break;
			}
		}, (error) => console.log(error),
		() => {
			getDownloadURL(uploadTask.snapshot.ref) .then( dowloadURL => {
				setProduct({
					...product ,
					image : dowloadURL
				});
			})
		}
		)
	}	

	return (
		<div className={style.container}>
			<Button onClick={() => window.history.go(-1)} variant='contained'>
				Back
			</Button>
			<form onSubmit={handlerSubmit} className={style.formContainer}>
				{product.image ? <div className={style.preview} >
					<img src={product.image} />
					<Button variant='contained' onClick={ () => setProduct({...product, image : ''})}> Delete </Button>
				</div> 
				:
				<div {...getRootProps()} className={style.dropZone}>
					<input {...getInputProps()} />
					<p>Add image</p>
				</div>
				}
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
