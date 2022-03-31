import { useEffect, useState } from "react";
import ImageCarrousel from "../components/imageCarrousel/ImageCarrousel";
import baseURL from '../config/baseUrl';


const Test = ()=>{
      const [products, setProducts] = useState([])

      useEffect( async ()=>{
            await baseURL.get('/product')
            .then(res => {
                  setProducts(res.data);
            })
      },[])

      console.log(products)
      return (
            <div>
                  { products.length ? <ImageCarrousel images={products[0].image}/>
                  :
                  ''
                  }
            </div>
      )
}

export default Test;