import React from 'react'
import Data from "./dashboardData.json"
import { Link } from 'react-router-dom'

const Aside = ({page}) => {
   
    return (
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    {Data["aside-menu"].map(item => (
                        <MenuList item={item} page={page} />
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Aside

const MenuList = ({item,page}) => {
    return(
        <li className="nav-item">
            <Link to={`/${item.link}`} className={item.link === page?"nav-link active":"nav-link"} aria-current="page">
              <span className="icon"><i className={item.icon}></i></span>
              {item.name}
            </Link>
        </li>
    )
}