// Shared mock data and utilities for all pages

export const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 555-0101', totalOrders: 24, totalSpent: 1840.50, status: 'Active', joinDate: '2024-01-15' },
  { id: 'c2', name: 'Bob Martinez', email: 'bob@example.com', phone: '+1 555-0102', totalOrders: 12, totalSpent: 920.75, status: 'Active', joinDate: '2024-02-20' },
  { id: 'c3', name: 'Carol Williams', email: 'carol@example.com', phone: '+1 555-0103', totalOrders: 8, totalSpent: 560.25, status: 'Inactive', joinDate: '2024-03-10' },
  { id: 'c4', name: 'David Brown', email: 'david@example.com', phone: '+1 555-0104', totalOrders: 31, totalSpent: 2450.00, status: 'Active', joinDate: '2023-11-05' },
  { id: 'c5', name: 'Emma Davis', email: 'emma@example.com', phone: '+1 555-0105', totalOrders: 5, totalSpent: 340.00, status: 'Active', joinDate: '2024-04-22' },
  { id: 'c6', name: 'Frank Wilson', email: 'frank@example.com', phone: '+1 555-0106', totalOrders: 18, totalSpent: 1320.80, status: 'Active', joinDate: '2024-01-30' },
  { id: 'c7', name: 'Grace Lee', email: 'grace@example.com', phone: '+1 555-0107', totalOrders: 42, totalSpent: 3560.90, status: 'VIP', joinDate: '2023-09-14' },
  { id: 'c8', name: 'Henry Taylor', email: 'henry@example.com', phone: '+1 555-0108', totalOrders: 3, totalSpent: 180.40, status: 'Inactive', joinDate: '2024-05-11' },
];

export const MOCK_PRODUCTS = [
  { id: 'p1', name: 'Espresso Blend', sku: 'BEV-001', category: 'Beverages', price: 3.50, stock: 45, status: 'Active', supplier: 'Coffee Co.' },
  { id: 'p2', name: 'Cappuccino Mix', sku: 'BEV-002', category: 'Beverages', price: 4.50, stock: 36, status: 'Active', supplier: 'Coffee Co.' },
  { id: 'p3', name: 'Green Tea Pack', sku: 'BEV-003', category: 'Beverages', price: 2.99, stock: 60, status: 'Active', supplier: 'Tea World' },
  { id: 'p4', name: 'Chips Bag', sku: 'SNK-001', category: 'Snacks', price: 2.99, stock: 40, status: 'Active', supplier: 'Snack Corp' },
  { id: 'p5', name: 'Chocolate Bar', sku: 'SNK-002', category: 'Snacks', price: 1.99, stock: 4, status: 'Low Stock', supplier: 'Choco Ltd' },
  { id: 'p6', name: 'Whole Milk 1L', sku: 'DAI-001', category: 'Dairy', price: 3.49, stock: 30, status: 'Active', supplier: 'Dairy Farm' },
  { id: 'p7', name: 'Greek Yogurt', sku: 'DAI-002', category: 'Dairy', price: 5.99, stock: 0, status: 'Out of Stock', supplier: 'Dairy Farm' },
  { id: 'p8', name: 'Sourdough Bread', sku: 'BAK-001', category: 'Bakery', price: 4.99, stock: 12, status: 'Active', supplier: 'Bakery House' },
  { id: 'p9', name: 'Chicken Breast 1kg', sku: 'MRT-001', category: 'Meat', price: 8.99, stock: 8, status: 'Low Stock', supplier: 'Meat Market' },
  { id: 'p10', name: 'Fresh Apples 1kg', sku: 'PRD-001', category: 'Produce', price: 1.29, stock: 80, status: 'Active', supplier: 'Fresh Farm' },
  { id: 'p11', name: 'Dish Soap 500ml', sku: 'HH-001', category: 'Household', price: 4.99, stock: 40, status: 'Active', supplier: 'Clean Co.' },
  { id: 'p12', name: 'Paper Towels 8pk', sku: 'HH-002', category: 'Household', price: 6.99, stock: 50, status: 'Active', supplier: 'Clean Co.' },
];

export const MOCK_SALES = [
  { id: 's1', invoiceNumber: 'INV-2026-001', customer: 'Alice Johnson', amount: 45.50, status: 'Completed', paymentMethod: 'Credit Card', date: '2026-08-25' },
  { id: 's2', invoiceNumber: 'INV-2026-002', customer: 'Bob Martinez', amount: 23.75, status: 'Completed', paymentMethod: 'Cash', date: '2026-08-25' },
  { id: 's3', invoiceNumber: 'INV-2026-003', customer: 'Carol Williams', amount: 67.20, status: 'Pending', paymentMethod: 'Debit Card', date: '2026-08-24' },
  { id: 's4', invoiceNumber: 'INV-2026-004', customer: 'David Brown', amount: 128.90, status: 'Completed', paymentMethod: 'Credit Card', date: '2026-08-24' },
  { id: 's5', invoiceNumber: 'INV-2026-005', customer: 'Emma Davis', amount: 34.00, status: 'Cancelled', paymentMethod: 'Cash', date: '2026-08-23' },
  { id: 's6', invoiceNumber: 'INV-2026-006', customer: 'Frank Wilson', amount: 89.50, status: 'Completed', paymentMethod: 'Credit Card', date: '2026-08-23' },
  { id: 's7', invoiceNumber: 'INV-2026-007', customer: 'Grace Lee', amount: 215.40, status: 'Refunded', paymentMethod: 'Credit Card', date: '2026-08-22' },
  { id: 's8', invoiceNumber: 'INV-2026-008', customer: 'Henry Taylor', amount: 18.75, status: 'Completed', paymentMethod: 'Cash', date: '2026-08-22' },
];

export const MOCK_PURCHASES = [
  { id: 'po1', poNumber: 'PO-2026-001', supplier: 'Coffee Co.', amount: 450.00, status: 'Received', items: 3, date: '2026-08-20' },
  { id: 'po2', poNumber: 'PO-2026-002', supplier: 'Dairy Farm', amount: 280.50, status: 'Pending', items: 5, date: '2026-08-22' },
  { id: 'po3', poNumber: 'PO-2026-003', supplier: 'Snack Corp', amount: 175.25, status: 'Ordered', items: 8, date: '2026-08-23' },
  { id: 'po4', poNumber: 'PO-2026-004', supplier: 'Tea World', amount: 320.00, status: 'Received', items: 4, date: '2026-08-18' },
  { id: 'po5', poNumber: 'PO-2026-005', supplier: 'Bakery House', amount: 95.40, status: 'Cancelled', items: 2, date: '2026-08-15' },
  { id: 'po6', poNumber: 'PO-2026-006', supplier: 'Meat Market', amount: 560.80, status: 'Ordered', items: 6, date: '2026-08-24' },
];

export const MOCK_CATEGORIES = [
  { id: 'cat1', name: 'Beverages', description: 'Drinks and beverages', products: 12, status: 'Active', createdAt: '2024-01-01' },
  { id: 'cat2', name: 'Snacks', description: 'Chips, cookies and snacks', products: 8, status: 'Active', createdAt: '2024-01-01' },
  { id: 'cat3', name: 'Dairy', description: 'Milk, cheese and dairy products', products: 6, status: 'Active', createdAt: '2024-01-01' },
  { id: 'cat4', name: 'Bakery', description: 'Bread, pastries and baked goods', products: 5, status: 'Active', createdAt: '2024-01-01' },
  { id: 'cat5', name: 'Meat', description: 'Fresh and frozen meats', products: 7, status: 'Active', createdAt: '2024-01-01' },
  { id: 'cat6', name: 'Produce', description: 'Fresh fruits and vegetables', products: 15, status: 'Active', createdAt: '2024-01-01' },
  { id: 'cat7', name: 'Household', description: 'Cleaning and household items', products: 10, status: 'Active', createdAt: '2024-01-01' },
];

export const MOCK_SUPPLIERS = [
  { id: 'sup1', name: 'Coffee Co.', email: 'orders@coffeeco.com', phone: '+1 555-1001', products: 6, totalOrders: 24, status: 'Active', country: 'USA' },
  { id: 'sup2', name: 'Dairy Farm', email: 'supply@dairyfarm.com', phone: '+1 555-1002', products: 8, totalOrders: 18, status: 'Active', country: 'USA' },
  { id: 'sup3', name: 'Snack Corp', email: 'b2b@snackcorp.com', phone: '+1 555-1003', products: 12, totalOrders: 30, status: 'Active', country: 'Canada' },
  { id: 'sup4', name: 'Tea World', email: 'wholesale@teaworld.com', phone: '+1 555-1004', products: 5, totalOrders: 12, status: 'Active', country: 'UK' },
  { id: 'sup5', name: 'Bakery House', email: 'orders@bakeryhouse.com', phone: '+1 555-1005', products: 7, totalOrders: 8, status: 'Inactive', country: 'USA' },
  { id: 'sup6', name: 'Meat Market', email: 'supply@meatmarket.com', phone: '+1 555-1006', products: 10, totalOrders: 15, status: 'Active', country: 'USA' },
];

export const MOCK_EMPLOYEES = [
  { id: 'emp1', name: 'John Smith', email: 'john@pos.com', phone: '+1 555-2001', role: 'Manager', department: 'Operations', status: 'Active', joinDate: '2023-03-15' },
  { id: 'emp2', name: 'Sarah Johnson', email: 'sarah@pos.com', phone: '+1 555-2002', role: 'Cashier', department: 'Sales', status: 'Active', joinDate: '2023-05-20' },
  { id: 'emp3', name: 'Mike Chen', email: 'mike@pos.com', phone: '+1 555-2003', role: 'Stock Manager', department: 'Inventory', status: 'Active', joinDate: '2023-07-10' },
  { id: 'emp4', name: 'Lisa Brown', email: 'lisa@pos.com', phone: '+1 555-2004', role: 'Cashier', department: 'Sales', status: 'Inactive', joinDate: '2024-01-08' },
  { id: 'emp5', name: 'Tom Wilson', email: 'tom@pos.com', phone: '+1 555-2005', role: 'Security', department: 'Operations', status: 'Active', joinDate: '2023-11-01' },
];

export const MOCK_EXPENSES = [
  { id: 'exp1', category: 'Utilities', description: 'Electricity bill', amount: 450.00, status: 'Paid', date: '2026-08-01' },
  { id: 'exp2', category: 'Rent', description: 'Monthly rent', amount: 2500.00, status: 'Paid', date: '2026-08-01' },
  { id: 'exp3', category: 'Salaries', description: 'Staff salaries', amount: 8500.00, status: 'Paid', date: '2026-08-05' },
  { id: 'exp4', category: 'Marketing', description: 'Social media ads', amount: 350.00, status: 'Pending', date: '2026-08-20' },
  { id: 'exp5', category: 'Maintenance', description: 'Equipment repair', amount: 180.00, status: 'Paid', date: '2026-08-15' },
  { id: 'exp6', category: 'Transport', description: 'Delivery costs', amount: 220.00, status: 'Pending', date: '2026-08-22' },
];

export const MOCK_INVOICES = [
  { id: 'inv1', invoiceNumber: 'INV-2026-001', customer: 'Alice Johnson', amount: 45.50, status: 'Paid', dueDate: '2026-09-01', issueDate: '2026-08-25' },
  { id: 'inv2', invoiceNumber: 'INV-2026-002', customer: 'Bob Martinez', amount: 23.75, status: 'Paid', dueDate: '2026-09-01', issueDate: '2026-08-25' },
  { id: 'inv3', invoiceNumber: 'INV-2026-003', customer: 'Carol Williams', amount: 67.20, status: 'Pending', dueDate: '2026-09-05', issueDate: '2026-08-24' },
  { id: 'inv4', invoiceNumber: 'INV-2026-004', customer: 'David Brown', amount: 128.90, status: 'Overdue', dueDate: '2026-08-20', issueDate: '2026-08-10' },
  { id: 'inv5', invoiceNumber: 'INV-2026-005', customer: 'Emma Davis', amount: 34.00, status: 'Draft', dueDate: '2026-09-10', issueDate: '2026-08-26' },
];

export const MOCK_INVENTORY = [
  { id: 'inv1', product: 'Espresso Blend', sku: 'BEV-001', category: 'Beverages', currentStock: 45, minStock: 10, maxStock: 100, lastUpdated: '2026-08-25', status: 'Good' },
  { id: 'inv2', product: 'Chocolate Bar', sku: 'SNK-002', category: 'Snacks', currentStock: 4, minStock: 10, maxStock: 50, lastUpdated: '2026-08-24', status: 'Low' },
  { id: 'inv3', product: 'Greek Yogurt', sku: 'DAI-002', category: 'Dairy', currentStock: 0, minStock: 5, maxStock: 30, lastUpdated: '2026-08-23', status: 'Out' },
  { id: 'inv4', product: 'Green Tea Pack', sku: 'BEV-003', category: 'Beverages', currentStock: 60, minStock: 15, maxStock: 80, lastUpdated: '2026-08-25', status: 'Good' },
  { id: 'inv5', product: 'Chicken Breast', sku: 'MRT-001', category: 'Meat', currentStock: 8, minStock: 10, maxStock: 40, lastUpdated: '2026-08-25', status: 'Low' },
  { id: 'inv6', product: 'Sourdough Bread', sku: 'BAK-001', category: 'Bakery', currentStock: 12, minStock: 5, maxStock: 25, lastUpdated: '2026-08-25', status: 'Good' },
];

export const MOCK_NOTIFICATIONS = [
  { id: 'n1', title: 'Low Stock Alert', message: 'Chocolate Bar is running low (4 units remaining)', type: 'warning' as const, read: false, time: '2 hours ago' },
  { id: 'n2', title: 'New Sale', message: 'Invoice INV-2026-008 has been created for $18.75', type: 'success' as const, read: false, time: '3 hours ago' },
  { id: 'n3', title: 'Out of Stock', message: 'Greek Yogurt is now out of stock', type: 'error' as const, read: true, time: '5 hours ago' },
  { id: 'n4', title: 'Purchase Order', message: 'PO-2026-006 from Meat Market has been confirmed', type: 'info' as const, read: false, time: '1 day ago' },
  { id: 'n5', title: 'Payment Received', message: 'Payment of $128.90 from David Brown confirmed', type: 'success' as const, read: true, time: '1 day ago' },
  { id: 'n6', title: 'System Update', message: 'System will undergo maintenance on Sunday at 2 AM', type: 'info' as const, read: true, time: '2 days ago' },
];

export function statusBadgeClass(status: string): string {
  const s = status.toLowerCase();
  if (['active', 'completed', 'paid', 'received', 'good'].includes(s)) return 'badge badge-success';
  if (['pending', 'ordered', 'low'].includes(s)) return 'badge badge-warning';
  if (['inactive', 'cancelled', 'overdue', 'out of stock', 'out'].includes(s)) return 'badge badge-danger';
  if (['vip'].includes(s)) return 'badge badge-teal';
  if (['draft'].includes(s)) return 'badge badge-gray';
  if (['refunded'].includes(s)) return 'badge badge-info';
  return 'badge badge-gray';
}
