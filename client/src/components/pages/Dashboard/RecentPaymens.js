import React from 'react'
import Data from "../../common/dashboardData.json"

const RecentPaymens = () => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Recent Payments</h4>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="border-top-0">CUSTOMER NAME</th>
                                    <th className="border-top-0">INVOICE</th>
                                    <th className="border-top-0">DATE</th>
                                    <th className="border-top-0">AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Data["payments"].map(item => (
                                    <PaymentRow item={item} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentPaymens

const PaymentRow = ({item}) => {
    return(
        <tr>
            <td className="txt-oflo">{item.customerName}</td>
            <td className="txt-oflo">{item.invoice}</td>
            <td className="txt-oflo">{item.date}</td>
            <td><span className="font-medium">{item.amount}</span></td>
        </tr>
    )
}