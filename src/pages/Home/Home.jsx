import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions';

//COMPONENTES
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import Sidebar from '../../components/SideBar/Sidebar';
import { Box } from '@mui/material';

const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts);
	const token = useSelector((state) => state.currentUser.accessToken);

	//Buscamos todos los productos creados
	useEffect(() => {
		dispatch( getAllProducts() );
	}, []);

	return (
		<Sidebar title='Inicio'>
				<Box>
					{products ? (
						<ProductsContainer products={products} token={token} />
					) : null}
				</Box>
	
			</Sidebar>

	);
};
export default Home;
