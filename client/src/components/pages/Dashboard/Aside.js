import React from 'react'
import Data from "../../common/dashboardData.json"
import { Link } from 'react-router-dom'

const Aside = () => {
   
    return (
        <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        {Data["aside-menu"].map(item => (
                            <MenuList item={item} />
                        ))}
                    </ul>
                </nav>
            </div>
    )
}

export default Aside

const MenuList = ({item}) => {
    const tab = "Dashboard";
    return(
        <li className={tab == item.name?"sidebar-item selected":"sidebar-item"}>
            <Link to={item.link} className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
                <i className={item.icon}></i>
                <span className="hide-menu">{item.name}</span>
            </Link>
        </li>
    )
}