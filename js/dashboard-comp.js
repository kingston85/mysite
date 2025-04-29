/**
 * EPA Dashboard - React Components
 * This file contains React components for the EPA dashboard visualizations
 */

// Main Dashboard Component
const Dashboard = () => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [uploadedData, setUploadedData] = React.useState(null);
    const [chartType, setChartType] = React.useState('bar');
    const [dataCategory, setDataCategory] = React.useState('license');
    const [showDataTable, setShowDataTable] = React.useState(true);
    const [chartTheme, setChartTheme] = React.useState('epa');
    const [loading, setLoading] = React.useState(false);

    // Effect to set initial state from settings
    React.useEffect(() => {
        // Get settings from local storage if available
        const storedChartTheme = localStorage.getItem('chartTheme');
        const storedDataCategory = localStorage.getItem('dataCategory');
        const storedShowDataTable = localStorage.getItem('showDataTable');
        
        if (storedChartTheme) setChartTheme(storedChartTheme);
        if (storedDataCategory) setDataCategory(storedDataCategory);
        if (storedShowDataTable) setShowDataTable(storedShowDataTable === 'true');
        
        // Update settings on React state changes
        document.getElementById('chart-theme')?.addEventListener('change', (e) => {
            setChartTheme(e.target.value);
        });
        
        document.getElementById('data-category')?.addEventListener('change', (e) => {
            setDataCategory(e.target.value);
        });
        
        document.getElementById('show-data-table')?.addEventListener('change', (e) => {
            setShowDataTable(e.target.checked);
        });
        
        // Save settings when the settings form is submitted
        document.getElementById('save-settings-btn')?.addEventListener('click', () => {
            localStorage.setItem('chartTheme', chartTheme);
            localStorage.setItem('dataCategory', dataCategory);
            localStorage.setItem('showDataTable', showDataTable.toString());
        });
    }, [chartTheme, dataCategory, showDataTable]);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-green-700 text-white p-4 mb-6 rounded-t-lg">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">EPA Liberia</h1>
                            <p className="text-sm">Environmental Research and Radiation Safety Department</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <p className="text-sm">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-green-800 text-white mb-6">
                <div className="container mx-auto">
                    <div className="flex overflow-x-auto">
                        <button 
                            onClick={() => setActiveTab('overview')} 
                            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'overview' ? 'bg-green-600' : ''}`}
                        >
                            Overview
                        </button>
                        <button 
                            onClick={() => setActiveTab('licenses')} 
                            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'licenses' ? 'bg-green-600' : ''}`}
                        >
                            Licenses & Applications
                        </button>
                        <button 
                            onClick={() => setActiveTab('investigations')} 
                            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'investigations' ? 'bg-green-600' : ''}`}
                        >
                            Field Investigations
                        </button>
                        <button 
                            onClick={() => setActiveTab('monitoring')} 
                            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'monitoring' ? 'bg-green-600' : ''}`}
                        >
                            Monitoring & Testing
                        </button>
                        <button 
                            onClick={() => setActiveTab('geographic')} 
                            className={`px-4 py-3 whitespace-nowrap ${activeTab === 'geographic' ? 'bg-green-600' : ''}`}
                        >
                            Geographic Data
                        </button>
                        {uploadedData && (
                            <button 
                                onClick={() => setActiveTab('custom')} 
                                className={`px-4 py-3 whitespace-nowrap ${activeTab === 'custom' ? 'bg-green-600' : ''}`}
                            >
                                Custom Data
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <DashboardContent 
                        activeTab={activeTab} 
                        chartTheme={chartTheme} 
                        showDataTable={showDataTable} 
                        uploadedData={uploadedData} 
                    />
                )}
            </main>

            {/* Footer */}
            <footer className="bg-green-800 text-white p-4 mt-6 rounded-b-lg">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">© 2025 Environmental Protection Agency of Liberia</p>
                        <p className="text-sm mt-2 md:mt-0">Environmental Research and Radiation Safety Department</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Dashboard Content Component
