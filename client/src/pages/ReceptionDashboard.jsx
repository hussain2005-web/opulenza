import React from 'react';

const ReceptionDashboard = () => {
    return (
        <div>
            <h1>Reception Dashboard</h1>
            <div className="grid grid-cols-2">
                <div className="glass-panel p-4" style={{ padding: '20px' }}>
                    <h3>Room Status</h3>
                    <p>Room availability and booking calendar...</p>
                </div>
                <div className="glass-panel p-4" style={{ padding: '20px' }}>
                    <h3>Guest Check-in/Out</h3>
                    <p>Manage guest arrivals and departures...</p>
                </div>
            </div>
        </div>
    );
};

export default ReceptionDashboard;
