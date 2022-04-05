import style from './TransactionContainer.module.scss';
import { Button } from '@mui/material';
import baseURL from '../../../config/baseUrl';
import { notifyError, notifySuccess } from '../../../utils/notifications';
import { useNavigate } from 'react-router-dom';

//ICONOS
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';


const TransactionContainer = ( {transaction, type} )=>{
      const navigate = useNavigate();
      const aproveTransaction = async (id)=>{
            await baseURL.get(`/payment/capture/${id}`)
            .then(res => notifySuccess(res.data.success))
            .catch( err => notifyError(err.response.data.error))
      }

      const cancelTransaction = async (id)=>{
            baseURL.get(`/payment/cancel/${id}`)
            .then(res => notifySuccess(res.data.success))
            .catch(err => notifyError(err.response.data.error))
      }

      return(
            <div className={style.container}>
                  <h2>{type}</h2>
                  <div className={style.title}>
                        <h2>State</h2>
                        <h2>Name</h2>
                        <h2>Last Name</h2>
                        <h2>City</h2>
                        <h2>Address</h2>
                        <h2>Amount</h2>
                        <h2>Products</h2>
                  </div>
                  {transaction ? transaction.map(item =>{
                        return <div className={style.transaction}>
                              <div className={style.data} onClick={()=> navigate(`/viewtransaction/${item.id}`)}>
                                    <h4>{item.state}</h4>
                                    <h4>{item.User.name}</h4>
                                    <h4>{item.User.lastName}</h4>
                                    <h4>{item.User.city ? item.User.city : 'None' }</h4>
                                    <h4>{item.User.address ? item.User.address : 'None'}</h4>
                                    <h4>{item.cart.totalPrice} </h4>
                                    <h4>{item.cart.productsInCart.length} </h4>
                              </div>

                                    {type === 'Process' ? 
                                          <div className={style.buttons}>
                                                <Button variant='contained' onClick={() => aproveTransaction(item.id) }>
                                                      <CheckIcon/>
                                                </Button>

                                                <Button variant='contained' onClick={() => cancelTransaction(item.id)}>
                                                      <CancelIcon/>
                                                </Button>
                                          </div>

                                          : null
                                    }
                        </div>
                  }) 
                  : null}
            </div>
      )
}

export default TransactionContainer;