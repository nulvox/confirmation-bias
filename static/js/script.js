// Get DOM elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const targetRadiusInput = document.getElementById('target-radius');
const sampleSizeInput = document.getElementById('sample-size');
const testButton = document.getElementById('test-button');
const clearButton = document.getElementById('clear-button');
const unbiasedRateElement = document.getElementById('unbiased-rate');
const biasedRateElement = document.getElementById('biased-rate');

// Canvas dimensions and center
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;

// Simulation state
let targetCircle = null;
let points = [];
let confirmationCount = 0;

// Initialize the canvas
function initCanvas() {
    // Set canvas background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw grid lines for reference
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = 0; x < canvasWidth; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 0; y < canvasHeight; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }
}

// Draw the target circle
function drawTargetCircle(normalizedRadius) {
    // Convert normalized radius (0.1-1.0) to pixel radius (proportional to canvas size)
    const pixelRadius = normalizedRadius * (Math.min(canvasWidth, canvasHeight) / 2);
    
    // Store the circle properties for later reference
    targetCircle = {
        x: centerX,
        y: centerY,
        radius: pixelRadius,
        normalizedRadius: normalizedRadius
    };
    
    // Draw the circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, pixelRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Fill with semi-transparent color
    ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
    ctx.fill();
}

// Generate a random point on the canvas
function generateRandomPoint() {
    return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight
    };
}

// Check if a point is inside the target circle
function isPointInCircle(point, circle) {
    const dx = point.x - circle.x;
    const dy = point.y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance <= circle.radius;
}

// Draw a point on the canvas
function drawPoint(point, isConfirmation) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
    
    if (isConfirmation) {
        // Draw confirmation points in green
        ctx.fillStyle = '#2ecc71';
    } else {
        // Draw non-confirmation points in red
        ctx.fillStyle = '#e74c3c';
    }
    
    ctx.fill();
}

// Run a test with the current parameters
function runTest() {
    // Get the parameters from the inputs
    const targetRadius = parseFloat(targetRadiusInput.value);
    const sampleSize = parseInt(sampleSizeInput.value);
    
    // Validate inputs
    if (isNaN(targetRadius) || targetRadius < 0.1 || targetRadius > 1) {
        alert('Target radius must be between 0.1 and 1');
        return;
    }
    
    if (isNaN(sampleSize) || sampleSize < 10 || sampleSize > 1000) {
        alert('Sample size must be between 10 and 1000');
        return;
    }
    
    // Clear previous results
    clearCanvas();
    
    // Draw the target circle
    drawTargetCircle(targetRadius);
    
    // Generate and draw points
    points = [];
    confirmationCount = 0;
    
    for (let i = 0; i < sampleSize; i++) {
        const point = generateRandomPoint();
        const isConfirmation = isPointInCircle(point, targetCircle);
        
        // Track confirmations
        if (isConfirmation) {
            confirmationCount++;
        }
        
        // Store the point
        points.push({
            ...point,
            isConfirmation
        });
        
        // Draw the point
        drawPoint(point, isConfirmation);
    }
    
    // Update the results display
    updateResults(confirmationCount, sampleSize);
}

// Update the result displays
function updateResults(confirmations, sampleSize) {
    // Calculate the unbiased rate (confirmations / total sample)
    const unbiasedPercentage = sampleSize > 0 ? (confirmations / sampleSize) * 100 : 0;
    unbiasedRateElement.textContent = `${confirmations}/${sampleSize} (${unbiasedPercentage.toFixed(2)}%)`;
    
    // Calculate the biased rate (confirmations / confirmations = 100%)
    const biasedPercentage = confirmations > 0 ? 100 : 0;
    biasedRateElement.textContent = `${confirmations}/${confirmations} (${biasedPercentage.toFixed(2)}%)`;
    
    // Add visual emphasis if there's a big difference
    if (unbiasedPercentage < 50 && confirmations > 0) {
        unbiasedRateElement.style.color = '#e74c3c';
        biasedRateElement.style.color = '#2ecc71';
    } else {
        unbiasedRateElement.style.color = '#333';
        biasedRateElement.style.color = '#333';
    }
}

// Clear the canvas and reset the state
function clearCanvas() {
    // Reset the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    initCanvas();
    
    // Reset the state
    targetCircle = null;
    points = [];
    confirmationCount = 0;
    
    // Reset the results display
    unbiasedRateElement.textContent = '0/0 (0%)';
    biasedRateElement.textContent = '0/0 (0%)';
    unbiasedRateElement.style.color = '#333';
    biasedRateElement.style.color = '#333';
}

// Add event listeners
testButton.addEventListener('click', runTest);
clearButton.addEventListener('click', clearCanvas);

// Initialize the canvas on page load
window.addEventListener('load', initCanvas);