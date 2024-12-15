import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Contact from '../../components/ContactUs.jsx/Contact';
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className='conA'>
        <Header/>
        <div style={{flex:"1" ,marginTop:"0%"}}>
        <Contact/>
        </div>
        <Footer/>
    </div>
  )
}

export default ContactUs