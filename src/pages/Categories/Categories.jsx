import style from './Categories.module.scss';
import baseURL from '../../config/baseUrl';

//COMPONENTES
import SideBar from '../../components/SideBar/Sidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = ()=>{
      const navigate = useNavigate();
      const [categories, setCategories] = useState([]);
      const token = useSelector(state => state.currentUser.accessToken);

      useEffect(async ()=>{
            await baseURL.get('category')
            .then( res => {
                  setCategories(res.data)
            })
            .catch(err => notifyError(err.response.data.error));

            
      }, []);

      const handlerSubmit = (event) =>{
            event.preventDefault();
            const name = document.querySelector('#name').value;
            baseURL.post('admin/categories/create', { name }, {
                  headers:{ token }
            })
            .then(res => notifySuccess(res.data.success))
            .catch(err => notifyError(err.response.data.error))
      };

      return (
            <div className={style.container}>
                  <SideBar/>

                  <div className={style.categoriesContainer}>

                        <div className={style.title}>
                              <h1>Name</h1>
                              <h1>Products</h1>
                        </div>

                        <div className={style.categories}>
                              {categories.length ? categories.map(item =>{
                                    return <div key={item.id} className={style.category} onClick={ ()=> navigate(`/category/${item.id}`)}>
                                          <h2>{item.name}</h2>
                                          <h2>{item.products}</h2>
                                          <Button 
                                                variant='contained' 
                                                color='error'
                                                onClick = { ()=> {
                                                      baseURL.delete(`admin/categories/${item.id}` , {headers:{token}}) 
                                                      .then(res => notifySuccess(res.data.success))
                                                      .catch(err => notifyError(err.response.data.error))
                                                }}
                                          > <DeleteIcon/> </Button>
                                    </div>
                              }) : ''}
                        </div>

                  </div>

                  <div className={style.formCreateCategory}>
                        <h1>Crear una categoria</h1>
                        <form onSubmit={ handlerSubmit }>
                              <TextField
                                    label='name'
                                    id='name'
                              />
                              <Button type='submit' variant='contained'>Crear</Button>
                        </form>
                  </div>

            </div>
      )
}
export default Categories;