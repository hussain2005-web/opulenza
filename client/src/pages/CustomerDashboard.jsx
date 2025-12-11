import React, { useState, useEffect } from 'react';
import MenuService from '../services/menuService';

const CustomerDashboard = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadMenu();
    }, []);

    const loadMenu = async () => {
        try {
            const res = await MenuService.getAll();
            setMenuItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const categories = ['all', 'main', 'dry', 'dessert', 'drinks', 'roti', 'rice'];

    const filteredItems = filter === 'all' ? menuItems : menuItems.filter(item => item.category === filter);

    return (
        <div>
            <h1>Menu & Ordering</h1>

            <div style={{ marginBottom: '20px', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '10px' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                        style={{ marginRight: '10px', textTransform: 'capitalize' }}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-3">
                {filteredItems.map(item => (
                    <div key={item.id} className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>{item.name}</h4>
                            <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${item.price}</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{item.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <small className="text-secondary">Size: {item.serving_size}{item.serving_unit}</small>
                            <button className="btn btn-primary" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>Add</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerDashboard;
