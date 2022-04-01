import { useState } from 'react';
import style from './ImageCarrousel.module.scss';

//COMPONENTES
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCarrousel = ( {images} )=>{
      const [currentImage, setCurrentImage] = useState(0);

      return (
            images ?
            <div className={style.container}>
                  <div className={style.carrousel} >
                        <button className={style.arrow} 
                        type='button'
                        disabled={ images.length > 0 ? false : true }
                        onClick = {()=> {
                              currentImage === 0 ? setCurrentImage(0) : setCurrentImage(currentImage - 1)
                        }}
                        >
                              <ArrowBackIosIcon/>
                        </button>

                        <img src={images[currentImage]}/>

                        <button className={style.arrow}
                        type='button'
                        disabled={ images.length > 0 ? false : true }
                        onClick={()=>{
                              currentImage === images.length -1 ? setCurrentImage(currentImage) : setCurrentImage(currentImage + 1)
                        }}
                        >
                              <ArrowForwardIosIcon/>
                        </button>
                  </div>
                  
                  <div className={style.paginate}>
                        {images.map( (item, index) =>{
                              return (
                                    <button
                                    type='button'
                                    className={style.paginateItem}
                                    onClick={() => setCurrentImage(index)}
                                    />
                              )
                        }) }
                  </div>
            </div>

            : null
      )
}
export default ImageCarrousel;