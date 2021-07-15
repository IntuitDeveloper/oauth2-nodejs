import React,{useEffect} from 'react'
import Aside from './Aside'
import Breadcrumb from './Breadcrumb'
import Navbar from "./Navbar"
import RecentPaymens from './RecentPaymens'
import Revenue from './Revenue'
// import "../../../assets/css/style.min.css"
import $ from "jquery";

const Dashboard = () => {
    // if(window.location.pathname === "/dashboard"){
    //     require("../../../assets/css/style.min.css")
    // }

        // useEffect(()=>{
        //     var loadScript = function (src) {
        //         var tag = document.createElement('script');
        //         tag.async = false;
        //         tag.src = src;
        //         var body = document.getElementsByTagName('body')[0];
        //         body.appendChild(tag);
        //       }
        //       loadScript(`${process.env.PUBLIC_URL}/assets/libs/custom.min.js`);
              
        // },[])
    return (
        <div>
            {/* <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos"></div>
                    <div className="lds-pos"></div>
                </div>
            </div> */}
            <div id="main-wrapper" data-navbarbg="skin6" data-theme="light" data-layout="vertical" data-sidebartype="full" data-boxed-layout="full">
                <header className="topbar" data-navbarbg="skin6">
                    <Navbar />
                </header>
                <aside className="left-sidebar" data-sidebarbg="skin5">
                    <Aside />
                </aside>
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <Breadcrumb />
                    </div>
                    <div className="container-fluid">
                        <Revenue />
                        <RecentPaymens />
                    </div>
                    <footer className="footer text-center">
                        All Rights Reserved.
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
