import React from 'react'
import { Link } from 'react-router-dom'
import data from "./homePageData.json"

const Navbar = () => {
    return (
        <footer class="container py-5">
        <div class="row">
          <div class="col-12 col-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
            <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
          </div>
        {data["footer-column"].map(item => (
          <FooterColumn item={item} key={item.head} />
        ))}
        </div>
</footer>
    )
}

export default Navbar

const FooterColumn = ({item}) => {
  return(
    <div class="col-6 col-md">
      <h5>{item.head}</h5>
      <ul class="list-unstyled text-small">
          {item.lists.map(list => (
            <FooterColumnList list={list} key={list.name} />
          ))}
      </ul>
    </div>
  )
}

const FooterColumnList = ({list}) =>{
  return(
        <li><Link to={list.link} class="link-secondary">{list.name}</Link></li>
  )
}