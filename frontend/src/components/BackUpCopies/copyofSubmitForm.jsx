// import React, { useState } from 'react';
// import Axios from 'axios';

// import './SubmitForm.scss'

// // import { Button } from './Button';
// import Row from 'react-bootstrap/Row'
// // import InputGroup from 'react-bootstrap/InputGroup'
// // import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// // import Feedback from 'react-bootstrap/Feedback'



// export default function SubmitForm(props) {
//   const url = "http://localhost:3000/report-pet"
//   // const [validated, setValidated] = useState(false);
//   const [data, setData] = useState({
//     description: '',  
//     image: '',
//     cat_name: '',
//     gender: '',
//     last_seen_date: '',
//     last_seen_address: '',
//     last_seen_city: '',
//     last_seen_postal_code: '',
//     state: '',
//     // date_posted:Date.now()
//   })

//   function handle(event) {
//     const newdata = {...data}
//     newdata[event.target.id] = event.target.value
//     setData(newdata)
//     console.log(newdata)
//   }

//   function submit(event) {
//     event.preventDefault();
//     Axios.post(url, {
//       description: data.description,  
//       image: data.image,
//       cat_name: data.cat_name,
//       gender: data.gender,
//       last_seen_date: data.last_seen_date,
//       last_seen_address: data.last_seen_address,
//       last_seen_city: data.last_seen_city,
//       last_seen_postal_code: data.last_seen_postal_code,
//       status: data.status
//     })
//     .then(res => {
//         console.log(res.data)
//     })
//   }

//   // const handleSubmit = (event) => {
//   //   const form = event.currentTarget;
//   //   if (form.checkValidity() === false) {
//   //     event.preventDefault();
//   //     event.stopPropagation();
//   //   }

//   //   setValidated(true);
//   // };

//   return (

//     <Form noValidate  onSubmit={(event) => submit(event)}>

//       <section className="submit-form">

//       <Row className="mb-3">
        
//         <Form.Group controlId="formFile" className="mb-3">
//           <Form.Label> UPLOAD A PICTURE HERE </Form.Label>
//           <Form.Control type="file" />
//         </Form.Group>
        
//         <Form.Group>
//           <Form.Label> Description </Form.Label>
//         <Form.Control as='textarea' row={3} md="4" id="description" onChange={(e) => handle(e)} value={data.description} type="text" placeholder="Description"/>
//           <Form.Text id="description" className="text-under" muted>
//             Please include as much information as well such as any habits, scars or unique attributes the cat has that would be noticeable.
//           </Form.Text>
//         </Form.Group>
        
//         <Form.Group>
//           <Form.Label> Cat's Name</Form.Label>
//         <Form.Control id="cat_name" onChange={(e) => handle(e)} value={data.cat_name} type="text" placeholder="Cat's Name"/>
//         </Form.Group>
        
//         <Form.Group>
//           <Form.Label> Gender </Form.Label>
//         <Form.Control  md="4" id="gender" onChange={(e) => handle(e)} value={data.gender} type="text" placeholder="Gender"/>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label> Last Seen Date </Form.Label>
//         <Form.Control  md="4" id="last_seen_date" onChange={(e) => handle(e)} value={data.last_seen_date} type="date" placeholder="Last Seen Date"/>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label> Last Seen Address </Form.Label>
//         <Form.Control  md="4" id="last_seen_address" onChange={(e) => handle(e)} value={data.last_seen_address} type="address" placeholder="Address"/>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label> City </Form.Label>
//         <Form.Control  md="4" id="last_seen_city" onChange={(e) => handle(e)} value={data.last_seen_city} type="text" placeholder="City"/>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label> Postal Code </Form.Label>
//         <Form.Control  md="4" id="last_seen_postal_code" onChange={(e) => handle(e)} value={data.last_seen_postal_code} type="text" placeholder="Postal Code"/>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label> Pet Status </Form.Label>
//         <Form.Control  md="4" id="status" onChange={(e) => handle(e)} value={data.status} type="text" placeholder="Pet Status"/>
//         </Form.Group>

    
//       </Row>
      
//       <Button onClick={submit} type="submit">Submit form</Button>
//       </section>
//     </Form>
    
//   );
// }

// // render(<Form />);
