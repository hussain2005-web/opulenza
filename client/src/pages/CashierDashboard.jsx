import React from 'react';

const CashierDashboard = () => {
    return (
        <div>
            <h1>Billing & Cashier</h1>
            <div className="glass-panel p-4" style={{ padding: '20px' }}>
                <h3>Pending Bills</h3>
                <p>List of open bills for tables and rooms...</p>
                {/* Placeholder for billing logic: merge/split */}
            </div>
        </div>
    );
};

export default CashierDashboard;
