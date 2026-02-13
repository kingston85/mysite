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

// County data with sample values for geographic visualization
const countyData = counties.map(county => ({
    name: county,
    investigations: Math.floor(Math.random() * 30) + 5,
    licenses: Math.floor(Math.random() * 20) + 2,
    compliance: Math.floor(Math.random() * 40) + 60  // Percentage between 60-100%
}));

// Water quality data over time for line charts
const waterQualityData = [
    { month: 'Jan', ph: 7.2, dissolved_oxygen: 8.5, turbidity: 12, temperature: 24 },
    { month: 'Feb', ph: 7.1, dissolved_oxygen: 8.3, turbidity: 14, temperature: 25 },
    { month: 'Mar', ph: 7.0, dissolved_oxygen: 8.0, turbidity: 15, temperature: 26 },
    { month: 'Apr', ph: 6.9, dissolved_oxygen: 7.8, turbidity: 18, temperature: 27 },
    { month: 'May', ph: 7.0, dissolved_oxygen: 7.5, turbidity: 20, temperature: 28 },
    { month: 'Jun', ph: 7.1, dissolved_oxygen: 7.2, turbidity: 22, temperature: 29 },
    { month: 'Jul', ph: 7.2, dissolved_oxygen: 7.0, turbidity: 25, temperature: 30 },
    { month: 'Aug', ph: 7.3, dissolved_oxygen: 6.8, turbidity: 28, temperature: 31 },
    { month: 'Sep', ph: 7.2, dissolved_oxygen: 7.0, turbidity: 24, temperature: 30 },
    { month: 'Oct', ph: 7.1, dissolved_oxygen: 7.5, turbidity: 18, temperature: 28 },
];

// Compliance by sector data for radar chart
const complianceBySector = [
    { sector: 'Mining', compliance: 75, violations: 25 },
    { sector: 'Manufacturing', compliance: 82, violations: 18 },
    { sector: 'Agriculture', compliance: 68, violations: 32 },
    { sector: 'Energy', compliance: 88, violations: 12 },
    { sector: 'Waste Management', compliance: 72, violations: 28 },
    { sector: 'Water Resources', compliance: 85, violations: 15 },
];

// Waste management data for stacked bar chart
const wasteManagementData = [
    { month: 'Jan', recycled: 35, landfill: 55, incinerated: 10 },
    { month: 'Feb', recycled: 38, landfill: 52, incinerated: 10 },
    { month: 'Mar', recycled: 40, landfill: 50, incinerated: 10 },
    { month: 'Apr', recycled: 42, landfill: 48, incinerated: 10 },
    { month: 'May', recycled: 45, landfill: 45, incinerated: 10 },
    { month: 'Jun', recycled: 48, landfill: 42, incinerated: 10 },
    { month: 'Jul', recycled: 50, landfill: 40, incinerated: 10 },
    { month: 'Aug', recycled: 52, landfill: 38, incinerated: 10 },
    { month: 'Sep', recycled: 55, landfill: 35, incinerated: 10 },
    { month: 'Oct', recycled: 58, landfill: 32, incinerated: 10 },
];

// Revenue from licenses data for revenue chart
const revenueData = [
    { year: '2020', revenue: 125000 },
    { year: '2021', revenue: 158000 },
    { year: '2022', revenue: 187000 },
    { year: '2023', revenue: 225000 },
    { year: '2024', revenue: 275000 },
    { year: '2025 (Projected)', revenue: 320000 },
];
