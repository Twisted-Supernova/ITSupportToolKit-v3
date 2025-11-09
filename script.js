// Burger menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking a direct link (not dropdown)
        const directLinks = navMenu.querySelectorAll('a:not(.nav-dropdown-content a)');
        directLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
            });
        });

        // Handle mobile dropdown clicks
        const dropdownBtns = navMenu.querySelectorAll('.nav-dropdown-btn');
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Only on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = btn.closest('.nav-dropdown');
                    dropdown.classList.toggle('mobile-open');
                }
            });
        });

        // Close dropdowns when clicking dropdown links on mobile
        const dropdownLinks = navMenu.querySelectorAll('.nav-dropdown-content a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                // Close all dropdowns
                navMenu.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('mobile-open');
                });
            });
        });
    }
});
