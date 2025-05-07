// Main JavaScript file
// Import modules and initialize application

import UI from './modules/ui.js';
import Effects from './modules/effects.js';
import LeadershipTest from './modules/leadership-test.js';
import EmployeeStyles from './modules/employee-styles.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded, initializing application...');
    
    // Initialize UI module
    UI.init();
    
    // Initialize page effects module
    Effects.init();
    
    // Initialize leadership test module
    LeadershipTest.init();
    
    // Initialize employee styles module
    EmployeeStyles.init();
}); 