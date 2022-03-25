import React, {useState, useEffect, useContext} from 'react';
import { 
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader
  } from '@react-google-maps/api';
import { useParams } from 'react-router-dom'
import { authContext } from '../providers/Authprovider'
import MapStyles from './MapStyles'
import axios from 'axios';


const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const mapContainerStyle = {
  width: '550px',
  height: '300px'
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

export default function Map() {
  const [catLocation, setCatLocation] = useState({})
  const [infoBox, setInfoBox] = useState();
  // const { user } = useContext(authContext);
  const { id } = useParams();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey
  })

  useEffect(() => {
    axios.get(`http://localhost:3001/api/catforms/${id}`)
      .then((resFromDB) => {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${resFromDB.data.last_seen_postal_code}&key=${googleMapsApiKey}`)
      // REMOVE THE KEY WHEN WE CLEAN UP THE CODE
       .then((respFromGoogleMaps) => {
         setCatLocation(respFromGoogleMaps.data.results[0].geometry.location);
       })
       .catch(err => console.log(err))
       
       })
       .catch(error => {
           console.error('There was an error!', error);
     });
   }, [id])
    


  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={catLocation}
        zoom={15}
        options={options} 
        >
        <Marker 
          position={catLocation}
          // onClick={() => {
          //   setInfoBox([pending]);
          // }}
          icon={{
            url: `https://cdn-icons-png.flaticon.com/512/1687/1687095.png`,
            scaledSize: new window.google.maps.Size(60, 60),
          }}
         > 
          {/* <InfoWindow
              onCloseClick={() => {
                setInfoBox(null);
              }}
              visible={showInfoWindow}
              style={styles.infoWindow}
              >
                <div >
                  <p style={{color: 'red'}}>TESTTTTTTTTTTTTTTT</p>
                </div>
            </InfoWindow> */}
        </Marker>
    
        <></>
      </GoogleMap>
      </div>
  ) : <></>
};



