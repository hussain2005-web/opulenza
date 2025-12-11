import React, { useState, useEffect } from 'react';
import MenuService from '../services/menuService';

const AdminDashboard = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '', category: 'main', price: '', serving_size: '', serving_unit: 'g', description: '', is_available: 1
    });
    const [editingId, setEditingId] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await MenuService.update(editingId, newItem);
            } else {
                await MenuService.create(newItem);
            }
            setNewItem({ name: '', category: 'main', price: '', serving_size: '', serving_unit: 'g', description: '', is_available: 1 });
            setEditingId(null);
            loadMenu();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setNewItem(item);
        setEditingId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await MenuService.remove(id);
            loadMenu();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="grid grid-cols-2">
                <div className="glass-panel p-4" style={{ padding: '20px' }}>
                    <h3>Manage Menu Item</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
                        <div className="grid grid-cols-2" style={{ gap: '10px' }}>
                            <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                                <option value="main">Main Course</option>
                                <option value="dry">Dry Items</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="roti">Roti</option>
                                <option value="rice">Rice</option>
                            </select>
                            <input type="number" placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} required />
                        </div>
                        <div className="grid grid-cols-2" style={{ gap: '10px' }}>
                            <input type="text" placeholder="Size (e.g. 200)" value={newItem.serving_size} onChange={e => setNewItem({ ...newItem, serving_size: e.target.value })} />
                            <select value={newItem.serving_unit} onChange={e => setNewItem({ ...newItem, serving_unit: e.target.value })}>
                                <option value="g">Grams (g)</option>
                                <option value="ml">Milliliters (ml)</option>
                            </select>
                        </div>
                        <textarea placeholder="Description" rows="3" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })}></textarea>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                            <input type="checkbox" style={{ width: 'auto', marginRight: '10px' }} checked={newItem.is_available} onChange={e => setNewItem({ ...newItem, is_available: e.target.checked ? 1 : 0 })} />
                            Available
                        </label>
                        <button className="btn btn-primary" type="submit">{editingId ? 'Update Item' : 'Add Item'}</button>
                        {editingId && <button className="btn btn-outline" type="button" onClick={() => { setEditingId(null); setNewItem({ name: '', category: 'main', price: '', serving_size: '', serving_unit: 'g', description: '', is_available: 1 }) }} style={{ marginLeft: '10px' }}>Cancel</button>}
                    </form>
                </div>

                <div className="glass-panel p-4" style={{ padding: '20px', maxHeight: '80vh', overflowY: 'auto' }}>
                    <h3>Menu List</h3>
                    {menuItems.map(item => (
                        <div key={item.id} className="glass-card" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <small style={{ color: 'var(--primary-color)' }}>{item.category} | ${item.price} | {item.serving_size}{item.serving_unit}</small>
                            </div>
                            <div>
                                <button className="btn btn-outline" style={{ marginRight: '5px', padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-primary" style={{ background: 'var(--accent-color)', border: 'none', padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => handleDelete(item.id)}>Del</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
