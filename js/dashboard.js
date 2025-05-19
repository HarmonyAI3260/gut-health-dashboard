// Enhanced Dashboard.js - JavaScript for Gut Health Dashboard with JSON data integration

// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true
    });

    // Load dashboard data and initialize charts
    loadDashboardData();

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            const icon = this.querySelector("i");
            if (document.body.classList.contains("dark-mode")) {
                icon.classList.remove("bi-moon-fill");
                icon.classList.add("bi-sun-fill");
            } else {
                icon.classList.remove("bi-sun-fill");
                icon.classList.add("bi-moon-fill");
            }
        });
    }
});

// Load data from JSON file
function loadDashboardData() {
    fetch("data/dashboard-data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Store data globally
            window.dashboardData = data;
            
            // Initialize all charts with the loaded data
            initializeCharts(data);
        })
        .catch(error => {
            console.error("Error loading dashboard data:", error);
            // Initialize charts with default data if JSON loading fails
            initializeCharts(null); // Pass null or a default data structure
        });
}

// Chart configuration and initialization
function initializeCharts(data) {
    // Set default Chart.js options
    Chart.defaults.font.family = "'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif";
    Chart.defaults.font.size = 14;
    Chart.defaults.color = "#555";
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.7)";
    Chart.defaults.plugins.legend.labels.usePointStyle = true;

    // Define common colors
    const colors = {
        primary: "#0d6efd",
        secondary: "#6c757d",
        success: "#198754",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#0dcaf0",
        light: "#f8f9fa",
        dark: "#212529",
        purple: "#6f42c1",
        pink: "#d63384",
        orange: "#fd7e14",
        teal: "#20c997"
    };

    // Fallback data structure if data loading fails or data is null
    const defaultData = {
        healthImplications: {
            shortTerm: { sleepDisruption: 80, nutritionalImpact: 60, physicalDiscomfort: 70, psychologicalImpact: 50, healthRisk: 30 },
            longTerm: { sleepDisruption: 50, nutritionalImpact: 75, physicalDiscomfort: 45, psychologicalImpact: 60, healthRisk: 80 }
        },
        medicationAnalysis: {
            rifaximin: { safetyRatings: { overallSafety: 90, sideEffectRisk: 85, longTermUseSafety: 80, drugInteractionRisk: 95 }, effectiveness: { hydrogenSIBO: 85, methaneSIBO: 60, hydrogenSulfideSIBO: 50 } },
            ganaton: { safetyRatings: { overallSafety: 80, sideEffectRisk: 75, longTermUseSafety: 85, drugInteractionRisk: 80 } },
            librax: { safetyRatings: { overallSafety: 60, sideEffectRisk: 50, longTermUseSafety: 40, drugInteractionRisk: 55 } },
            econorm: { safetyRatings: { overallSafety: 95, sideEffectRisk: 90, longTermUseSafety: 95, drugInteractionRisk: 98 } },
            comparison: {
                rifaximin: { effectiveness: 90, safety: 85, cost: 50, convenience: 80, longTermUse: 75 },
                ganaton: { effectiveness: 70, safety: 80, cost: 70, convenience: 85, longTermUse: 80 },
                librax: { effectiveness: 65, safety: 60, cost: 65, convenience: 90, longTermUse: 40 },
                econorm: { effectiveness: 60, safety: 95, cost: 75, convenience: 95, longTermUse: 90 }
            }
        },
        scientificResearch: {
            siboSubtypes: { hydrogenPredominant: 40, methanePredominant: 30, hydrogenSulfidePredominant: 15, mixedType: 15 }
        },
        dietaryInterventions: {
            comparison: {
                lowFODMAP: { effectiveness: 75, difficulty: 60, scientificEvidence: 85 },
                specificCarbohydrateDiet: { effectiveness: 70, difficulty: 75, scientificEvidence: 70 },
                lowSulfurDiet: { effectiveness: 65, difficulty: 65, scientificEvidence: 50 },
                elementalDiet: { effectiveness: 90, difficulty: 95, scientificEvidence: 80 }
            }
        },
        lifestyleModifications: {
            impact: { sleepOptimization: 85, stressManagement: 80, physicalActivity: 70, mealTiming: 75, hydration: 65 }
        },
        treatmentProgress: {
            timeline: { week1: 10, week2: 30, week4: 50, week8: 70, week12: 80, week24: 90 }
        }
    };

    const chartData = data || defaultData;

    // Overview Section - Severity Chart
    const severityChartCtx = document.getElementById("severityChart");
    if (severityChartCtx) {
        new Chart(severityChartCtx, {
            type: "doughnut",
            data: {
                labels: ["Severe", "Moderate", "Mild"],
                datasets: [{
                    data: [70, 20, 10], // Example data, update if dynamic
                    backgroundColor: [colors.danger, colors.warning, colors.success],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: {
                    legend: {
                        position: "bottom"
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ": " + context.raw + "%";
                            }
                        }
                    }
                }
            }
        });
    }

    // Health Implications Section - Health Effects Chart
    const healthEffectsChartCtx = document.getElementById("healthEffectsChart");
    if (healthEffectsChartCtx) {
        const shortTerm = [
            chartData.healthImplications.shortTerm.sleepDisruption,
            chartData.healthImplications.shortTerm.nutritionalImpact,
            chartData.healthImplications.shortTerm.physicalDiscomfort,
            chartData.healthImplications.shortTerm.psychologicalImpact,
            chartData.healthImplications.shortTerm.healthRisk
        ];
        
        const longTerm = [
            chartData.healthImplications.longTerm.sleepDisruption,
            chartData.healthImplications.longTerm.nutritionalImpact,
            chartData.healthImplications.longTerm.physicalDiscomfort,
            chartData.healthImplications.longTerm.psychologicalImpact,
            chartData.healthImplications.longTerm.healthRisk
        ];
        
        new Chart(healthEffectsChartCtx, {
            type: "radar",
            data: {
                labels: ["Sleep Disruption", "Nutritional Impact", "Physical Discomfort", "Psychological Impact", "Long-term Health Risk"],
                datasets: [
                    {
                        label: "Short-term Effects",
                        data: shortTerm,
                        backgroundColor: "rgba(13, 110, 253, 0.2)",
                        borderColor: colors.primary,
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: colors.primary
                    },
                    {
                        label: "Long-term Effects",
                        data: longTerm,
                        backgroundColor: "rgba(220, 53, 69, 0.2)",
                        borderColor: colors.danger,
                        pointBackgroundColor: colors.danger,
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: colors.danger
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }

    // Medication Analysis Section - Safety Charts
    const rifaximinSafetyChartCtx = document.getElementById("rifaximinSafetyChart");
    if (rifaximinSafetyChartCtx) {
        const safetyData = [
            chartData.medicationAnalysis.rifaximin.safetyRatings.overallSafety,
            chartData.medicationAnalysis.rifaximin.safetyRatings.sideEffectRisk,
            chartData.medicationAnalysis.rifaximin.safetyRatings.longTermUseSafety,
            chartData.medicationAnalysis.rifaximin.safetyRatings.drugInteractionRisk
        ];
        
        new Chart(rifaximinSafetyChartCtx, {
            type: "bar",
            data: {
                labels: ["Overall Safety", "Side Effect Risk", "Long-term Use Safety", "Drug Interaction Risk"],
                datasets: [{
                    label: "Safety Rating (0-100)",
                    data: safetyData,
                    backgroundColor: colors.primary,
                    borderColor: "rgba(13, 110, 253, 0.7)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Safety Rating"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    const ganatonSafetyChartCtx = document.getElementById("ganatonSafetyChart");
    if (ganatonSafetyChartCtx) {
        const safetyData = [
            chartData.medicationAnalysis.ganaton.safetyRatings.overallSafety,
            chartData.medicationAnalysis.ganaton.safetyRatings.sideEffectRisk,
            chartData.medicationAnalysis.ganaton.safetyRatings.longTermUseSafety,
            chartData.medicationAnalysis.ganaton.safetyRatings.drugInteractionRisk
        ];
        
        new Chart(ganatonSafetyChartCtx, {
            type: "bar",
            data: {
                labels: ["Overall Safety", "Side Effect Risk", "Long-term Use Safety", "Drug Interaction Risk"],
                datasets: [{
                    label: "Safety Rating (0-100)",
                    data: safetyData,
                    backgroundColor: colors.info,
                    borderColor: "rgba(13, 202, 240, 0.7)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Safety Rating"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    const libraxSafetyChartCtx = document.getElementById("libraxSafetyChart");
    if (libraxSafetyChartCtx) {
        const safetyData = [
            chartData.medicationAnalysis.librax.safetyRatings.overallSafety,
            chartData.medicationAnalysis.librax.safetyRatings.sideEffectRisk,
            chartData.medicationAnalysis.librax.safetyRatings.longTermUseSafety,
            chartData.medicationAnalysis.librax.safetyRatings.drugInteractionRisk
        ];
        
        new Chart(libraxSafetyChartCtx, {
            type: "bar",
            data: {
                labels: ["Overall Safety", "Side Effect Risk", "Long-term Use Safety", "Drug Interaction Risk"],
                datasets: [{
                    label: "Safety Rating (0-100)",
                    data: safetyData,
                    backgroundColor: colors.warning,
                    borderColor: "rgba(255, 193, 7, 0.7)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Safety Rating"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    const econormSafetyChartCtx = document.getElementById("econormSafetyChart");
    if (econormSafetyChartCtx) {
        const safetyData = [
            chartData.medicationAnalysis.econorm.safetyRatings.overallSafety,
            chartData.medicationAnalysis.econorm.safetyRatings.sideEffectRisk,
            chartData.medicationAnalysis.econorm.safetyRatings.longTermUseSafety,
            chartData.medicationAnalysis.econorm.safetyRatings.drugInteractionRisk
        ];
        
        new Chart(econormSafetyChartCtx, {
            type: "bar",
            data: {
                labels: ["Overall Safety", "Side Effect Risk", "Long-term Use Safety", "Drug Interaction Risk"],
                datasets: [{
                    label: "Safety Rating (0-100)",
                    data: safetyData,
                    backgroundColor: colors.success,
                    borderColor: "rgba(25, 135, 84, 0.7)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Safety Rating"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Rifaximin Effectiveness Chart
    const rifaximinEffectivenessChartCtx = document.getElementById("rifaximinEffectivenessChart");
    if (rifaximinEffectivenessChartCtx) {
        const effectivenessData = [
            chartData.medicationAnalysis.rifaximin.effectiveness.hydrogenSIBO,
            chartData.medicationAnalysis.rifaximin.effectiveness.methaneSIBO,
            chartData.medicationAnalysis.rifaximin.effectiveness.hydrogenSulfideSIBO
        ];
        
        new Chart(rifaximinEffectivenessChartCtx, {
            type: "bar",
            data: {
                labels: ["Hydrogen SIBO", "Methane SIBO", "Hydrogen Sulfide SIBO"],
                datasets: [{
                    label: "Effectiveness (%)",
                    data: effectivenessData,
                    backgroundColor: [
                        colors.success,
                        colors.warning,
                        colors.info
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Effectiveness (%)"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Medication Comparison Chart
    const medicationComparisonChartCtx = document.getElementById("medicationComparisonChart");
    if (medicationComparisonChartCtx) {
        const rifaximinData = [
            chartData.medicationAnalysis.comparison.rifaximin.effectiveness,
            chartData.medicationAnalysis.comparison.rifaximin.safety,
            chartData.medicationAnalysis.comparison.rifaximin.cost,
            chartData.medicationAnalysis.comparison.rifaximin.convenience,
            chartData.medicationAnalysis.comparison.rifaximin.longTermUse
        ];
        
        const ganatonData = [
            chartData.medicationAnalysis.comparison.ganaton.effectiveness,
            chartData.medicationAnalysis.comparison.ganaton.safety,
            chartData.medicationAnalysis.comparison.ganaton.cost,
            chartData.medicationAnalysis.comparison.ganaton.convenience,
            chartData.medicationAnalysis.comparison.ganaton.longTermUse
        ];
        
        const libraxData = [
            chartData.medicationAnalysis.comparison.librax.effectiveness,
            chartData.medicationAnalysis.comparison.librax.safety,
            chartData.medicationAnalysis.comparison.librax.cost,
            chartData.medicationAnalysis.comparison.librax.convenience,
            chartData.medicationAnalysis.comparison.librax.longTermUse
        ];
        
        const econormData = [
            chartData.medicationAnalysis.comparison.econorm.effectiveness,
            chartData.medicationAnalysis.comparison.econorm.safety,
            chartData.medicationAnalysis.comparison.econorm.cost,
            chartData.medicationAnalysis.comparison.econorm.convenience,
            chartData.medicationAnalysis.comparison.econorm.longTermUse
        ];
        
        new Chart(medicationComparisonChartCtx, {
            type: "radar",
            data: {
                labels: ["Effectiveness", "Safety", "Cost", "Convenience", "Long-term Use"],
                datasets: [
                    {
                        label: "Rifaximin (Rifagut)",
                        data: rifaximinData,
                        backgroundColor: "rgba(13, 110, 253, 0.2)",
                        borderColor: colors.primary,
                        pointBackgroundColor: colors.primary
                    },
                    {
                        label: "Ganaton",
                        data: ganatonData,
                        backgroundColor: "rgba(13, 202, 240, 0.2)",
                        borderColor: colors.info,
                        pointBackgroundColor: colors.info
                    },
                    {
                        label: "Librax",
                        data: libraxData,
                        backgroundColor: "rgba(255, 193, 7, 0.2)",
                        borderColor: colors.warning,
                        pointBackgroundColor: colors.warning
                    },
                    {
                        label: "Econorm",
                        data: econormData,
                        backgroundColor: "rgba(25, 135, 84, 0.2)",
                        borderColor: colors.success,
                        pointBackgroundColor: colors.success
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }

    // SIBO Subtypes Chart
    const siboSubtypesChartCtx = document.getElementById("siboSubtypesChart");
    if (siboSubtypesChartCtx) {
        const subtypesData = [
            chartData.scientificResearch.siboSubtypes.hydrogenPredominant,
            chartData.scientificResearch.siboSubtypes.methanePredominant,
            chartData.scientificResearch.siboSubtypes.hydrogenSulfidePredominant,
            chartData.scientificResearch.siboSubtypes.mixedType
        ];
        
        new Chart(siboSubtypesChartCtx, {
            type: "pie",
            data: {
                labels: ["Hydrogen-predominant", "Methane-predominant", "Hydrogen Sulfide-predominant", "Mixed Type"],
                datasets: [{
                    data: subtypesData,
                    backgroundColor: [
                        colors.primary,
                        colors.success,
                        colors.info,
                        colors.purple
                    ],
                    borderWidth: 1,
                    borderColor: "#fff"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ": " + context.raw + "%";
                            }
                        }
                    }
                }
            }
        });
    }

    // Diet Comparison Chart
    const dietComparisonChartCtx = document.getElementById("dietComparisonChart");
    if (dietComparisonChartCtx) {
        const effectivenessData = [
            chartData.dietaryInterventions.comparison.lowFODMAP.effectiveness,
            chartData.dietaryInterventions.comparison.specificCarbohydrateDiet.effectiveness,
            chartData.dietaryInterventions.comparison.lowSulfurDiet.effectiveness,
            chartData.dietaryInterventions.comparison.elementalDiet.effectiveness
        ];
        
        const difficultyData = [
            chartData.dietaryInterventions.comparison.lowFODMAP.difficulty,
            chartData.dietaryInterventions.comparison.specificCarbohydrateDiet.difficulty,
            chartData.dietaryInterventions.comparison.lowSulfurDiet.difficulty,
            chartData.dietaryInterventions.comparison.elementalDiet.difficulty
        ];
        
        const evidenceData = [
            chartData.dietaryInterventions.comparison.lowFODMAP.scientificEvidence,
            chartData.dietaryInterventions.comparison.specificCarbohydrateDiet.scientificEvidence,
            chartData.dietaryInterventions.comparison.lowSulfurDiet.scientificEvidence,
            chartData.dietaryInterventions.comparison.elementalDiet.scientificEvidence
        ];
        
        new Chart(dietComparisonChartCtx, {
            type: "bar",
            data: {
                labels: ["Low FODMAP", "Specific Carbohydrate Diet", "Low Sulfur Diet", "Elemental Diet"],
                datasets: [
                    {
                        label: "Effectiveness",
                        data: effectivenessData,
                        backgroundColor: colors.success
                    },
                    {
                        label: "Difficulty",
                        data: difficultyData,
                        backgroundColor: colors.danger
                    },
                    {
                        label: "Scientific Evidence",
                        data: evidenceData,
                        backgroundColor: colors.primary
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Rating (0-100)"
                        }
                    }
                }
            }
        });
    }

    // Lifestyle Impact Chart
    const lifestyleImpactChartCtx = document.getElementById("lifestyleImpactChart");
    if (lifestyleImpactChartCtx) {
        const impactData = [
            chartData.lifestyleModifications.impact.sleepOptimization,
            chartData.lifestyleModifications.impact.stressManagement,
            chartData.lifestyleModifications.impact.physicalActivity,
            chartData.lifestyleModifications.impact.mealTiming,
            chartData.lifestyleModifications.impact.hydration
        ];
        
        new Chart(lifestyleImpactChartCtx, {
            type: "bar",
            data: {
                labels: ["Sleep Optimization", "Stress Management", "Physical Activity", "Meal Timing", "Hydration"],
                datasets: [{
                    label: "Impact on Gut Health",
                    data: impactData,
                    backgroundColor: [
                        colors.primary,
                        colors.success,
                        colors.warning,
                        colors.info,
                        colors.purple
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Impact Level (%)"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Progress Timeline Chart
    const progressTimelineChartCtx = document.getElementById("progressTimelineChart");
    if (progressTimelineChartCtx) {
        const timelineData = [
            chartData.treatmentProgress.timeline.week1,
            chartData.treatmentProgress.timeline.week2,
            chartData.treatmentProgress.timeline.week4,
            chartData.treatmentProgress.timeline.week8,
            chartData.treatmentProgress.timeline.week12,
            chartData.treatmentProgress.timeline.week24
        ];
        
        new Chart(progressTimelineChartCtx, {
            type: "line",
            data: {
                labels: ["Week 1", "Week 2", "Week 4", "Week 8", "Week 12", "Week 24"],
                datasets: [{
                    label: "Expected Symptom Reduction",
                    data: timelineData,
                    fill: true,
                    backgroundColor: "rgba(13, 110, 253, 0.1)",
                    borderColor: colors.primary,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Symptom Reduction (%)"
                        }
                    }
                }
            }
        });
    }
}

// Add smooth scrolling for navigation links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                behavior: "smooth"
            });
            
            // Update active state in navbar
            document.querySelectorAll(".nav-link").forEach(navLink => {
                navLink.classList.remove("active");
            });
            this.classList.add("active");
        }
    });
});

// Print functionality
document.addEventListener("DOMContentLoaded", function() {
    const printButtons = document.querySelectorAll(".print-button");
    if (printButtons) {
        printButtons.forEach(button => {
            button.addEventListener("click", function() {
                window.print();
            });
        });
    }
});

// Tooltip initialization
document.addEventListener("DOMContentLoaded", function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll("[data-bs-toggle='tooltip']"));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Create placeholder image for breath test sample
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, 180);
    ctx.lineTo(280, 180);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = "#333";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    for (let i = 0; i <= 120; i += 20) {
        const x = 40 + (i * 2);
        ctx.fillText(i, x, 195);
    }
    
    ctx.textAlign = "right";
    for (let i = 0; i <= 100; i += 20) {
        const y = 180 - (i * 1.6);
        ctx.fillText(i, 35, y + 5);
    }
    
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Time (minutes)", 160, 195);
    
    ctx.save();
    ctx.translate(15, 100);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("PPM", 0, 0);
    ctx.restore();
    
    ctx.beginPath();
    ctx.moveTo(40, 180);
    ctx.lineTo(60, 170);
    ctx.lineTo(80, 160);
    ctx.lineTo(100, 130);
    ctx.lineTo(120, 90);
    ctx.lineTo(140, 70);
    ctx.lineTo(160, 60);
    ctx.lineTo(180, 50);
    ctx.lineTo(200, 45);
    ctx.lineTo(220, 40);
    ctx.lineTo(240, 35);
    ctx.lineTo(260, 30);
    ctx.lineTo(280, 25);
    ctx.strokeStyle = "#0d6efd";
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(40, 170);
    ctx.lineTo(60, 165);
    ctx.lineTo(80, 160);
    ctx.lineTo(100, 155);
    ctx.lineTo(120, 150);
    ctx.lineTo(140, 145);
    ctx.lineTo(160, 140);
    ctx.lineTo(180, 135);
    ctx.lineTo(200, 130);
    ctx.lineTo(220, 125);
    ctx.lineTo(240, 120);
    ctx.lineTo(260, 115);
    ctx.lineTo(280, 110);
    ctx.strokeStyle = "#198754";
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.fillStyle = "#0d6efd";
    ctx.fillRect(180, 30, 15, 5);
    ctx.fillStyle = "#333";
    ctx.textAlign = "left";
    ctx.fillText("Hydrogen", 200, 35);
    
    ctx.fillStyle = "#198754";
    ctx.fillRect(180, 45, 15, 5);
    ctx.fillStyle = "#333";
    ctx.fillText("Methane", 200, 50);
    
    const dataUrl = canvas.toDataURL("image/png");
    
    const breathTestImages = document.querySelectorAll("img[alt='Sample Breath Test Results']");
    breathTestImages.forEach(img => {
        img.src = dataUrl;
    });
});
