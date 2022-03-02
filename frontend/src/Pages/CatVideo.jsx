import React from "react";
import { Link } from 'react-router-dom'
import { Button } from "../components/Button";
import './CatVideo.scss';
import mixCat from "./video/mixCat.mp4";

export default function CatVideo() {
  
  return (
    <div className='hero-container'>
      <video autoPlay loop muted>
      <source src={mixCat} type='video/mp4'/>
      </video>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='hero-btns1'>
        <Link to='/about'>
        <Button
          className='btns'
          buttonStyle='btn1--outline1'
          buttonSize='btn1--large1'
        >
          HOW IT WORKS
        </Button>
        </Link>
        &ensp;
        <Link to='/search-pet'>
        <Button
          className='btns'
          buttonStyle='btn1--outline1'
          buttonSize='btn1--large1'
        >
          
          LOST/FOUND <i class="fas fa-search"></i>
        </Button>
        </Link>
        &ensp;
        <Link to='/report-pet'>
        <Button
          hover
          className='btns'
          buttonStyle='btn1--primary1'
          buttonSize='btn1--large1'
          onClick={console.log('hey')}
        >
          REPORT YOUR CAT <i class="far fa-flag"></i>
        </Button>
        </Link>
      </div>
    </div>
    
  )
}

