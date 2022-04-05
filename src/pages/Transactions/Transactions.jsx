import style from './Transactions.module.scss'
import { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar/Sidebar';
import baseURL from '../../config/baseUrl';
import TransactionContainer from './transactionContainer/TransactionContainer';

const Transactions = ()=>{
      const [complete, setComplete] = useState([]);
      const [process, setProcess] = useState([]);
      const [canceled, setCanceled] = useState([]);

      useEffect(async ()=>{
            await baseURL.get('/transaction?state=complete')
            .then( res => setComplete(res.data) );

            await baseURL.get('/transaction?state=process')
            .then( res => setProcess(res.data) );

            await baseURL.get('/transaction?state=canceled')
            .then( res => setCanceled(res.data) );
      },[])

      return (
            <div className={style.container}>
                  <Sidebar/>
                  <div className={style.transaction}>
                        <TransactionContainer transaction={complete} type={'Complete'}/>
                        <TransactionContainer transaction={process} type={'Process'}/>
                        <TransactionContainer transaction={canceled} type={'Canceled'}/>
                  </div>
            </div>
      )
}
export default Transactions;