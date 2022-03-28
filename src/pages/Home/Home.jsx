import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions';
import style from './Home.module.scss';

//COMPONENTES
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import Sidebar from '../../components/SideBar/Sidebar';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.currentUser.accessToken);
	//Buscamos todos los productos creados
	useEffect(() => {
		dispatch(getAllProducts(token));
	}, []);

	const products = useSelector((state) => state.allProducts);

	return (
		<Grid container direction='row' className={style.container}>
			<Sidebar />
			{products ? (
				<ProductsContainer products={products} token={token} />
			) : null}
		</Grid>
	);
};
export default Home;
