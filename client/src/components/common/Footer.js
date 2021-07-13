import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <footer class="container py-5">
  <div class="row">
    <div class="col-12 col-md">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
      <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
    </div>
	<div class="col-6 col-md">
      <h5>Work With Us</h5>
      <ul class="list-unstyled text-small">
        <li><Link to="#" class="link-secondary">Pricing</Link></li>
        <li><Link to="#" class="link-secondary">Investor Inquiries</Link></li>
        <li><Link to="#" class="link-secondary">ISO Solutions</Link></li>
        <li><Link to="#" class="link-secondary">Support Desk</Link></li>
		<li><Link to="#" class="link-secondary">Contact Us</Link></li>
      </ul>
    </div>
    <div class="col-6 col-md">
      <h5>Features</h5>
      <ul class="list-unstyled text-small">
        <li><Link to="#" class="link-secondary" href="#">Payment Terminal</Link></li>
        <li><Link to="#" class="link-secondary" href="#">eInvoicing</Link></li>
        <li><Link to="#" class="link-secondary" href="#">Surcharging</Link></li>
        <li><Link to="#" class="link-secondary" href="#">Customer Vault</Link></li>
        <li><Link to="#" class="link-secondary" href="#">Subscription Management</Link></li>
        <li><Link to="#" class="link-secondary" href="#">Credit Card Processing</Link></li>
      </ul>
    </div>
    
    
    <div class="col-6 col-md">
      <h5>Company</h5>
      <ul class="list-unstyled text-small">
        <li><Link to="#" class="link-secondary" href="#">About Us</Link></li>
        <li><Link to="#" class="link-secondary" href="#">FAQs</Link></li>
        <li><Link to="#" class="link-secondary" href="#">Blog</Link></li>
		<li><Link to="#" class="link-secondary" href="#">PCI Compliance</Link></li>
        <li><Link to="#" class="link-secondary" href="#">Privacy</Link></li>
        <li><Link to="#" class="link-secondary" href="#">Terms</Link></li>
      </ul>
    </div>
  </div>
</footer>
    )
}

export default Navbar
