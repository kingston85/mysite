<?php
session_start();

// Database connection settings
$host = "localhost";
$dbname = "your_database_name";
$username = "your_database_username";
$password = "your_database_password";

// Admin credentials - In a production environment, these should be stored securely
// and not directly in the code
$admin_username = "admin"; // Change this to your preferred admin username
$admin_password = "your_secure_password"; // Change this to a strong password

// Check if user is already logged in
$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $input_username = $_POST['username'] ?? '';
    $input_password = $_POST['password'] ?? '';
    
    if ($input_username === $admin_username && $input_password === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
        $isLoggedIn = true;
    } else {
        $login_error = "Invalid username or password.";
    }
}

// Handle logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_unset();
    session_destroy();
    header("Location: index.php");
    exit;
}

// Handle marking messages as read
if ($isLoggedIn && isset($_GET['action']) && $_GET['action'] === 'mark_read' && isset($_GET['id'])) {
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $conn->prepare("UPDATE contact_submissions SET is_read = 1 WHERE id = :id");
        $stmt->bindParam(':id', $_GET['id'], PDO::PARAM_INT);
        $stmt->execute();
        
        header("Location: index.php");
        exit;
    } catch(PDOException $e) {
        $update_error = "Error updating record: " . $e->getMessage();
    }
}

// Handle deleting messages
if ($isLoggedIn && isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $conn->prepare("DELETE FROM contact_submissions WHERE id = :id");
        $stmt->bindParam(':id', $_GET['id'], PDO::PARAM_INT);
        $stmt->execute();
        
        header("Location: index.php");
        exit;
    } catch(PDOException $e) {
        $delete_error = "Error deleting record: " . $e->getMessage();
    }
}

// Fetch submissions if logged in
$submissions = [];
$total_records = 0;
$unread_count = 0;

if ($isLoggedIn) {
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Pagination settings
        $records_per_page = 10;
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        $offset = ($page - 1) * $records_per_page;
        
        // Filter settings
        $filter = isset($_GET['filter']) ? $_GET['filter'] : 'all';
        $where_clause = $filter === 'unread' ? "WHERE is_read = 0" : "";
        
        // Count total and unread records
        $stmt = $conn->query("SELECT COUNT(*) FROM contact_submissions");
        $total_records = $stmt->fetchColumn();
        
        $stmt = $conn->query("SELECT COUNT(*) FROM contact_submissions WHERE is_read = 0");
        $unread_count = $stmt->fetchColumn();
        
        // Fetch records with pagination and filtering
        $stmt = $conn->prepare("SELECT * FROM contact_submissions $where_clause ORDER BY submission_date DESC LIMIT :offset, :limit");
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->bindParam(':limit', $records_per_page, PDO::PARAM_INT);
        $stmt->execute();
        
        $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    } catch(PDOException $e) {
        $fetch_error = "Database Error: " . $e->getMessage();
    }
}

