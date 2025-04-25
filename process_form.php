<?php
// Database connection settings
$host = "localhost"; // Usually localhost for most hosting providers
$dbname = "your_database_name"; // Replace with your actual database name
$username = "your_database_username"; // Replace with your database username
$password = "your_database_password"; // Replace with your database password

// Email settings
$to_email = "esahr37@gmail.com"; // Your email address to receive notifications
$site_name = "Sahr Emmanuel Personal Website";

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Initialize response array
$response = array(
    'success' => false,
    'message' => 'An error occurred.'
);

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get and sanitize form data
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    $newsletter = isset($_POST['newsletter']) ? 1 : 0;
    
    // Additional data to store
    $ip_address = $_SERVER['REMOTE_ADDR'];
    $submission_date = date('Y-m-d H:i:s');
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response['message'] = 'Please fill all required fields.';
        echo json_encode($response);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Please enter a valid email address.';
        echo json_encode($response);
        exit;
    }
    
    try {
        // Connect to database
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        // Set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO contact_submissions (name, email, phone, subject, message, newsletter, ip_address, submission_date) 
                               VALUES (:name, :email, :phone, :subject, :message, :newsletter, :ip_address, :submission_date)");
        
        // Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':subject', $subject);
        $stmt->bindParam(':message', $message);
        $stmt->bindParam(':newsletter', $newsletter);
        $stmt->bindParam(':ip_address', $ip_address);
        $stmt->bindParam(':submission_date', $submission_date);
        
        // Execute query
        $stmt->execute();
        
        // Send email notification
        $email_subject = "New Contact Form Submission: $subject";
        $email_body = "You have received a new message from your website's contact form.\n\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Phone: $phone\n";
        $email_body .= "Subject: $subject\n";
        $email_body .= "Message:\n$message\n";
        $email_body .= "Newsletter Signup: " . ($newsletter ? "Yes" : "No") . "\n";
        $email_body .= "IP Address: $ip_address\n";
        $email_body .= "Date: $submission_date\n";
        
        $headers = "From: $site_name <noreply@" . $_SERVER['SERVER_NAME'] . ">\r\n";
        $headers .= "Reply-To: $email\r\n";
        
        // Send the email
        mail($to_email, $email_subject, $email_body, $headers);
        
        // Set success response
        $response['success'] = true;
        $response['message'] = 'Your message has been sent successfully. I will get back to you soon.';
        
    } catch(PDOException $e) {
        $response['message'] = "Database Error: " . $e->getMessage();
        
        // Fallback to email-only if database fails
        $email_subject = "[URGENT] Contact Form Submission (DB Error)";
        $email_body = "Database storage failed, but here is the message:\n\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Phone: $phone\n";
        $email_body .= "Subject: $subject\n";
        $email_body .= "Message:\n$message\n";
        $email_body .= "Newsletter Signup: " . ($newsletter ? "Yes" : "No") . "\n";
        $email_body .= "DB Error: " . $e->getMessage() . "\n";
        
        $headers = "From: $site_name <noreply@" . $_SERVER['SERVER_NAME'] . ">\r\n";
        $headers .= "Reply-To: $email\r\n";
        
        mail($to_email, $email_subject, $email_body, $headers);
    }
    
    // Send JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
    
} else {
    // If not a POST request, redirect to homepage
    header("Location: index.html");
    exit;
}
?>
