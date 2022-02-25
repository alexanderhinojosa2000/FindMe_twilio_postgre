import React from 'react'
import { Card } from 'antd';
import "./DisplayCats.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export default function DisplayCats({ apples, cats }) {
  const { Meta } = Card;
  const displayInfo = () => {
    // const { apples } = props;

    if (apples.length > 0) {
      return (
        apples.map((setDetail, index) => {
          return (
            <>
              <div className="displayCat">
                <Link to={`/post/${setDetail.id}`}>
                  <Card
                    hoverable
                    style={{ width: 260 }}
                    cover={<img alt="example" src={setDetail.image} />}
                  >
                    <Meta title={setDetail.cat_name} description={setDetail.status} />
                    <br></br>
                    <p>Last Seen: <FontAwesomeIcon icon={faMapMarker} /> {setDetail.last_seen_city}</p>
                  </Card>
                </Link>
              </div>
            </>
          )
        })
      )
    } else {
      return (
        <div></div>
      )
    }
  }
  return (
    <>
      {displayInfo()}
    </>
  )
}
