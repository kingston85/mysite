/**
 * EPA Dashboard - React Components
 * This file contains the React components for the EPA dashboard visualizations
 */

// Destructure React components
const { useState, useEffect } = React;
const { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell
} = Recharts;

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chartTheme, setChartTheme] = useState(EPA_COLORS);
  const [showDataTable, setShowDataTable] = useState(true);
  
  // Load settings from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('chartTheme');
    if (savedTheme === 'epa') {
      setChartTheme(EPA_COLORS);
    } else if (savedTheme === 'default') {
      setChartTheme(COLORS);
    }
    
    const showTable = localStorage.getItem('showDataTable');
    if (showTable !== null) {
      setShowDataTable(showTable === 'true');
    }
  }, []);
  
  return (
    <div className="dashboard-content">
      {/* Dashboard Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-chart-pie mr-2"></i> Overview
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'licenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('licenses')}
        >
          <i className="fas fa-file-certificate mr-2"></i> Licenses
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'investigations' ? 'active' : ''}`}
          onClick={() => setActiveTab('investigations')}
        >
          <i className="fas fa-microscope mr-2"></i> Investigations
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          <i className="fas fa-calendar-alt mr-2"></i> Monthly Data
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          <i className="fas fa-clipboard-list mr-2"></i> Recent Activities
        </button>
      </div>
      
      {/* Dashboard Content */}
      <div className="dashboard-tab-content">
        {activeTab === 'overview' && <OverviewTab chartTheme={chartTheme} showDataTable={showDataTable} />}
        {activeTab === 'licenses' && <LicensesTab chartTheme={chartTheme} showDataTable={showDataTable} />}
        {activeTab === 'investigations' && <InvestigationsTab chartTheme={chartTheme} showDataTable={showDataTable} />}
        {activeTab === 'monthly' && <MonthlyTab chartTheme={chartTheme} showDataTable={showDataTable} />}
        {activeTab === 'activities' && <ActivitiesTab />}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ chartTheme, showDataTable }) => {
  return (
    <div className="dashboard-overview">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">EPA Dashboard Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Summary Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-primary-700">Total Licenses</h4>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold">120</span>
            <span className="ml-2 text-green-500"><i className="fas fa-arrow-up"></i> 15%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Compared to last year</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-primary-700">Active Investigations</h4>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold">26</span>
            <span className="ml-2 text-amber-500"><i className="fas fa-arrow-up"></i> 5%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Compared to last month</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-primary-700">Compliance Rate</h4>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold">82%</span>
            <span className="ml-2 text-green-500"><i className="fas fa-arrow-up"></i> 7%</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Compared to last quarter</p>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">License Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={licenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {licenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartTheme[index % chartTheme.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Licenses`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          
          {showDataTable && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">License Type</th>
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Count</th>
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {licenseData.map((item, index) => {
                    const total = licenseData.reduce((sum, item) => sum + item.count, 0);
                    const percentage = ((item.count / total) * 100).toFixed(1);
                    return (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4 text-sm">{item.name}</td>
                        <td className="py-2 px-4 text-sm">{item.count}</td>
                        <td className="py-2 px-4 text-sm">{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">Monthly Applications (2025)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Applications" stroke={chartTheme[0]} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          
          {showDataTable && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Month</th>
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyApplications.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 text-sm">{item.name}</td>
                      <td className="py-2 px-4 text-sm">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Field Investigations Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h4 className="font-semibold text-gray-700 mb-4">Field Investigations by Category</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fieldInvestigationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Investigations" fill={chartTheme[1]}>
              {fieldInvestigationsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartTheme[index % chartTheme.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {showDataTable && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Category</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Investigation Count</th>
                </tr>
              </thead>
              <tbody>
                {fieldInvestigationsData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-sm">{item.category}</td>
                    <td className="py-2 px-4 text-sm">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Licenses Tab Component
const LicensesTab = ({ chartTheme, showDataTable }) => {
  return (
    <div className="dashboard-licenses">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">License Applications & Status</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">License Types Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={licenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {licenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartTheme[index % chartTheme.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Licenses`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">Application Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Applications" fill={chartTheme[2]}>
                {applicationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartTheme[index % chartTheme.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {showDataTable && (
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h4 className="font-semibold text-gray-700 mb-4">License Applications Data</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">License Type</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Count</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {licenseData.map((item, index) => {
                  const total = licenseData.reduce((sum, item) => sum + item.count, 0);
                  const percentage = ((item.count / total) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 text-sm">{item.name}</td>
                      <td className="py-2 px-4 text-sm">{item.count}</td>
                      <td className="py-2 px-4 text-sm">{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <h4 className="font-semibold text-gray-700 mt-6 mb-4">Application Status Data</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Count</th>
                </tr>
              </thead>
              <tbody>
                {applicationStatusData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-sm">{item.name}</td>
                    <td className="py-2 px-4 text-sm">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Investigations Tab Component
const InvestigationsTab = ({ chartTheme, showDataTable }) => {
  return (
    <div className="dashboard-investigations">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Field Investigations Analysis</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">Investigations by Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fieldInvestigationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Investigations" fill={chartTheme[1]}>
                {fieldInvestigationsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartTheme[index % chartTheme.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">Investigations by Category (Radar)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={fieldInvestigationsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 40]} />
              <Radar name="Investigations" dataKey="count" stroke={chartTheme[0]} fill={chartTheme[0]} fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {showDataTable && (
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h4 className="font-semibold text-gray-700 mb-4">Field Investigations Data</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Category</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Investigation Count</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {fieldInvestigationsData.map((item, index) => {
                  const total = fieldInvestigationsData.reduce((sum, item) => sum + item.count, 0);
                  const percentage = ((item.count / total) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 text-sm">{item.category}</td>
                      <td className="py-2 px-4 text-sm">{item.count}</td>
                      <td className="py-2 px-4 text-sm">{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Monthly Tab Component
const MonthlyTab = ({ chartTheme, showDataTable }) => {
  return (
    <div className="dashboard-monthly">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Application Trends</h3>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">Monthly Applications (2025)</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Applications" stroke={chartTheme[0]} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-4">Monthly Applications (Area Chart)</h4>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="count" name="Applications" stroke={chartTheme[1]} fill={chartTheme[1]} fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {showDataTable && (
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h4 className="font-semibold text-gray-700 mb-4">Monthly Application Data</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Month</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Applications</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold text-gray-700">Change (%)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyApplications.map((item, index) => {
                  const prevMonth = index > 0 ? monthlyApplications[index - 1].count : null;
                  const change = prevMonth ? (((item.count - prevMonth) / prevMonth) * 100).toFixed(1) : 'N/A';
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 text-sm">{item.name}</td>
                      <td className="py-2 px-4 text-sm">{item.count}</td>
                      <td className="py-2 px-4 text-sm">
                        {change !== 'N/A' ? (
                          <>
                            {parseFloat(change) > 0 ? (
                              <span className="text-green-500">{change}% <i className="fas fa-arrow-up"></i></span>
                            ) : parseFloat(change) < 0 ? (
                              <span className="text-red-500">{change}% <i className="fas fa-arrow-down"></i></span>
                            ) : (
                              <span className="text-gray-500">0% <i className="fas fa-minus"></i></span>
                            )}
                          </>
                        ) : change}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Activities Tab Component
const ActivitiesTab = () => {
  return (
    <div className="dashboard-activities">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent EPA Activities</h3>
      
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Activity Type</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Entity</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{activity.type}</td>
                  <td className="py-3 px-4 text-sm font-medium">{activity.entity}</td>
                  <td className="py-3 px-4 text-sm">{new Date(activity.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    {activity.status === 'Completed' && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                    )}
                    {activity.status === 'In Progress' && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">In Progress</span>
                    )}
                    {activity.status === 'Pending' && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <i className="fas fa-file-download"></i> Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold text-gray-700 mb-4">Activity Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-700">Completed Activities</h5>
            <div className="text-2xl font-bold text-green-600 mt-2">
              {recentActivities.filter(a => a.status === 'Completed').length}
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-700">In Progress</h5>
            <div className="text-2xl font-bold text-blue-600 mt-2">
              {recentActivities.filter(a => a.status === 'In Progress').length}
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h5 className="font-medium text-yellow-700">Pending Review</h5>
            <div className="text-2xl font-bold text-yellow-600 mt-2">
              {recentActivities.filter(a => a.status === 'Pending').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Render the Dashboard
ReactDOM.render(<Dashboard />, document.getElementById('dashboard-app'));
