import React,{useEffect} from 'react'
import Aside from './Aside'
import Breadcrumb from './Breadcrumb'
import Navbar from "./Navbar"
import RecentPaymens from './RecentPaymens'

const Dashboard = () => {

    return (
        <>
  
            <body className="admin">
                <Navbar />
                <div class="container-fluid">
                    <div class="row">
                        <Aside />
                        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <Breadcrumb />
                            <canvas class="my-4 w-100" id="myChart" width="900" height="380" style={{backgroundColor: "#fff"}}></canvas>
                                <RecentPaymens />
                            <footer class="footer text-center">
                                All Rights Reserved.
                            </footer>
                        </main>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Dashboard
