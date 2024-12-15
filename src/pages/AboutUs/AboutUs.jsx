import React from 'react'
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import About from '../../components/About/About';
import "./AboutUs.css";
// import TermsOfService from '../TermsOfService/TermsOfService';

// import p4 from "../../Assets/p4.png";
function AboutUs() {
  return (
    <div className="bodyAbout">
      <Header/>
      <div className='about'>
      <About/>
      </div>
      <Footer/>
    </div>
  
  );
}

export default AboutUs;