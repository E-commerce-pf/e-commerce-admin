import React, { useEffect } from 'react';
import style from './ProductsContainer.module.scss';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import baseURL from '../../config/baseUrl';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { indigo } from '@mui/material/colors';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

//COMPONENTES
import { notifyError, notifySuccess } from '../../utils/notifications';

const theme = createTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: indigo[900],
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'title',
		numeric: false,
		disablePadding: true,
		label: 'Title',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
	},
	{
		id: 'sales',
		numeric: true,
		disablePadding: false,
		label: 'Sales',
	},
	{
		id: 'stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock',
	},
	{
		id: 'discount',
		numeric: true,
		disablePadding: false,
		label: 'Discount',
	},
];

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};
	return (
		<TableHead className={style.tablecontainer}>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						color='primary'
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const ProductsContainer = ({ token, products }) => {
	const EnhancedTableToolbar = (props) => {
		const { numSelected } = props;

		return (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity
							),
					}),
				}}
			>
				{numSelected > 0 ? (
					<Typography
						sx={{ flex: '1 1 100%' }}
						color='inherit'
						variant='subtitle1'
						component='div'
					>
						{numSelected} selected
					</Typography>
				) : (
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant='h6'
						id='tableTitle'
						component='div'
					>
						Lista de productos
					</Typography>
				)}

				{numSelected > 0 ? (
					<Tooltip title='Delete'>
						<IconButton onClick={deleteAll}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title='Filter list'>
						<IconButton>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</Toolbar>
		);
	};

	EnhancedTableToolbar.propTypes = {
		numSelected: PropTypes.number.isRequired,
	};

	const deleteItem = (id) => {
		baseURL
			.delete(`admin/product/${id}`, {
				headers: {
					token,
				},
			})
			.then((res) => {
				notifySuccess(res.data.success);
				setTimeout(() => {
					window.location.reload();
				}, 3500);
			})
			.catch((err) => notifyError(err.response.data.error));
	};

	const deleteAll = () => {
		selected.forEach((item) => {
			baseURL.delete(`admin/product/${item}`, { headers: { token } });
		});
	};

	const navigate = useNavigate();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			console.log(event.target.checked);
			const newSelecteds = products.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, title) => {
		const selectedIndex = selected.indexOf(title);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, title);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyProducts =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box>
				<Paper>
					<EnhancedTableToolbar numSelected={selected.length} />
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby='tableTitle'
							size={dense ? 'small' : 'medium'}
						>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={products.length}
							/>
							<TableBody>
								{/* if you don't need to support IE11, you can replace the `stableSort` call with:
				   				rows.slice().sort(getComparator(order, orderBy)) */}
								{stableSort(products, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((products, index) => {
										const isItemSelected = isSelected(products.title);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, products.title)}
												role='checkbox'
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={index}
												selected={isItemSelected}
											>
												<TableCell padding='checkbox'>
													<Checkbox
														color='primary'
														checked={isItemSelected}
														inputProps={{
															'aria-labelledby': labelId,
														}}
													/>
												</TableCell>
												<TableCell
													component='th'
													id={labelId}
													scope='row'
													padding='none'
												>
													{products.title}
												</TableCell>
												<TableCell className={style.price} align='right'>
													${products.price}
												</TableCell>
												<TableCell align='right'>{products.sales}</TableCell>
												<TableCell align='right'>{products.stock}</TableCell>
												<TableCell align='right'>{products.discount}</TableCell>
												<TableCell align='right'>
													<EditIcon
														onClick={() => navigate(`/product/${products.id}`)}
													/>
												</TableCell>
												<TableCell align='right'>
													<DeleteOutlineIcon
														onClick={() => deleteItem(products.id)}
													/>
												</TableCell>
											</TableRow>
										);
									})}
								{emptyProducts > 0 && (
									<TableRow
										style={{
											height: (dense ? 33 : 53) * emptyProducts,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={products.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
				<FormControlLabel
					control={<Switch checked={dense} onChange={handleChangeDense} />}
					label='Dense padding'
				/>
			</Box>
		</ThemeProvider>
	);
};

export default ProductsContainer;
