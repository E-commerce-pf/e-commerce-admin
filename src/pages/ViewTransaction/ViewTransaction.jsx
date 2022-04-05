import style from './ViewTransaction.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import baseURL from '../../config/baseUrl';
import { Button } from '@mui/material';

const ViewTransaction = ()=>{
      const {id} = useParams();
      const [transaction, setTransaction] = useState();
      useEffect(()=>{
            baseURL.get(`/transaction/${id}`)
            .then(res => setTransaction(res.data.transaction))
      },[]);

      return (
            <div className={style.container}>
                  <Button variant='contained' onClick={() => window.history.back()}>Back</Button>
                  {transaction ? <div>
                        <h1>State : {transaction.state}</h1>
                        <h2>Amount : {transaction.cart.totalPrice}</h2>
                        <h2>Products in Cart</h2>
                        {transaction.cart.productsInCart.map(item => {
                              return <div className={style.product}>
                                    <img src={item.product.image}/>
                                    <h3>{item.product.title}</h3>
                                    <h3>Price : $ {item.product.price}</h3>
                                    <h3>Quantity in Cart : {item.quantity}</h3>
                                    <h3>Avaible stock : {item.product.stock} </h3>
                              </div>
                        })}
                  </div>
                  : null      
            }
            </div>
      )
}

export default ViewTransaction;