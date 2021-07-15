import React from 'react'

const Revenue = () => {
    return (
        <div className="row">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Revenue History: $500.00</h4>
                                <div className="sales ct-charts mt-3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-1">June Revenue</h5>
                                <h3 className="font-light">$769.08</h3>
                                <div className="mt-3 text-center">
                                    <div id="earnings"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-0">Users</h4>
                                <h2 className="font-light">35,658 <span className="font-16 text-success font-medium">+23%</span>
                                </h2>
                                <div className="mt-4">
                                    <div className="row text-center">
                                        <div className="col-6 border-right">
                                            <h4 className="mb-0">58%</h4>
                                            <span className="font-14 text-muted">New Users</span>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="mb-0">42%</h4>
                                            <span className="font-14 text-muted">Repeat Users</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Revenue
