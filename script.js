/**
 * ==========================================================================
 * HIGH-PERFORMANCE INTERACTIVE CONTROLLER SYSTEM
 * Architecture: Functional Factory Design & Observer Orchestration
 * ==========================================================================
 */

"use strict";

// Global Ecosystem State Core Container
const UI_STATE_REGISTRY = {
    scrollPosition: { current: 0, target: 0, last: 0 },
    cursorPosition: { x: 0, y: 0, targetX: 0, targetY: 0 },
    activePortalId: null,
    isMenuThrottled: false,
    runtimeEpoch: Date.now()
};

// Global Performance Config Tokens
const ENGINE_CONFIG = {
    interpolationFactor: 0.08, // Smoothness friction coefficient
    scrollThreshold: 60,       // Navbar transform boundary
    intersectionOptions: {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.15
    }
};

/**
 * ==========================================================================
 * MODULE 1: MODERN CUSTOM INTERACTIVE CURSOR CONTROLLER
 * Handles hardware-accelerated precision follower micro-movements
 * ==========================================================================
 */
const CoreCursorEngine = (() => {
    const dot = document.querySelector('.custom-cursor-dot');
    const outline = document.querySelector('.custom-cursor-outline');
    
    if (!dot || !outline) return { init: () => {} };

    const cachePositions = (e) => {
        UI_STATE_REGISTRY.cursorPosition.targetX = e.clientX;
        UI_STATE_REGISTRY.cursorPosition.targetY = e.clientY;
        
        // Unhide elements on first touch interface transaction
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    };

    const renderLoop = () => {
        // Linear Interpolation calculation (lerp)
        UI_STATE_REGISTRY.cursorPosition.x += (UI_STATE_REGISTRY.cursorPosition.targetX - UI_STATE_REGISTRY.cursorPosition.x) * ENGINE_CONFIG.interpolationFactor;
        UI_STATE_REGISTRY.cursorPosition.y += (UI_STATE_REGISTRY.cursorPosition.targetY - UI_STATE_REGISTRY.cursorPosition.y) * ENGINE_CONFIG.interpolationFactor;

        // Apply hardware transformation pipelines
        dot.style.transform = `translate3d(${UI_STATE_REGISTRY.cursorPosition.targetX}px, ${UI_STATE_REGISTRY.cursorPosition.targetY}px, 0) translate(-50%, -50%)`;
        outline.style.transform = `translate3d(${UI_STATE_REGISTRY.cursorPosition.x}px, ${UI_STATE_REGISTRY.cursorPosition.y}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(renderLoop);
    };

    const bindCursorHoverInteractions = () => {
        const interactiveTargets = document.querySelectorAll('a, button, .production-grid-item-card-element, .field-input-element-node');
        
        interactiveTargets.forEach(node => {
            node.addEventListener('mouseenter', () => {
                outline.style.width = '48px';
                outline.style.height = '48px';
                outline.style.backgroundColor = 'rgba(124, 58, 237, 0.08)';
                outline.style.borderColor = 'var(--accent-purple)';
            });
            
            node.addEventListener('mouseleave', () => {
                outline.style.width = '26px';
                outline.style.height = '26px';
                outline.style.backgroundColor = 'transparent';
                outline.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
        });
    };

    return {
        init: () => {
            window.addEventListener('mousemove', cachePositions);
            requestAnimationFrame(renderLoop);
            bindCursorHoverInteractions();
            
            // Dynamic Mutation Observer to track fresh nodes appended later
            const DOMObserver = new MutationObserver(() => bindCursorHoverInteractions());
            DOMObserver.observe(document.body, { childList: true, subtree: true });
        }
    };
})();

/**
 * ==========================================================================
 * MODULE 2: SCROLL VIEWPORT TELEMETRY & SMOOTH LINK NAVIGATION
 * Controls sticky parameters, track metrics, and scroll threshold states
 * ==========================================================================
 */
const ViewportScrollEngine = (() => {
    const navbar = document.querySelector('.navbar-frame');
    const scrollNodes = document.querySelectorAll('.nav-anchor-link, .footer-navigation-link');

    const evalNavbarThreshold = () => {
        UI_STATE_REGISTRY.scrollPosition.current = window.scrollY;
        
        if (UI_STATE_REGISTRY.scrollPosition.current > ENGINE_CONFIG.scrollThreshold) {
            navbar.style.backgroundColor = '#0b0c10';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'var(--bg-surface-nav)';
            navbar.style.borderBottomColor = 'var(--border-dim)';
            navbar.style.boxShadow = 'none';
        }
    };

    const attachSmoothNavigation = () => {
        scrollNodes.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };

    return {
        init: () => {
            window.addEventListener('scroll', () => {
                if (!UI_STATE_REGISTRY.isMenuThrottled) {
                    window.requestAnimationFrame(() => {
                        evalNavbarThreshold();
                        UI_STATE_REGISTRY.isMenuThrottled = false;
                    });
                    UI_STATE_REGISTRY.isMenuThrottled = true;
                }
            });
            attachSmoothNavigation();
        }
    };
})();

/**
 * ==========================================================================
 * MODULE 3: INTERSECTION OBSERVER FOR TEXT OVERLAYS & CARD REVEALS
 * Hardware-accelerated fading and staggered cinematic transforms
 * ==========================================================================
 */
const CinematicRevealEngine = (() => {
    const registerRevealNodes = () => {
        const elementsToReveal = document.querySelectorAll(
            '.hero-primary-display-heading, .hero-secondary-description-string, ' +
            '.production-grid-item-card-element, .metric-counter-individual-card, ' +
            '.service-linear-row-item-wrapper, .publication-modular-card-item'
        );

        // Standard dynamic inline style injection for transitions
        elementsToReveal.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
            el.style.transitionDelay = `${(index % 3) * 0.05}s`;
        });

        const callbackObserver = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Kill resource tracking after trigger
                }
            });
        };

        const nativeObserver = new IntersectionObserver(callbackObserver, ENGINE_CONFIG.intersectionOptions);
        elementsToReveal.forEach(node => nativeObserver.observe(node));
    };

    return {
        init: () => registerRevealNodes()
    };
})();

/**
 * ==========================================================================
 * MODULE 4: SYSTEM INSPECTION DIALOG MODAL CONTROLLER
 * Asynchronously manages complex dynamic data overlay structures
 * ==========================================================================
 */
const PortalOverlayController = (() => {
    const backdrop = document.querySelector('.system-inspection-portal-overlay-backdrop');
    const closeBtn = document.querySelector('.portal-close-trigger-action-btn');
    const projectTriggers = document.querySelectorAll('.mask-layer-inspection-btn');
    
    // Dynamic payload register to populate text overlays inside the portal
    const internalPayloads = {
        "travelista": {
            title: "Premium Travel Management",
            tech: "HTML5 / CSS3 Grid Architecture / Javascript",
            desc: "Custom booking engines parsing asynchronous parameters with minimal layout shifting metric configurations. Engineered specifically with fluid media canvas elements."
        },
        "fintrack": {
            title: "Quantum Dashboard Identity",
            tech: "Vanilla JavaScript Modules / Modern Web API",
            desc: "Enterprise data visualization graphs processing telemetric vectors. Built featuring modular layouts with advanced functional state encapsulation models."
        }
    };

    const togglePortalState = (targetId = null) => {
        if (!backdrop) return;

        if (targetId && internalPayloads[targetId]) {
            const data = internalPayloads[targetId];
            document.querySelector('.portal-primary-project-title').textContent = data.title;
            document.querySelector('.portal-secondary-tech-stack-string').textContent = data.tech;
            document.querySelector('.portal-extended-details-paragraph-body-string').textContent = data.desc;
            
            backdrop.classList.add('portal-visible');
            UI_STATE_REGISTRY.activePortalId = targetId;
        } else {
            backdrop.classList.remove('portal-visible');
            UI_STATE_REGISTRY.activePortalId = null;
        }
    };

    return {
        init: () => {
            if (!backdrop) return;

            projectTriggers.forEach((trigger, idx) => {
                // Infer internal ID based on sequential order or structure
                const computedId = idx === 0 ? "travelista" : "fintrack";
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    togglePortalState(computedId);
                });
            });

            closeBtn?.addEventListener('click', () => togglePortalState());
            
            // Backdrop dismissal logic
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) togglePortalState();
            });

            // Accessibility Esc key close capture
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && UI_STATE_REGISTRY.activePortalId) togglePortalState();
            });
        }
    };
})();

/**
 * ==========================================================================
 * MODULE 5: REALTIME CLOCK & FORMS PARSER METRICS
 * Displays system synchronization updates and validates layout telemetry
 * ==========================================================================
 */
const SystemMetricsEngine = (() => {
    const clockElement = document.querySelector('.clock-numeric-string');
    const formElement = document.querySelector('.form-semantic-grid-layout');

    const runLiveClock = () => {
        if (!clockElement) return;
        
        const updateTime = () => {
            const now = new Date();
            const formatString = now.toLocaleTimeString('en-US', { hour12: false });
            clockElement.textContent = `${formatString} GMT+5`; // Matching Karachi localized viewport
        };
        
        setInterval(updateTime, 1000);
        updateTime();
    };

    const interceptSecureForm = () => {
        if (!formElement) return;

        formElement.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-submission-action-trigger-btn');
            const originalText = submitBtn.innerHTML;
            
            // Collect Form Inputs functional mapping
            const formData = new FormData(this);
            const dataPayload = Object.fromEntries(formData.entries());

            // Basic validation check
            if (!dataPayload.client_email || !dataPayload.client_name) {
                alert("Core variables missing. Please fill necessary parameters.");
                return;
            }

            // Pseudo-asynchronous secure dispatch simulation
            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Processing Terminal Sync...</span>`;
                
                await new Promise(resolve => setTimeout(resolve, 1400));
                
                submitBtn.innerHTML = `<span>Transmission Success ✓</span>`;
                this.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 3000);

            } catch (err) {
                console.error("Critical telemetry error:", err);
                submitBtn.innerHTML = `<span>Error Dispatching</span>`;
            }
        });
    };

    return {
        init: () => {
            runLiveClock();
            interceptSecureForm();
        }
    };
})();

