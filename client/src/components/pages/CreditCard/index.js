import React,{useEffect} from 'react'
import Aside from '../../common/Aside'
import Navbar from "../../common/DashbpardNavbar"

const CreditCard = () => {

    return (
        <>
  
            <body className="admin">
                <Navbar />
                <div class="container-fluid">
                    <div class="row">
                        <Aside page="credit-card" />
                        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                            TODO
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

export default CreditCard
