import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './Pages/About';
import CommentSection from './components/CommentSection';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MyPage from './Pages/MyPage';
// import useApplicationData from './hooks/useApplicationData';
// import users from './components/users';
import Navbar from './components/Navbar';
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import ReportPet from './Pages/ReportPet';
import SearchPet from './Pages/SearchPet';
import SignUp from './Pages/SignUp';
import SubmitForm from './components/SubmitForm';
import Map from './components/Map';
import PostDetail from './Pages/PostDetail';
import Confirmation from './components/Confirmation';


export default function App() {
    return (
      <BrowserRouter>
        <Navbar />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/report-pet" element={<ReportPet />}> 
                <Route path="/report-pet/submit-form" element={<SubmitForm />}/>
              </Route>
              <Route path="/search-pet" element={<SearchPet />}/>
              <Route path="/sign-up" element={<SignUp/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/comments" element={<CommentSection/>} />
              <Route path="/mypage/:id" element={<MyPage />} />
              <Route path="/map" element={<Map />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/confirmation/:id" element={<Confirmation />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
              <Footer/>
      </BrowserRouter>     
    );
}