/**
 * ==========================================================================
 * MASTER INITIALIZER ROOT PIPELINE
 * Fires layout bootstrapping sequence as soon as DOM lifecycle signals Ready
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    const systemsRegistry = [
        CoreCursorEngine,
        ViewportScrollEngine,
        CinematicRevealEngine,
        PortalOverlayController,
        SystemMetricsEngine
    ];

    // Core execution pipeline initialization
    systemsRegistry.forEach(system => {
        try {
            system.init();
        } catch (initializationFault) {
            console.error("System pipeline failed initialization safely:", initializationFault);
        }
    });
});


/**
 * Core Layout Module 06: Transmit Telemetry Input Contact Pipeline
 * Handles submission capture and logs values to console cleanly.
 */
function handleTelemetryFormPipeline(event) {
    // 1. Default page refresh ko block karo
    event.preventDefault();

    // 2. Form element aur button select karo user interaction feedback ke liye
    const formElement = document.getElementById('portfolioTelemetryForm');
    const submitBtn = document.getElementById('formSubmitTriggerBtn');
    const statusReturn = document.getElementById('formPipelineStatusReturn');

    // 3. Har specific input field se data nikalwao
    const clientName = document.getElementById('formClientName').value;
    const clientEmail = document.getElementById('formClientEmail').value;
    const projectTier = document.getElementById('formProjectTier').value;
    const projectTierText = document.getElementById('formProjectTier').options[document.getElementById('formProjectTier').selectedIndex].text;
    const messagePayload = document.getElementById('formMessagePayload').value;

    // 4. Saare data ko ek premium structure object mein compile karo
    const telemetryPayload = {
        meta: {
            pipelineId: "TELEMETRY_STREAM_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            timestamp: new Date().toLocaleString(),
            status: "CAPTURED"
        },
        data: {
            identityName: clientName,
            networkEmail: clientEmail,
            deploymentObjectiveKey: projectTier,
            deploymentObjectiveLabel: projectTierText,
            transmitMessagePayload: messagePayload
        }
    };

    // 5. BOOM! Console mein data print karwao cyber-punk thematic style me
    console.log("%c==================================================", "color: #7c3aed; font-weight: bold;");
    console.log(`%c[📡] TELEMETRY PIPELINE STREAM TRANSMITTED`, "color: #4f46e5; font-weight: bold; font-size: 12px;");
    console.log("%c==================================================", "color: #7c3aed; font-weight: bold;");
    console.dir(telemetryPayload);
    console.log("%c==================================================", "color: #7c3aed; font-weight: bold;");

    // 6. Optional UI Shashka: User ko screen par feedback dikhane ke liye
    if (statusReturn) {
        statusReturn.style.color = "#a5b4fc";
        statusReturn.style.fontSize = "13px";
        statusReturn.style.fontFamily = "'Space Grotesk', sans-serif";
        statusReturn.innerText = "✓ Stream transmitted to console.";
        
        // 3 seconds baad text gayab karne ke liye
        setTimeout(() => {
            statusReturn.innerText = "";
        }, 4000);
    }

    // 7. Form ko wapas empty/reset karne ke liye
    formElement.reset();
}

const messagePayload = document.getElementById('formMessagePayload').value;