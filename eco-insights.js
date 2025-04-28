// Eco insights functionality
class EcoInsights {
    constructor() {
        this.ecoData = JSON.parse(localStorage.getItem('ecoData')) || this.initializeEcoData();
        this.tips = this.getEcoTips();
        this.initializeEventListeners();
        this.renderEcoInsights();
        this.updateImpactMetrics();
    }

    initializeEcoData() {
        return {
            carbonFootprint: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                yearly: 0
            },
            waterUsage: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                yearly: 0
            },
            wasteReduction: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                yearly: 0
            },
            energyConsumption: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                yearly: 0
            }
        };
    }

    getEcoTips() {
        return [
            {
                category: 'energy',
                tips: [
                    'Switch to LED light bulbs to save up to 90% on lighting costs',
                    'Use natural light during daytime hours',
                    'Unplug electronics when not in use',
                    'Set your thermostat to an energy-efficient temperature'
                ]
            },
            {
                category: 'water',
                tips: [
                    'Fix leaky faucets to save gallons of water',
                    'Take shorter showers',
                    'Install water-efficient fixtures',
                    'Collect rainwater for plants'
                ]
            },
            {
                category: 'waste',
                tips: [
                    'Use reusable bags for shopping',
                    'Compost food waste',
                    'Buy in bulk to reduce packaging',
                    'Choose products with minimal packaging'
                ]
            },
            {
                category: 'transportation',
                tips: [
                    'Use public transportation when possible',
                    'Carpool for work or school',
                    'Maintain proper tire pressure',
                    'Combine multiple errands into one trip'
                ]
            }
        ];
    }

    initializeEventListeners() {
        // Eco data input form
        const ecoDataForm = document.getElementById('ecoDataForm');
        if (ecoDataForm) {
            ecoDataForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateEcoData();
            });
        }

        // Tip category filter
        const tipFilter = document.getElementById('tipFilter');
        if (tipFilter) {
            tipFilter.addEventListener('change', () => {
                this.renderEcoTips(tipFilter.value);
            });
        }
    }

    updateEcoData() {
        const formData = new FormData(document.getElementById('ecoDataForm'));
        const date = new Date().toISOString().split('T')[0];

        // Update daily metrics
        this.ecoData.carbonFootprint.daily = parseFloat(formData.get('carbonFootprint')) || 0;
        this.ecoData.waterUsage.daily = parseFloat(formData.get('waterUsage')) || 0;
        this.ecoData.wasteReduction.daily = parseFloat(formData.get('wasteReduction')) || 0;
        this.ecoData.energyConsumption.daily = parseFloat(formData.get('energyConsumption')) || 0;

        // Update weekly, monthly, and yearly totals
        this.updateAggregateMetrics();

        this.saveEcoData();
        this.renderEcoInsights();
        this.updateImpactMetrics();
        showToast('Eco data updated successfully!', 'success');
    }

    updateAggregateMetrics() {
        const metrics = ['carbonFootprint', 'waterUsage', 'wasteReduction', 'energyConsumption'];
        
        metrics.forEach(metric => {
            this.ecoData[metric].weekly = this.ecoData[metric].daily * 7;
            this.ecoData[metric].monthly = this.ecoData[metric].daily * 30;
            this.ecoData[metric].yearly = this.ecoData[metric].daily * 365;
        });
    }

    calculateImpactScore() {
        const weights = {
            carbonFootprint: 0.4,
            waterUsage: 0.2,
            wasteReduction: 0.2,
            energyConsumption: 0.2
        };

        let score = 0;
        Object.keys(weights).forEach(metric => {
            const normalizedValue = this.normalizeMetric(this.ecoData[metric].daily);
            score += normalizedValue * weights[metric];
        });

        return Math.round(score * 100);
    }

    normalizeMetric(value) {
        // Simple normalization function - can be adjusted based on specific metrics
        const maxValue = 100; // Example maximum value
        return Math.min(value / maxValue, 1);
    }

    getImpactLevel(score) {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Improvement';
    }

    renderEcoInsights() {
        const insightsContainer = document.getElementById('ecoInsightsContainer');
        if (!insightsContainer) return;

        const impactScore = this.calculateImpactScore();
        const impactLevel = this.getImpactLevel(impactScore);

        insightsContainer.innerHTML = `
            <div class="eco-score-card">
                <h3>Your Eco Impact Score</h3>
                <div class="eco-score">${impactScore}</div>
                <div class="eco-level">${impactLevel}</div>
            </div>
            <div class="eco-metrics">
                <div class="metric-card">
                    <h4>Carbon Footprint</h4>
                    <div class="metric-value">${this.ecoData.carbonFootprint.daily} kg/day</div>
                    <div class="metric-trend">${this.getTrendIndicator(this.ecoData.carbonFootprint.daily)}</div>
                </div>
                <div class="metric-card">
                    <h4>Water Usage</h4>
                    <div class="metric-value">${this.ecoData.waterUsage.daily} L/day</div>
                    <div class="metric-trend">${this.getTrendIndicator(this.ecoData.waterUsage.daily)}</div>
                </div>
                <div class="metric-card">
                    <h4>Waste Reduction</h4>
                    <div class="metric-value">${this.ecoData.wasteReduction.daily} kg/day</div>
                    <div class="metric-trend">${this.getTrendIndicator(this.ecoData.wasteReduction.daily)}</div>
                </div>
                <div class="metric-card">
                    <h4>Energy Consumption</h4>
                    <div class="metric-value">${this.ecoData.energyConsumption.daily} kWh/day</div>
                    <div class="metric-trend">${this.getTrendIndicator(this.ecoData.energyConsumption.daily)}</div>
                </div>
            </div>
        `;
    }

    getTrendIndicator(value) {
        // Example trend calculation - can be adjusted based on historical data
        const previousValue = value * 0.9; // Simulated previous value
        const trend = value - previousValue;
        
        if (trend > 0) {
            return '<i class="fas fa-arrow-up text-danger"></i>';
        } else if (trend < 0) {
            return '<i class="fas fa-arrow-down text-success"></i>';
        }
        return '<i class="fas fa-minus text-warning"></i>';
    }

    renderEcoTips(category = 'all') {
        const tipsContainer = document.getElementById('ecoTipsContainer');
        if (!tipsContainer) return;

        const filteredTips = category === 'all' 
            ? this.tips 
            : this.tips.filter(tip => tip.category === category);

        tipsContainer.innerHTML = filteredTips.map(category => `
            <div class="tip-category">
                <h3>${this.capitalizeFirstLetter(category.category)} Tips</h3>
                <ul class="tip-list">
                    ${category.tips.map(tip => `
                        <li class="tip-item">
                            <i class="fas fa-leaf"></i>
                            <span>${tip}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateImpactMetrics() {
        const impactMetrics = document.getElementById('impactMetrics');
        if (!impactMetrics) return;

        const treesEquivalent = Math.round(this.ecoData.carbonFootprint.yearly / 22); // Average tree absorbs 22kg CO2/year
        const waterSaved = Math.round(this.ecoData.waterUsage.yearly * 0.2); // Assuming 20% reduction
        const wasteReduced = Math.round(this.ecoData.wasteReduction.yearly);

        impactMetrics.innerHTML = `
            <div class="impact-metric">
                <i class="fas fa-tree"></i>
                <span>${treesEquivalent} trees equivalent</span>
            </div>
            <div class="impact-metric">
                <i class="fas fa-tint"></i>
                <span>${waterSaved}L water saved</span>
            </div>
            <div class="impact-metric">
                <i class="fas fa-recycle"></i>
                <span>${wasteReduced}kg waste reduced</span>
            </div>
        `;
    }

    saveEcoData() {
        localStorage.setItem('ecoData', JSON.stringify(this.ecoData));
    }
}

// Initialize eco insights when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ecoInsights = new EcoInsights();
}); 