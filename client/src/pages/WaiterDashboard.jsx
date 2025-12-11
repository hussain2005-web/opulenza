import React from 'react';

const WaiterDashboard = () => {
    return (
        <div>
            <h1>Waiter Dashboard</h1>
            <div className="grid grid-cols-2">
                <div className="glass-panel p-4" style={{ padding: '20px' }}>
                    <h3>Active Tables</h3>
                    <p>Table management interface goes here...</p>
                    {/* Placeholder for table status and orders */}
                </div>
                <div className="glass-panel p-4" style={{ padding: '20px' }}>
                    <h3>Order Management</h3>
                    <p>Create and track orders...</p>
                </div>
            </div>
        </div>
    );
};

export default WaiterDashboard;
