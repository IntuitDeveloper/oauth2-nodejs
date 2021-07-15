import React, {useState} from 'react'
import UserImage from "../../../assets/images/1.jpg"
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [searchText, setSearchText] = useState('');

    return (
            <nav className="navbar top-navbar navbar-expand-md navbar-light">
                <div className="navbar-header" data-logobg="skin5">
                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                        <i className="ti-menu ti-close"></i>
                    </a>
                    <div className="navbar-brand">
                            <span className="logo-text" style={{paddingLeft: "18px",fontSize: "1.5rem"}}>Company Admin
                            </span>
                       <a className="sidebartoggler d-none d-md-block" href="javascript:void(0)" data-sidebartype="mini-sidebar">
                            <i className="mdi mdi-toggle-switch font-20 mdi-toggle-switch-off"></i>
                        </a>
                    </div>
                    
                </div>
                <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin6">
                    <ul className="navbar-nav float-start me-auto">
                        <li className="nav-item search-box">
                            <a className="nav-link waves-effect waves-dark" href="javascript:void(0)">
                                <div className="d-flex align-items-center">
                                    <i className="mdi mdi-magnify font-20 me-1"></i>
                                    <div className="ms-1 d-none d-sm-block">
                                        <span>Search</span>
                                    </div>
                                </div>
                            </a>
                            <form className="app-search position-absolute">
                                <input
                                 type="text" 
                                 className="form-control" 
                                 placeholder="Search &amp; enter" 
                                 value={searchText != ''?searchText:null}
                                 onChange={e => setSearchText(e.target.value)}
                                 onChange={e => {setSearchText(e.target.value);console.log(e.target.value)}}
                                 />
                                <a className="srh-btn">
                                    <i className="ti-close"></i>
                                </a>
                            </form>
                        </li>
                    </ul>
                    <ul className="navbar-nav float-end">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={UserImage} alt="user" className="rounded-circle" width="31" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end user-dd animated" aria-labelledby="navbarDropdown">
                                <Link to="/profile" className="dropdown-item"><i className="ti-user me-1 ms-1"></i>
                                    My Profile</Link>
                                <Link to="/" className="dropdown-item"><i className="ti-wallet me-1 ms-1"></i>
                                    My Balance</Link>
                                <Link to="#" className="dropdown-item"><i className="ti-email me-1 ms-1"></i>
                                    Inbox</Link>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar
