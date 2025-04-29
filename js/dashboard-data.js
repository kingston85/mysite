/**
 * EPA Dashboard - Sample Data
 * This file contains sample data for the EPA dashboard visualizations
 */

// Color schemes for the dashboard
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const EPA_COLORS = ['#2c6e49', '#4c956c', '#d68c45', '#f8c174', '#1a472a'];

// License data - Distribution of different license types
const licenseData = [
    { name: 'Chemical Importation', count: 45, color: '#8884d8' },
    { name: 'Effluent Discharge', count: 32, color: '#82ca9d' },
    { name: 'Water Production', count: 28, color: '#ffc658' },
    { name: 'Mining Operations', count: 15, color: '#ff8042' }
];

// Application status data - Current status of license applications
const applicationStatusData = [
    { name: 'Approved', value: 76 },
    { name: 'Under Review', value: 24 },
    { name: 'Rejected', value: 8 }
];

// Monthly applications - Tracking applications over time
const monthlyApplications = [
    { name: 'Jan', count: 12 },
    { name: 'Feb', count: 19 },
    { name: 'Mar', count: 15 },
    { name: 'Apr', count: 22 },
    { name: 'May', count: 28 },
    { name: 'Jun', count: 15 },
    { name: 'Jul', count: 21 },
    { name: 'Aug', count: 18 },
    { name: 'Sep', count: 25 },
    { name: 'Oct', count: 17 },
];

// Field investigations data - Categorization of investigation types
const fieldInvestigationsData = [
    { category: 'Mining', count: 23 },
    { category: 'Agricultural', count: 19 },
    { category: 'Industrial', count: 34 },
    { category: 'Water Resources', count: 28 },
];

// Recent activities - Tracking latest EPA activities
const recentActivities = [
    { id: 1, type: 'License Issued', entity: 'ABC Mining Co.', date: '2025-04-25', status: 'Completed' },
    { id: 2, type: 'Field Investigation', entity: 'XYZ Industries', date: '2025-04-22', status: 'Completed' },
    { id: 3, type: 'Water Monitoring', entity: 'PureWater Ltd', date: '2025-04-20', status: 'In Progress' },
    { id: 4, type: 'Chemical Test', entity: 'Green Farms', date: '2025-04-18', status: 'Completed' },
    { id: 5, type: 'Application Review', entity: 'Monrovia Chemicals', date: '2025-04-15', status: 'Pending' },
];

// Counties - List of Liberian counties for geographic visualization
const counties = [
    'Montserrado', 'Nimba', 'Bong', 'Lofa', 'Grand Bassa',
    'Margibi', 'Grand Cape Mount', 'Maryland', 'Grand Gedeh', 'Sinoe',
    'River Cess', 'Grand Kru', 'Gbarpolu', 'River Gee', 'Bomi'
];
