let score = 0;
let pointsPerClick = 1;
let upgradesBought = [false, false, false, false, false, false, false, false]; // Tracking upgrades
let upgradeCosts = [50, 150, 100, 250, 200, 500, 300, 600]; // Initial upgrade costs
let achievements = [];
let powerUpActive = false;
let autoClickerActive = false;
let autoClickInterval = null;
let eventActive = false;
let eventDuration = 0; // Used for time-based events

let doublePointsCooldown = 0;
let autoClickerCooldown = 0;

const scoreElement = document.getElementById('score');
const achievementsList = document.getElementById('achievementsList');
const prestigeButton = document.getElementById('prestigeButton');
const eventNotification = document.getElementById('eventNotification');

// Shop and Upgrade Buttons
const upgradeButtons = [
    document.getElementById('soccerCleats'),
    document.getElementById('soccerBall'),
    document.getElementById('hockeyStick'),
    document.getElementById('iceSkates'),
    document.getElementById('basketballShoes'),
    document.getElementById('betterBasketball'),
    document.getElementById('newCleats'),
    document.getElementById('betterFootball')
];

const upgradeCostsElements = [
    document.getElementById('soccerCleatsCost'),
    document.getElementById('soccerBallCost'),
    document.getElementById('hockeyStickCost'),
    document.getElementById('iceSkatesCost'),
    document.getElementById('basketballShoesCost'),
    document.getElementById('betterBasketballCost'),
    document.getElementById('newCleatsCost'),
    document.getElementById('betterFootballCost')
];

// Power-Up Buttons
const doublePointsButton = document.getElementById('doublePointsButton');
const autoClickerButton = document.getElementById('autoClickerButton');

// Shop Panel
const shopPanel = document.getElementById('shop');
const toggleShopButton = document.getElementById('toggleShop');

// Toggle Shop Visibility
toggleShopButton.addEventListener('click', () => {
    shopPanel.style.display = (shopPanel.style.display === 'none' || shopPanel.style.display === '') ? 'block' : 'none';
});

// Click Event
document.getElementById('clickButton').addEventListener('click', () => {
    score += pointsPerClick;
    scoreElement.textContent = score;
    checkAchievements();
    checkUpgradeAvailability();
});

// Prestige Button
prestigeButton.addEventListener('click', () => {
    score = 0;
    pointsPerClick = 1;
    upgradesBought = [false, false, false, false, false, false, false, false];
    upgradeCosts = [50, 150, 100, 250, 200, 500, 300, 600];
    checkAchievements();
    checkUpgradeAvailability();
    alert('You have prestiged! All upgrades reset, but you gain bonus multipliers.');
});

// Upgrades
upgradeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (score >= upgradeCosts[index]) {
            score -= upgradeCosts[index];
            scoreElement.textContent = score;
            upgradesBought[index] = true;  // Mark upgrade as bought
            upgradeCosts[index] = Math.floor(upgradeCosts[index] * 1.5); // Increase upgrade cost for next purchase
            upgradeCostsElements[index].textContent = upgradeCosts[index]; // Update displayed cost
            applyUpgradeEffect(index); // Apply the effect of the upgrade
            checkUpgradeAvailability(); // Check if upgrades are available
        }
    });
});

// Apply Upgrade Effect Based on Index
function applyUpgradeEffect(index) {
    switch (index) {
        case 0: // Soccer Cleats
            pointsPerClick += 2;
            break;
        case 1: // Soccer Ball
            pointsPerClick += 4;
            break;
        case 2: // Hockey Stick
            pointsPerClick += 3;
            break;
        case 3: // Ice Skates
            pointsPerClick += 6;
            break;
        case 4: // Basketball Shoes
            pointsPerClick += 5;
            break;
        case 5: // Better Basketball
            pointsPerClick += 10;
            break;
        case 6: // New Cleats (Football)
            pointsPerClick += 7;
            break;
        case 7: // Better Football
            pointsPerClick += 12;
            break;
        default:
            break;
    }
}

// Achievements
function checkAchievements() {
    if (score >= 100 && !achievements.includes("100 Points")) {
        achievements.push("100 Points");
        addAchievement("100 Points");
    }
    if (score >= 500 && !achievements.includes("500 Points")) {
        achievements.push("500 Points");
        addAchievement("500 Points");
    }
    if (score >= 1000 && !achievements.includes("1000 Points")) {
        achievements.push("1000 Points");
        addAchievement("1000 Points");
    }
}

function addAchievement(achievement) {
    const li = document.createElement('li');
    li.textContent = achievement;
    achievementsList.appendChild(li);
}

// Check if upgrades are available
function checkUpgradeAvailability() {
    upgradeButtons.forEach((button, index) => {
        if (score >= upgradeCosts[index]) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });
}

// Power-Up Functions
doublePointsButton.addEventListener('click', () => {
    if (doublePointsCooldown === 0) {
        doublePointsCooldown = 10;  // 10 seconds cooldown
        pointsPerClick *= 2; // Double the points per click
        eventNotification.textContent = "Double Points Activated!";
        updatePowerUpCountdown(doublePointsButton, doublePointsCooldown);

        const interval = setInterval(() => {
            doublePointsCooldown--;
            updatePowerUpCountdown(doublePointsButton, doublePointsCooldown);

            if (doublePointsCooldown === 0) {
                clearInterval(interval);
                pointsPerClick /= 2; // Revert after 10 seconds
                eventNotification.textContent = "";
            }
        }, 1000);
    }
});

autoClickerButton.addEventListener('click', () => {
    if (autoClickerCooldown === 0) {
        autoClickerCooldown = 5;  // 5 seconds cooldown
        eventNotification.textContent = "Auto-Clicker Activated!";
        autoClickInterval = setInterval(() => {
            score += pointsPerClick;
            scoreElement.textContent = score;
            checkAchievements();
        }, 1000); // Click every 1 second

        updatePowerUpCountdown(autoClickerButton, autoClickerCooldown);

        setTimeout(() => {
            clearInterval(autoClickInterval);
            eventNotification.textContent = "";
            autoClickerCooldown = 0;
        }, 5000); // Auto-clicker runs for 5 seconds
    }
});

// Update Power-Up Countdown
function updatePowerUpCountdown(button, cooldown) {
    const countdownElement = button.querySelector('.countdown');
    if (!countdownElement) {
        const newCountdownElement = document.createElement('span');
        newCountdownElement.classList.add('countdown');
        button.appendChild(newCountdownElement);
    }
    button.querySelector('.countdown').textContent = `${cooldown}s`;
}
