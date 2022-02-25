import React from 'react'
import { Carousel} from 'antd';
import './Carousel.scss'

import streetCat from './images/streetCat2525.jpg'
import siameseCat from './images/siameseCat.jpg'
import blackCat from './images/blackCat2525.jpg'
import pokeCat from './images/pokeCat1.jpg'

import walidCat from './images/walidCat25.jpeg'


export default function CarouselTest (){


    return (
      <div className='catPhotos'>
        <Carousel autoplay>

          <div className='photo'>
            <img src={pokeCat} alt="Grey Cat laying down"
            // width="100%" height="850"
            />
          </div>

          <div className='photo'>
            <img src={blackCat} alt="Blue Eyed Cat"
            // width="100%" height="850"
            />
          </div>
          
          <div className='photo'>
            <img src={streetCat} alt="Multi Colour Cat"
            // width="100%" height="850"
            />
          </div>
          
          <div className='photo'>
            <img src={siameseCat} alt="Cat in Grass"
            // width="100%" height="850"
            />
          </div>

          <div className='photo'>
            <img src={walidCat} alt="Striped Cat"
            // width="100%" height="850"
            /> 
          </div>
        </Carousel>
      </div>
  

    );
}

