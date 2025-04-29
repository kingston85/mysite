/**
 * EPA Dashboard - UI Interactions
 * This file contains UI-related JavaScript for the dashboard
 */

// Initialize the dashboard UI once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide the preloader after 1.5 seconds
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1500);
    
    // Set up tool cards interactions
    setupToolCards();
    
    // Set up file upload functionality
    setupFileUpload();
    
    // Set up modal interactions
    setupModals();
    
    // Set up configuration panel buttons
    setupConfigButtons();
    
    // Set up utility buttons (export, print, etc.)
    setupUtilityButtons();
    
    // Set up dark mode toggle
    setupDarkMode();
    
    // Set up scrolling effects
    setupScrollingEffects();
    
    // Set up mobile navigation
    setupMobileNavigation();
});

/**
 * Set up interactions for tool cards
 */
function setupToolCards() {
    const uploadTool = document.getElementById('upload-tool');
    const templateTool = document.getElementById('template-tool');
    const reportTool = document.getElementById('report-tool');
    const settingsTool = document.getElementById('settings-tool');
    
    if (uploadTool) {
        uploadTool.addEventListener('click', () => {
            const uploadSection = document.getElementById('data-upload-section');
            if (uploadSection) {
                uploadSection.style.display = 'block';
            }
            showToast('Upload your data to visualize it on the dashboard.', 'info');
        });
    }
    
    if (templateTool) {
        templateTool.addEventListener('click', () => {
            const templatesModal = document.getElementById('templates-modal');
            if (templatesModal) {
                templatesModal.classList.add('active');
            }
        });
    }
    
    if (reportTool) {
        reportTool.addEventListener('click', () => {
            showToast('Report generation is being prepared...', 'info');
            // Simulating report generation process
            setTimeout(() => {
                showToast('Report successfully generated!', 'success');
            }, 2000);
        });
    }
    
    if (settingsTool) {
        settingsTool.addEventListener('click', () => {
            const settingsModal = document.getElementById('settings-modal');
            if (settingsModal) {
                settingsModal.classList.add('active');
            }
        });
    }
}

/**
 * Set up file upload functionality
 */
function setupFileUpload() {
    const uploadContainer = document.getElementById('upload-container');
    const fileInput = document.getElementById('file-input');
    
    if (uploadContainer && fileInput) {
        // Handle file selection via input
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                
                // Check file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    showToast('File is too large. Maximum size is 10MB.', 'error');
                    return;
                }
                
                // Process file based on extension
                const fileExtension = file.name.split('.').pop().toLowerCase();
                
                if (['csv', 'xlsx', 'xls', 'json'].includes(fileExtension)) {
                    showToast(`Processing ${file.name}... Please wait.`, 'info');
                    
                    // Simulate successful file processing
                    setTimeout(() => {
                        showToast('File processed successfully!', 'success');
                        toggleConfigSection(true);
                    }, 1500);
                } else {
                    showToast('Unsupported file format. Please upload CSV, Excel, or JSON files.', 'error');
                }
            }
        });
        
        // Handle file selection via click
        uploadContainer.addEventListener('click', () => {
            fileInput.click();
        });
        
        // Handle drag and drop
        uploadContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadContainer.style.borderColor = '#2c6e49';
            uploadContainer.style.backgroundColor = 'rgba(44, 110, 73, 0.1)';
        });
        
        uploadContainer.addEventListener('dragleave', () => {
            uploadContainer.style.borderColor = '#4c956c';
            uploadContainer.style.backgroundColor = '';
        });
        
        uploadContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadContainer.style.borderColor = '#4c956c';
            uploadContainer.style.backgroundColor = '';
            
            if (e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];
                
                // Check file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    showToast('File is too large. Maximum size is 10MB.', 'error');
                    return;
                }
                
                // Process file based on extension
                const fileExtension = file.name.split('.').pop().toLowerCase();
                
                if (['csv', 'xlsx', 'xls', 'json'].includes(fileExtension)) {
                    showToast(`Processing ${file.name}... Please wait.`, 'info');
                    
                    // Simulate successful file processing
                    setTimeout(() => {
                        showToast('File processed successfully!', 'success');
                        toggleConfigSection(true);
                    }, 1500);
                } else {
                    showToast('Unsupported file format. Please upload CSV, Excel, or JSON files.', 'error');
                }
            }
        });
    }
}

/**
 * Set up modal interactions
 */
function setupModals() {
    // Close buttons for all modals
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    if (modalCloseButtons) {
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modals = document.querySelectorAll('.modal-overlay');
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
            });
        });
    }
    
    // Close modals when clicking outside
    const modals = document.querySelectorAll('.modal-overlay');
    if (modals) {
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }
}

/**
 * Set up configuration panel buttons
 */
function setupConfigButtons() {
    // Apply configuration button
    const applyConfigBtn = document.getElementById('apply-config-btn');
    if (applyConfigBtn) {
        applyConfigBtn.addEventListener('click', () => {
            showToast('Dashboard configuration updated.', 'success');
        });
    }
    
    // Reset configuration button
    const resetConfigBtn = document.getElementById('reset-config-btn');
    if (resetConfigBtn) {
        resetConfigBtn.addEventListener('click', () => {
            const chartTypeSelect = document.getElementById('chart-type');
            const dataCategorySelect = document.getElementById('data-category');
            
            if (chartTypeSelect) chartTypeSelect.value = 'bar';
            if (dataCategorySelect) dataCategorySelect.value = 'license';
            
            showToast('Configuration reset to defaults.', 'info');
        });
    }
}

/**
 * Set up utility buttons (export, print, etc.)
 */
function setupUtilityButtons() {
    // Export data button
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            showToast('Preparing data for export...', 'info');
            
            // Simulate export process
            setTimeout(() => {
                showToast('Data exported successfully!', 'success');
            }, 1500);
        });
    }
    
    // Print dashboard button
    const printBtn = document.getElementById('print-dashboard-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

/**
 * Set up dark mode toggle
 */
function setupDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'disabled');
            }
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

/**
 * Set up scrolling effects
 */
function setupScrollingEffects() {
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Set up mobile navigation
 */
function setupMobileNavigation() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

/**
 * Toggle the data configuration section
 * @param {boolean} show - Whether to show the section
 */
function toggleConfigSection(show) {
    const configSection = document.getElementById('data-config-section');
    if (configSection) {
        configSection.style.display = show ? 'block' : 'none';
    }
}

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (info, success, error, warning)
 */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconClass = '';
        switch (type) {
            case 'success':
                iconClass = 'fas fa-check-circle';
                break;
            case 'error':
                iconClass = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                iconClass = 'fas fa-exclamation-triangle';
                break;
            default:
                iconClass = 'fas fa-info-circle';
        }
        
        toast.innerHTML = `
            <i class="${iconClass} toast-icon"></i>
            <div>${message}</div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show the toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove the toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }
}