// Calculate pagination info
$total_pages = ceil($total_records / $records_per_page);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Admin | Sahr Emmanuel</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* Base styles */
        :root {
            --primary-color: #2c6e49;
            --secondary-color: #4c956c;
            --accent-color: #d68c45;
            --light-color: #f2e8cf;
            --dark-color: #333;
            --white-color: #fff;
            --danger-color: #dc3545;
            --success-color: #28a745;
            --warning-color: #ffc107;
            --info-color: #17a2b8;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--dark-color);
            background-color: #f8f9fa;
            padding: 20px;
        }
        
        h1, h2, h3, h4 {
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        a {
            color: var(--primary-color);
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: var(--white-color);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .btn {
            display: inline-block;
            padding: 8px 16px;
            background-color: var(--primary-color);
            color: var(--white-color);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background-color 0.3s;
        }
        
        .btn:hover {
            background-color: var(--secondary-color);
            text-decoration: none;
        }
        
        .btn-danger {
            background-color: var(--danger-color);
        }
        
        .btn-danger:hover {
            background-color: #bd2130;
        }
        
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        
        .alert-danger {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        /* Login form */
        .login-form {
            max-width: 400px;
            margin: 50px auto;
            padding: 30px;
            background-color: var(--white-color);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        
        /* Table styles */
        .table-responsive {
            overflow-x: auto;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .table th,
        .table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .table th {
            background-color: var(--light-color);
            font-weight: bold;
        }
        
        .table tbody tr:hover {
            background-color: #f9f9f9;
        }
        
        .table .unread {
            font-weight: bold;
            background-color: rgba(255, 243, 205, 0.4);
        }
        
        /* Message details */
        .message-content {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
            white-space: pre-wrap;
        }
        
        /* Pagination */
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 30px;
        }
        
        .pagination a,
        .pagination span {
            padding: 8px 16px;
            margin: 0 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .pagination a:hover {
            background-color: var(--light-color);
        }
        
        .pagination .active {
            background-color: var(--primary-color);
            color: var(--white-color);
            border-color: var(--primary-color);
        }
        
        /* Filters */
        .filters {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .filter-link {
            padding: 8px 16px;
            background-color: #f1f1f1;
            border-radius: 4px;
            color: var(--dark-color);
        }
        
        .filter-link.active {
            background-color: var(--primary-color);
            color: var(--white-color);
        }
        
        /* Stats */
        .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            flex: 1;
            padding: 15px;
            background-color: var(--light-color);
            border-radius: 4px;
            text-align: center;
        }
        
        .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: var(--dark-color);
        }
        
        /* Responsive */
        @media screen and (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .header a {
                margin-top: 10px;
            }
            
            .stats {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <?php if (!$isLoggedIn): ?>
        <!-- Login Form -->
        <div class="login-form">
            <h2>Admin Login</h2>
            
            <?php if (isset($login_error)): ?>
                <div class="alert alert-danger"><?php echo $login_error; ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <input type="hidden" name="action" value="login">
                
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" class="form-control" required>
                </div>
                
                <button type="submit" class="btn">Login</button>
            </form>
        </div>
    <?php else: ?>
        <!-- Admin Dashboard -->
        <div class="container">
            <div class="header">
                <h1>Contact Form Submissions</h1>
                <a href="?action=logout" class="btn">Logout</a>
            </div>
            
            <?php if (isset($fetch_error)): ?>
                <div class="alert alert-danger"><?php echo $fetch_error; ?></div>
            <?php endif; ?>
            
            <?php if (isset($update_error)): ?>
                <div class="alert alert-danger"><?php echo $update_error; ?></div>
            <?php endif; ?>
            
            <?php if (isset($delete_error)): ?>
                <div class="alert alert-danger"><?php echo $delete_error; ?></div>
            <?php endif; ?>
            
            <!-- Stats -->
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number"><?php echo $total_records; ?></div>
                    <div class="stat-label">Total Messages</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $unread_count; ?></div>
                    <div class="stat-label">Unread Messages</div>
                </div>
            </div>
            
            <!-- Filters -->
            <div class="filters">
                <a href="?filter=all" class="filter-link <?php echo (!isset($_GET['filter']) || $_GET['filter'] === 'all') ? 'active' : ''; ?>">All Messages</a>
                <a href="?filter=unread" class="filter-link <?php echo (isset($_GET['filter']) && $_GET['filter'] === 'unread') ? 'active' : ''; ?>">Unread Messages</a>
            </div>
            
            <?php if (count($submissions) > 0): ?>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="width: 80px;">ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Date</th>
                                <th style="width: 120px;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($submissions as $submission): ?>
                                <tr class="<?php echo $submission['is_read'] ? '' : 'unread'; ?>">
                                    <td><?php echo htmlspecialchars($submission['id']); ?></td>
                                    <td><?php echo htmlspecialchars($submission['name']); ?></td>
                                    <td><a href="mailto:<?php echo htmlspecialchars($submission['email']); ?>"><?php echo htmlspecialchars($submission['email']); ?></a></td>
                                    <td><?php echo htmlspecialchars($submission['subject']); ?></td>
                                    <td><?php echo date('M d, Y H:i', strtotime($submission['submission_date'])); ?></td>
                                    <td>
                                        <button onclick="toggleDetails(<?php echo $submission['id']; ?>)" class="btn btn-sm">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <?php if (!$submission['is_read']): ?>
                                            <a href="?action=mark_read&id=<?php echo $submission['id']; ?>" class="btn btn-sm" title="Mark as Read">
                                                <i class="fas fa-check"></i>
                                            </a>
                                        <?php endif; ?>
                                        <a href="?action=delete&id=<?php echo $submission['id']; ?>" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this message?');" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr id="details-<?php echo $submission['id']; ?>" style="display: none;">
                                    <td colspan="6">
                                        <div>
                                            <strong>Phone:</strong> <?php echo htmlspecialchars($submission['phone'] ?: 'Not provided'); ?>
                                        </div>
                                        <div>
                                            <strong>Newsletter:</strong> <?php echo $submission['newsletter'] ? 'Yes' : 'No'; ?>
                                        </div>
                                        <div>
                                            <strong>IP Address:</strong> <?php echo htmlspecialchars($submission['ip_address']); ?>
                                        </div>
                                        <div style="margin-top: 10px;">
                                            <strong>Message:</strong>
                                            <div class="message-content"><?php echo htmlspecialchars($submission['message']); ?></div>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination -->
                <?php if ($total_pages > 1): ?>
                    <div class="pagination">
                        <?php if ($page > 1): ?>
                            <a href="?page=<?php echo $page - 1; ?>&filter=<?php echo $filter; ?>">&laquo; Previous</a>
                        <?php endif; ?>
                        
                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                            <?php if ($i == $page): ?>
                                <span class="active"><?php echo $i; ?></span>
                            <?php else: ?>
                                <a href="?page=<?php echo $i; ?>&filter=<?php echo $filter; ?>"><?php echo $i; ?></a>
                            <?php endif; ?>
                        <?php endfor; ?>
                        
                        <?php if ($page < $total_pages): ?>
                            <a href="?page=<?php echo $page + 1; ?>&filter=<?php echo $filter; ?>">Next &raquo;</a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
                
            <?php else: ?>
                <div style="text-align: center; padding: 30px;">
                    <p>No messages found.</p>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
    
    <script>
        function toggleDetails(id) {
            const detailsRow = document.getElementById('details-' + id);
            if (detailsRow.style.display === 'none') {
                detailsRow.style.display = 'table-row';
            } else {
                detailsRow.style.display = 'none';
            }
        }
    </script>
</body>
</html>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="
