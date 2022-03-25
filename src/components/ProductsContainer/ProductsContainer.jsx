import { useState } from "react";
import ProductContainer from "./productContainer/ProductContainer";
import style from './ProductsContainer.module.scss';

const pageSize = 10 // Para cambiar el tamaño del paginado

const ProductsContainer = ({products, token})=>{
      const [page, setPage] = useState(0);

      console.log(products)
      return (
            <div className={style.tablecontainer}>

                        <h1>Total productos : {products.length} </h1>
                        <div className={style.categories}>
                              <h1>TITLE</h1>
                              <h1>PRICE</h1>
                              <h1>STOCK</h1>
                              <h1>SALES</h1>
                              <h1>DISCOUNT</h1>
                        </div>
                        <div className={style.productContainer}>
                              {products?.slice(page*pageSize,(page+1)*pageSize).map((item,index)=>{
                                    return <ProductContainer
                                          id = {item.id} 
                                          title = {item.title}
                                          price = {item.price}
                                          stock = {item.stock}
                                          sales = {item.sales}
                                          discount = {item.discount}
                                          token={token}
                                    />
                              })}
                        </div>

                        <div className={style.pag}>
                              <button type='button' onClick={()=>{
                                    if(page>0) setPage(page-1);
                              }}>
                                    Previous
                              </button>
                              <button type='button' onClick={()=>{
                                    if((page+1) * pageSize < products.length) setPage(page+1);
                              }}>
                                    Next
                              </button>
                        </div>
                  </div>
      )

}

export default ProductsContainer;