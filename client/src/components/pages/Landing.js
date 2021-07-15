import React,{useEffect} from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import data from "../common/homePageData.json"

const Landing = () => {
    return (
        <div>
            <h1 className="visually-hidden">Heroes examples</h1>
            <Navbar/>
            <div className="container-main">
            <div className="container container-main col-xxl-8 px-4">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={process.env.PUBLIC_URL + '/images/company-website.png'} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">We offer better solutions for growing your business</h1>
                    <p className="lead">Get paid faster & easier with a suite of productivity tools designed for modern businesses. It's fast and free to sign up!</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Start Now Free</button>
                    
                    </div>
                    <h6><span style={{color: "#999999"}}>(No credit card required)</span></h6>
                </div>
                </div>
            </div>
            </div>
            <div className="container px-4 py-5 text-center" id="featured-3">
                <h1 className="display-4 fw-bold lh-1 mb-3">How it Works</h1>
                <p className="fs-5 how-text">Bill pay platform securely automates payments from your business to your vendors.</p>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                {data["how-it-works"].map((item) => (
                  <HowItWorks item={item} key={item.head} />
                ))}
            
            </div>
        </div>
        <div className="container">
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1 mb-3">Simplify Accounting.
No monthly fees.
Effortless solutions.</h1>
        <p className="lead">We strive to make getting paid easier & faster. We've built a powerful, yet easy-to-use solution that helps you, scale and grow your business - for free!</p>
         <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" className="btn btn-outline-secondary btn-lg px-4 me-md-2">Start Now Free</button>
          
        </div>
      </div>
      <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img className="rounded-lg-3" src={process.env.PUBLIC_URL + '/images/admin-dashboard-new.png'} alt="" width="720"/>
      </div>
    </div>
  </div>
  <div className="container px-4 py-5 text-center" id="featured-3">
    <h2 className="fw-bold lh-1">Our Clients</h2>
	
    <div className="row g-4 py-1 row-cols-1 row-cols-lg-6">
      {data["client-images"].map((item,index) => (
        <Clients item={item} key={index}/>
      ))}
    </div>
  </div>
    
<div className="container-main hero-img py-5" id="icon-grid">
 <div className="container px-4" id="icon-grid">
    <h2 className="pb-2 text-center py-5 fw-bold">Connect Your Payments to Your Accounting Software</h2>
 <div className="row">
  <div className="col-xl-4 text-center" >
              <img src={process.env.PUBLIC_URL + '/images/features-3.png'} className="img-fluid p-4" alt="" />
            </div>
			 <div className="col-xl-8 d-flex content">
			 <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-5">
      {data["connect-your-payments"].map(item => (
        <ConnectYourPayments item={item} key={item.head} />
      ))}
    </div>
			 </div>
 </div>
    
  </div>
  </div>
  <div className="bg-dark text-secondary px-4 py-5 text-center">
    <div className="py-5">
      <h1 className="display-5 fw-bold text-white">Get Register and save your time.</h1>
      <div className="col-lg-6 mx-auto">
        <p className="fs-5 mb-4">The best part? No monthly subscription fees.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        
          <button type="button" className="btn btn-outline-light btn-lg px-4">Get Started Free</button>
        </div>
      </div>
    </div>
  </div>

        <Footer/>

        </div>
    )
}

export default Landing


const HowItWorks = ({item}) => {
  console.log(item["data"])
  return(
  <div className="feature col">
      <div className="feature-icon bg-default bg-gradient">
      <span className="bi" width="1em" height="1em">{item.head}</span>
      </div>
      <h2 className="h2-color ">{item.data1}</h2>
      <p>{item.data2}</p>
  </div>
  )
}

const Clients = ({item}) => {
  return (
    <div className="feature col">
      <div className="feature-icon1 bg-default bg-gradient">
        <img src={`${process.env.PUBLIC_URL}/images/clients/${item.url}`} className="img-fluid" alt="client-image"/>
      </div>
    </div>
  )
} 

const ConnectYourPayments = ({item}) => {
  return (
    <div className="col d-flex align-items-start">
      <img src={`${process.env.PUBLIC_URL}/images/${item.icon}`} alt="" />
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="55" height="16" fill="currentColor" className="bi bi-wallet-fill" viewBox="0 0 16 16" style={{marginTop: "5px",marginRight: "6px"}}>
        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"/>
        <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"/>
      </svg> */}
      <div style={{marginLeft: "5px"}}>
        <h4 className="fw-bold mb-0">{item.head}</h4>
        <p>{item.data}</p>
      </div>
    </div>
  )
}