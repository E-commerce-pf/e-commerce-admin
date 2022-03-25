import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from "../../config/baseUrl";
import style from './Category.module.scss';
import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
import Sidebar from "../../components/SideBar/Sidebar";
import { useSelector } from "react-redux";

const Category = ()=>{
      const {id} = useParams();
      const [products, setProducts] = useState([]);
      const token = useSelector(state => state.currentUser.accessToken)

      useEffect(()=>{
            baseURL.get(`category/${id}`)
            .then(res =>{
                  console.log(res.data)
                  setProducts(res.data.products)
            })
      },[])


      return(
            <div className={style.container}>
                  <Sidebar/>
                  <ProductsContainer products={products} token={token}/> 
            </div>
      )
}

export default Category;