// Mobile-specific functionality for StockArt
class MobileHandler {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isTablet = this.detectTablet();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        
        this.init();
    }

    init() {
        if (this.isMobile || this.isTablet) {
            this.setupMobileUI();
            this.setupTouchEvents();
            this.setupViewportHandling();
        }
        
        this.setupSidebarToggle();
        this.setupResponsiveBreakpoints();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    detectTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    }

    setupMobileUI() {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Disable hover effects on mobile
        if (this.isMobile) {
            document.body.classList.add('no-hover');
        }

        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', this.preventZoom);
            input.addEventListener('blur', this.restoreZoom);
        });
    }

    setupTouchEvents() {
        // Swipe to toggle sidebar
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!e.changedTouches) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - this.touchStartX;
            const deltaY = Math.abs(touchEndY - this.touchStartY);
            
            // Only register horizontal swipes
            if (Math.abs(deltaX) > 50 && deltaY < 100) {
                if (deltaX > 0 && this.touchStartX < 50) {
                    // Swipe right from left edge - open sidebar
                    this.openSidebar();
                } else if (deltaX < -50 && this.sidebar?.classList.contains('open')) {
                    // Swipe left - close sidebar
                    this.closeSidebar();
                }
            }
        }, { passive: true });

        // Close sidebar when tapping outside
        document.addEventListener('touchstart', (e) => {
            if (this.sidebar?.classList.contains('open') && 
                !this.sidebar.contains(e.target)) {
                this.closeSidebar();
            }
        }, { passive: true });
    }

    setupViewportHandling() {
        // Handle viewport changes (keyboard show/hide)
        let initialViewportHeight = window.innerHeight;
        
        window.addEventListener('resize', () => {
            const currentHeight = window.innerHeight;
            const heightDifference = initialViewportHeight - currentHeight;
            
            // If height decreased significantly, keyboard is likely open
            if (heightDifference > 150) {
                document.body.classList.add('keyboard-open');
            } else {
                document.body.classList.remove('keyboard-open');
            }
        });

        // Prevent bounce scrolling on iOS
        document.addEventListener('touchmove', (e) => {
            if (e.scale && e.scale !== 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    setupSidebarToggle() {
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }

    setupResponsiveBreakpoints() {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            
            // Remove all breakpoint classes
            document.body.classList.remove('mobile-small', 'mobile-large', 'tablet', 'desktop');
            
            if (width < 480) {
                document.body.classList.add('mobile-small');
            } else if (width < 768) {
                document.body.classList.add('mobile-large');
            } else if (width < 1024) {
                document.body.classList.add('tablet');
            } else {
                document.body.classList.add('desktop');
            }
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
    }

    toggleSidebar() {
        if (this.sidebar?.classList.contains('open')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        this.sidebar?.classList.add('open');
        document.body.classList.add('sidebar-open');
        
        // Add backdrop
        if (!document.querySelector('.sidebar-backdrop')) {
            const backdrop = document.createElement('div');
            backdrop.className = 'sidebar-backdrop';
            backdrop.addEventListener('click', () => this.closeSidebar());
            document.body.appendChild(backdrop);
        }
    }

    closeSidebar() {
        this.sidebar?.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        
        // Remove backdrop
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }

    preventZoom(e) {
        // Temporarily set viewport to prevent zoom
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }

    restoreZoom(e) {
        // Restore normal viewport behavior
        setTimeout(() => {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 
                    'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no');
            }
        }, 100);
    }
}

// Initialize mobile handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mobileHandler = new MobileHandler();
});
