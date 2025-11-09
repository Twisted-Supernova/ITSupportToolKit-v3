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
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
            });
        });
    }
});
