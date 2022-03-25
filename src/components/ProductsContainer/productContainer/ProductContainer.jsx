import { useNavigate } from 'react-router-dom';
import baseURL from '../../../config/baseUrl';

//COMPONENTES
import {notifyError, notifySuccess} from '../../../utils/notifications'
import { Button, SvgIcon } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import style from './ProductContainer.module.scss';

const ProductContainer = ( {id, title, price, stock, sales, discount, token} )=>{
      const navigate = useNavigate()
      const titleEdit = title.slice(0, 30)

      const deleteItem = ()=>{
            baseURL.delete(`admin/product/${id}`,{
                  headers:{
                        token
                  }
            })
            .then( res => notifySuccess(res.data.success))
            .catch(err => notifyError(err.response.data.error))
      }

      return(
            <div key={id} className={style.container} >
                  <h1 className={style.txt}> {titleEdit } </h1>
                  <h1 className={style.txt}> $ {price} </h1>
                  <h1 className={style.txt}> {stock} </h1>
                  <h1 className={style.txt}> {sales} </h1>
                  <h1 className={style.txt}> %{discount} </h1>

                  <div className={style.buttonContainer}>
                        <Button className={style.btn_home} variant='contained' color='error' onClick={ deleteItem }>
                              <DeleteIcon />
                        </Button>
                        <Button className={style.btn_home} variant='contained' color='success' onClick={()=>  navigate(`/product/${id}`)}>
                              <EditIcon />
                        </Button>

                  </div>
            </div>
      )
}

export default ProductContainer;