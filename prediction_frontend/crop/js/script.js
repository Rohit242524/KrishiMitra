const sliderConfigs = [
    { id: 'nitrogen', label: 'Nitrogen', min: 0, max: 140, value: 50, unit: '%' },
    { id: 'phosphorus', label: 'Phosphorus', min: 5, max: 145, value: 50, unit: '%' },
    { id: 'potassium', label: 'Potassium', min: 5, max: 205, value: 50, unit: '%' },
    { id: 'temperature', label: 'Temperature', min: 0, max: 50, value: 25, unit: '°C' },
    { id: 'humidity', label: 'Humidity', min: 0, max: 100, value: 60, unit: '%' },
    { id: 'ph', label: 'pH', min: 0, max: 14, value: 7, unit: '' },
    { id: 'rainfall', label: 'Rainfall', min: 0, max: 300, value: 100, unit: 'mm' }
];

const slidersContainer = document.getElementById('sliders');
const predictBtn = document.getElementById('predictBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsDiv = document.getElementById('results');
const metaDiv = document.getElementById('meta');

function createSliders() {
    sliderConfigs.forEach(config => {
        const sliderRow = document.createElement('div');
        sliderRow.className = 'slider-row';
        sliderRow.innerHTML = `
            <label class="slider-label" for="${config.id}">${config.label}</label>
            <div class="range-wrapper">
                <input type="range" 
                       id="${config.id}" 
                       min="${config.min}" 
                       max="${config.max}" 
                       value="${config.value}"
                       data-default="${config.value}">
            </div>
            <span class="slider-value" id="${config.id}-value">
                ${config.value}<span class="unit">${config.unit}</span>
            </span>
        `;
        slidersContainer.appendChild(sliderRow);
        
        const slider = document.getElementById(config.id);
        const valueDisplay = document.getElementById(`${config.id}-value`);
        
        slider.addEventListener('input', function() {
            valueDisplay.innerHTML = `${this.value}<span class="unit">${config.unit}</span>`;
        });
    });
}

function getSliderValues() {
    const values = {};
    sliderConfigs.forEach(config => {
        const slider = document.getElementById(config.id);
        values[config.id] = parseFloat(slider.value);
    });
    return values;
}

function resetSliders() {
    sliderConfigs.forEach(config => {
        const slider = document.getElementById(config.id);
        const valueDisplay = document.getElementById(`${config.id}-value`);
        slider.value = config.value;
        valueDisplay.innerHTML = `${config.value}<span class="unit">${config.unit}</span>`;
    });
    resultsDiv.textContent = 'No prediction yet — set values & click Predict.';
    metaDiv.textContent = '';
}

predictBtn.addEventListener('click', function() {
    const values = getSliderValues();
    
    console.log('Slider Values:', values);
    
    resultsDiv.innerHTML = `
        <strong>Input Values:</strong><br>
        N: ${values.nitrogen}, P: ${values.phosphorus}, K: ${values.potassium}<br>
        Temperature: ${values.temperature}°C, Humidity: ${values.humidity}%<br>
        pH: ${values.ph}, Rainfall: ${values.rainfall}mm
    `;
    
    metaDiv.textContent = 'Ready for ML prediction...';
});

resetBtn.addEventListener('click', resetSliders);

createSliders();