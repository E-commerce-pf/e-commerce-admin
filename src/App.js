import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Transactions from './pages/Transactions/Transactions';
import Users from './pages/Users/Users';
import Product from './pages/Product/Product';
import EditUser from './pages/Users/EditUser';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Categories from './pages/Categories/Categories';
import Category from './pages/Category/Category';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
				<Route path='/users' element={<Users />} />
				<Route path='/users/edit/:id' element={<EditUser />} />
				<Route path='/transactions' element={<Transactions />} />
				<Route path='/product/:id' element={<Product />} />
				<Route path='/create/product' element={<CreateProduct />} />
				<Route path='/categories' element={<Categories />} />
				<Route path='/category/:id' element={<Category />} />
			</Routes>
		</>
	);
};


export default App;
