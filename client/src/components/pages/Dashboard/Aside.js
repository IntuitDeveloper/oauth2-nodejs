import React from 'react'
import Data from "../../common/dashboardData.json"
import { Link } from 'react-router-dom'

const Aside = () => {
   
    return (
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    {Data["aside-menu"].map(item => (
                        <MenuList item={item} />
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Aside

const MenuList = ({item}) => {
    return(
        <li className="nav-item">
            <Link to={item.link} className="nav-link active" aria-current="page">
              <span className="icon"><i className={item.icon}></i></span>
              {item.name}
            </Link>
        </li>
    )
}