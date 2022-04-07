import style from './Categories.module.scss';
import baseURL from '../../config/baseUrl';

//COMPONENTES
import Sidebar from '../../components/SideBar/Sidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const token = useSelector((state) => state.currentUser.accessToken);

	useEffect(async () => {
		await baseURL
			.get('category')
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => notifyError(err.response.data.error));
	}, []);

	const handlerSubmit = (event) => {
		event.preventDefault();
		const name = document.querySelector('#name').value;
		baseURL
			.post(
				'admin/categories/create',
				{ name },
				{
					headers: { token },
				}
			)
			.then((res) => notifySuccess(res.data.success))
			.catch((err) => notifyError(err.response.data.error));
	};

	return (
		<Sidebar title='List categories'>
			<div className={style.container}>
				<div className={style.categoriesContainer}>
					<div className={style.title}>
						<h1>List Categories</h1>
					</div>

					<div className={style.categories}>
						{categories.length
							? categories.map((item) => {
									return (
										<div
											div
											key={item.id}
											className={style.category}
											onClick={() => navigate(`/category/${item.id}`)}
										>
											<h2>{item.name}</h2>
											<h2>{item.products}</h2>
											<Button
												variant='contained'
												onClick={() => {
													baseURL
														.delete(`admin/categories/${item.id}`, {
															headers: { token },
														})
														.then((res) => notifySuccess(res.data.success))
														.catch((err) =>
															notifyError(err.response.data.error)
														);
												}}
											>
												{' '}
												<DeleteIcon />{' '}
											</Button>
										</div>
									);
							})
							: ''}
					</div>
				</div>

				<div className={style.formCreateCategory}>
					<h1>Create new category</h1>
					<form onSubmit={handlerSubmit}>
						<TextField label='name' id='name' />
						<Button type='submit' variant='contained'>
							Create
						</Button>
					</form>
				</div>
			</div>
		</Sidebar>
	);
};
export default Categories;
