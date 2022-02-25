import React, { useEffect, useState, useContext } from 'react'
import CatFormItem from './CatFormItem'
import axios from 'axios';
import { authContext } from '../providers/Authprovider'
import Loading from "./Loading";

import './CatForms.scss'

export default function CatForms() {
  const { user } = useContext(authContext);
  const [catForms, setCatForms] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/catforms/user/${user.id}`)
      .then(res => {
        // const user = res.data.user;
        const catFormData = res.data.catForms;
        setCatForms(catFormData);
      })
      .catch (err => {
        console.log(err)
      })
    }, []);
    

  const catFormItems = catForms && catForms.map(catFormItem =>
    <CatFormItem
      key={catFormItem.id}
      id={catFormItem.id}
      name={catFormItem.cat_name}
      age={catFormItem.age}
      gender={catFormItem.gender}
      description={catFormItem.description}
      image={catFormItem.image}
      last_seen_date={catFormItem.last_seen_date}
    />
  )
  return (
    <div className='myCats'>
      <h2>My Cats</h2>
      <p>Manage lost and found cats</p>
      <ul>{catForms && catFormItems}</ul>
      <ul>{!catForms && <Loading />}</ul>
    </div>
  )
}