const DashboardContent = ({ activeTab, chartTheme, showDataTable, uploadedData }) => {
    // Select the appropriate color scheme
    const colors = chartTheme === 'epa' ? EPA_COLORS : COLORS;
    
    // Stats Summary
    const StatsSummary = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <i className="fas fa-file-alt text-blue-500"></i>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Total Applications</h3>
                        <p className="font-bold text-2xl">108</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                        <i className="fas fa-check-square text-green-500"></i>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Active Licenses</h3>
                        <p className="font-bold text-2xl">76</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <i className="fas fa-map text-yellow-500"></i>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Field Investigations</h3>
                        <p className="font-bold text-2xl">104</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full">
                        <i className="fas fa-chart-line text-purple-500"></i>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm">Monitoring Activities</h3>
                        <p className="font-bold text-2xl">89</p>
                    </div>
                </div>
            </div>
        </div>
    );
    
    // Overview Tab Content
    const OverviewContent = () => (
        <div>
            <StatsSummary />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4 text-green-700">License Distribution</h2>
                    <Recharts.ResponsiveContainer width="100%" height={300}>
                        <Recharts.PieChart>
                            <Recharts.Pie
                                data={licenseData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {licenseData.map((entry, index) => (
                                    <Recharts.Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Recharts.Pie>
                            <Recharts.Tooltip />
                        </Recharts.PieChart>
                    </Recharts.ResponsiveContainer>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4 text-green-700">Monthly Applications</h2>
                    <Recharts.ResponsiveContainer width="100%" height={300}>
                        <Recharts.LineChart data={monthlyApplications}>
                            <Recharts.CartesianGrid strokeDasharray="3 3" />
                            <Recharts.XAxis dataKey="name" />
                            <Recharts.YAxis />
                            <Recharts.Tooltip />
                            <Recharts.Legend />
                            <Recharts.Line 
                                type="monotone" 
                                dataKey="count" 
                                stroke={colors[0]} 
                                activeDot={{ r: 8 }} 
                            />
                        </Recharts.LineChart>
                    </Recharts.ResponsiveContainer>
                </div>
            </div>
            
            {showDataTable && (
                <div className="bg-white p-4 rounded shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-green-700">Recent Activities</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentActivities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{activity.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{activity.entity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{activity.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                                activity.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {activity.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
    
    // Content for other tabs (simplified for brevity)
    const LicensesContent = () => (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4 text-green-700">License Types Issued</h2>
                    <Recharts.ResponsiveContainer width="100%" height={300}>
                        <Recharts.BarChart data={licenseData}>
                            <Recharts.CartesianGrid strokeDasharray="3 3" />
                            <Recharts.XAxis dataKey="name" />
                            <Recharts.YAxis />
                            <Recharts.Tooltip />
                            <Recharts.Legend />
                            <Recharts.Bar dataKey="count" fill="#8884d8">
                                {licenseData.map((entry, index) => (
                                    <Recharts.Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Recharts.Bar>
                        </Recharts.BarChart>
                    </Recharts.ResponsiveContainer>
                </div>
                
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4 text-green-700">Application Status</h2>
                    <Recharts.ResponsiveContainer width="100%" height={300}>
                        <Recharts.PieChart>
                            <Recharts.Pie
                                data={applicationStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {applicationStatusData.map((entry, index) => (
                                    <Recharts.Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Recharts.Pie>
                            <Recharts.Tooltip />
                        </Recharts.PieChart>
                    </Recharts.ResponsiveContainer>
                </div>
            </div>
        </div>
    );
    
    const InvestigationsContent = () => (
        <div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4 text-green-700">Field Investigations by Category</h2>
                <Recharts.ResponsiveContainer width="100%" height={300}>
                    <Recharts.BarChart data={fieldInvestigationsData}>
                        <Recharts.CartesianGrid strokeDasharray="3 3" />
                        <Recharts.XAxis dataKey="category" />
                        <Recharts.YAxis />
                        <Recharts.Tooltip />
                        <Recharts.Legend />
                        <Recharts.Bar dataKey="count" fill={colors[1]} />
                    </Recharts.BarChart>
                </Recharts.ResponsiveContainer>
            </div>
        </div>
    );
    
    const MonitoringContent = () => (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-green-700">Water Quality Tests</h2>
            <p>Monitoring data visualization would appear here.</p>
        </div>
    );
    
    const GeographicContent = () => (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-green-700">Activity by County</h2>
            <p>Geographic data visualization would appear here.</p>
        </div>
    );
    
    const CustomDataContent = () => (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-4 text-green-700">Custom Data Visualization</h2>
            <div className="text-center p-6">
                <i className="fas fa-upload text-gray-300 text-5xl mb-4"></i>
                <p className="text-gray-500">No custom data has been uploaded yet.</p>
                <p className="text-gray-500 mb-4">Use the Upload Data tool to visualize your own data.</p>
                <button 
                    className="btn" 
                    onClick={() => {
                        document.getElementById('upload-tool')?.click();
                    }}
                >
                    Upload Data Now
                </button>
            </div>
        </div>
    );
    
    // Return content based on active tab
    switch(activeTab) {
        case 'licenses':
            return <LicensesContent />;
        case 'investigations':
            return <InvestigationsContent />;
        case 'monitoring':
            return <MonitoringContent />;
        case 'geographic':
            return <GeographicContent />;
        case 'custom':
            return <CustomDataContent />;
        default:
            return <OverviewContent />;
    }
};

// Render the dashboard
ReactDOM.render(
    <Dashboard />,
    document.getElementById('dashboard-app')
);
