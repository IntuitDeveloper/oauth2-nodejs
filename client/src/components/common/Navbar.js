import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <main>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#FAFBFF', borderBottom:'1px solid hsla(0,0%,84.7%,.2)'}}>
    <Link to="#" className="navbar-brand d-lg-none" ><img src="https://codingyaar.com/wp-content/uploads/logo.png"/></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbarToggler7"
        aria-controls="myNavbarToggler7" aria-expanded="true" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="myNavbarToggler7">
        <ul className="navbar-nav mx-auto pull-left">
            <li className="nav-item" style={{paddingRight:'20px'}}>
                <Link to="#" className="nav-link" >Why Us</Link>
            </li>
            <li className="nav-item" style={{paddingRight:'20px'}}>
                <Link to="#" className="nav-link" >Solutions</Link>
            </li>
			 <li className="nav-item" style={{paddingRight:'45px'}}>
                <Link to="#" className="nav-link" >Pricing</Link>
            </li>
			</ul>
            <Link to="#" to="#" className="d-none d-lg-block"  style={{paddingLeft: "70px",paddingRight: "70px"}}><img src="https://codingyaar.com/wp-content/uploads/logo.png"/></Link>
        <ul className="navbar-nav mx-auto pull-right">           
		   <li className="nav-item" style={{paddingLeft:"45px"}}>
                <Link to="/login" className="nav-link" href="signin.html">Sign In</Link>
            </li>
            <li className="nav-item" style={{paddingLeft:"20px"}}>
                <Link to="#" className="nav-link" >Create Free Account</Link>
            </li>
        </ul>
    </div>
</nav>
        </main>
    )
}

export default Navbar
