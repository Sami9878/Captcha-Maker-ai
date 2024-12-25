let captchaText = "";
let canvas = document.getElementById("captcha");
let context = canvas.getContext("2d");

canvas.width = 200;
canvas.height = 50;

function generateCaptcha() {
    // Generate a random 6-character CAPTCHA
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captchaText = "";
    for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Clear canvas before redrawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw distorted CAPTCHA text
    drawCaptcha(captchaText);
}

function drawCaptcha(text) {
    const chars = text.split('');
    for (let i = 0; i < chars.length; i++) {
        // Distort each character
        const angle = (Math.random() - 0.5) * 30;  // Random angle between -15 and 15
        const x = 30 * i + 10;
        const y = 30 + Math.random() * 10;

        context.save();
        context.translate(x, y);
        context.rotate(angle * Math.PI / 180);  // Apply rotation
        context.font = "30px 'Courier New', Courier, monospace";
        context.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        context.fillText(chars[i], 0, 0);
        context.restore();
    }

    // Add some noise (lines and dots)
    addNoise();
}

function addNoise() {
    // Draw random lines
    for (let i = 0; i < 5; i++) {
        context.beginPath();
        context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.strokeStyle = "rgba(0, 0, 0, 0.2)";
        context.stroke();
    }

    // Draw random dots
    for (let i = 0; i < 20; i++) {
        context.beginPath();
        context.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fill();
    }
}

function verifyCaptcha() {
    // Get user input
    const userInput = document.getElementById("captcha-input").value;

    // Check if the user input matches the CAPTCHA
    if (userInput === captchaText) {
        document.getElementById("status").textContent = "CAPTCHA Verified!";
        document.getElementById("status").style.color = "#4CAF50"; // Green Color
    } else {
        document.getElementById("status").textContent = "Generate CAPTCHA Again!";
        document.getElementById("status").style.color = "#ff6347"; // Tomato Red Color
        // Generate new CAPTCHA
        generateCaptcha();
    }
}

// Generate initial CAPTCHA
generateCaptcha();
