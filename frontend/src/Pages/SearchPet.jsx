import React, {useState} from 'react'
import SearchForm from '../components/SearchForm'
import DisplayCats from '../components/DisplayCats'
// import '../SearchForm.scss'

import './SearchPet.scss'


export default function ReportPet() {
  const [apples, setApples] = useState([])


  const styleObj ={
    fontSize: 35,
    textAlign: 'center',
    paddingTop: 10,
  }

  return (
    <div className='searchpet'>
      <div className='searchTitle'>
      <h1>Lost and Found Cats</h1>
      <h4> Search lost and found cats in your area</h4>
      </div>
      <div id='searchForm'>
        <SearchForm onApples={setApples}/>
      </div>
      <div className="search-text" style={styleObj}>Search Result List</div>
      <div id="search-result-list">
        <DisplayCats apples={apples}/>
        
      </div>
    </div>
  )
}
