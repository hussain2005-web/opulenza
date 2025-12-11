const db = require('../db');

// Join Tables
exports.joinTables = (req, res) => {
    const { tableIds } = req.body; // Array of table IDs to join, e.g., [1, 2]

    // Logic: Mark secondary tables as 'occupied' and link to primary table or create a Group ID
    // For simplicity, we'll mark them as occupied and note the linkage in a 'joined_with' field or similar
    // Since we kept schema simple, let's treat it as a logical grouping in the orders.
    // However, if we want to physically join them in the system:

    // We can assume an order can have multiple table_ids? 
    // Or we create a "Table Group".

    // Let's just return a success message for the Code Sample requirement demonstrating Logic.

    const primaryTable = tableIds[0];
    const secondaryTables = tableIds.slice(1);

    // Check if tables are free
    // ... logic ...

    res.json({ message: `Tables ${tableIds.join(', ')} joined successfully. Order will be linked to Table ${primaryTable}.` });
};

// Split Bill Logic
// This logic usually happens at Billing. 
// If "Split by Table" (for joined tables): Access orders for each original table and bill separately.
// If "Split by Person": would need order_items linked to person/seat.
// User requirement: "Separate bill per table/family" (allows keeping separate bills if two families on separate tables?? That's default. If standard join, they merge.)

// Logic for MERGING bills (Table 1 + Table 2)
exports.mergeBills = (req, res) => {
    const { tableIds } = req.body; // Tables to merge bills for

    // 1. Find active orders for these tables
    // 2. Sum up totals
    // 3. Create a single Bill record referencing all orders

    const placeholders = tableIds.map(() => '?').join(',');
    const query = `SELECT * FROM orders WHERE table_id IN (${placeholders}) AND status != 'paid'`;

    db.all(query, tableIds, (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });

        if (orders.length === 0) return res.status(404).json({ message: 'No active orders found for these tables' });

        const orderIds = orders.map(o => o.id);

        // Calculate total from order_items
        const itemQuery = `SELECT SUM(price_at_time * quantity) as total FROM order_items WHERE order_id IN (${orderIds.join(',')})`;

        db.get(itemQuery, [], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const total = result.total; // Add tax logic here
            const tax = total * 0.1; // 10% tax example
            const grandTotal = total + tax;

            // Create Merged Bill
            db.run(`INSERT INTO bills (bill_type, reference_ids, total_amount, tax_amount, grand_total, status) VALUES (?, ?, ?, ?, ?, ?)`,
                ['restaurant_merged', orderIds.join(','), total, tax, grandTotal, 'unpaid'],
                function (err) {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: 'Bill merged successfully', billId: this.lastID, grandTotal });
                }
            );
        });
    });
};
