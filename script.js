/**
 * Red Dead Redemption 2 - Main Navigation Script
 */

class NavigationManager {
    constructor() {
        this.hamburgerBtn = document.getElementById('hamburgerBtn');
        this.hamburgerMenu = document.getElementById('hamburgerMenu');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        this.setupHamburgerMenu();
        this.setupDropdowns();
        this.setupDesktopDropdowns();
    }
    
    setupHamburgerMenu() {
        if (!this.hamburgerBtn || !this.hamburgerMenu) return;
        
        this.updateMenuPosition();
        window.addEventListener('resize', () => this.updateMenuPosition());
        
        this.hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            this.updateMenuPosition();
            const isActive = this.hamburgerMenu.classList.toggle('active');
            this.body.style.overflow = isActive ? 'hidden' : '';
            this.toggleHamburgerIcon(isActive);
        });
        
        document.addEventListener('click', (e) => {
            if (this.hamburgerMenu.classList.contains('active') && 
                !this.hamburgerMenu.contains(e.target) && 
                !this.hamburgerBtn.contains(e.target)) {
                this.closeHamburgerMenu();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.hamburgerMenu.classList.contains('active')) {
                this.closeHamburgerMenu();
            }
        });
        
        const menuLinks = this.hamburgerMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => this.closeHamburgerMenu());
        });
    }
    
    updateMenuPosition() {
        if (!this.hamburgerMenu) return;
        
        const header = document.querySelector('.header');
        if (header) {
            const headerHeight = header.offsetHeight;
            this.hamburgerMenu.style.paddingTop = `${headerHeight}px`;
        }
    }
    
    toggleHamburgerIcon(isActive) {
        const hamburgerIcon = this.hamburgerBtn.querySelector('img');
        if (!hamburgerIcon) return;
        
        if (isActive) {
            hamburgerIcon.alt = 'Close menu';
        } else {
            hamburgerIcon.src = './assets/icons/menu.svg';
            hamburgerIcon.alt = 'Menu';
        }
    }
    
    closeHamburgerMenu() {
        if (!this.hamburgerMenu) return;
        
        this.hamburgerMenu.classList.remove('active');
        this.body.style.overflow = '';
        this.toggleHamburgerIcon(false);
    }
    
    setupDropdowns() {
        const hamburgerDropdownBtns = document.querySelectorAll('.hamburger-dropdown-btn');
        
        hamburgerDropdownBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdown = this.parentElement;
                const wasActive = dropdown.classList.contains('active');
                
                hamburgerDropdownBtns.forEach(otherBtn => {
                    if (otherBtn !== this) {
                        otherBtn.parentElement.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            });
        });
    }
    
    setupDesktopDropdowns() {
        const desktopDropdowns = document.querySelectorAll('.desktop__list-element');
        
        desktopDropdowns.forEach(dropdown => {
            let timeout;
            
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = 'none';
                }, 200);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});