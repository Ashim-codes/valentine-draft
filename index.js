// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('p');
    const container = document.querySelector('.container');
    
    // Array of cute messages for when "No" is hovered
    const noMessages = [
        "nabanne mero valentine? 🥺",
        "Please? 💕",
        "ma jasto handsome kta paula ta feri! 😊",
        "ekchoti socha,😜",
        "ma tmlai daily chocolate! 🍫",
        "mero mutu natodana! 💔",
        "ramri manchey, please? 🙏",
        "ek chance deuna ! 😘"
    ];
    
    // Array of happy messages for when "Yes" is clicked
    const yesMessages = [
        "Yay! my valentine! 🎉❤️",
        "Best decision ever! 🥰💕",
        "i love you soo much ! 💘",
        "here is rose for u! 🌹",
        "My heart is doing flips! 💓"
    ];
    
    let noCount = 0;
    
    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        const randomMessage = yesMessages[Math.floor(Math.random() * yesMessages.length)];
        message.innerHTML = randomMessage + " ❤️";
        
        // Make buttons disappear
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        
        // Add celebration class
        container.classList.add('celebrate');
        
        // Create floating hearts
        createFloatingHearts();
        
        // Change background
        document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
    });
    
    // No button hover effect
    noBtn.addEventListener('mouseover', function() {
        // Change message
        const randomNoMessage = noMessages[Math.floor(Math.random() * noMessages.length)];
        message.innerHTML = randomNoMessage;
        
        // Make Yes button bigger
        const currentWidth = yesBtn.offsetWidth;
        const currentHeight = yesBtn.offsetHeight;
        yesBtn.style.width = (currentWidth + 20) + 'px';
        yesBtn.style.height = (currentHeight + 10) + 'px';
        yesBtn.style.fontSize = (parseInt(window.getComputedStyle(yesBtn).fontSize) + 2) + 'px';
        
        // Move No button randomly (but keep it in container)
        moveButtonRandomly(noBtn);
        
        noCount++;
        
        // After several "No" attempts, show special message
        if (noCount === 5) {
            message.innerHTML = "malai thaxa u would say yes! 😄";
        } else if (noCount === 8) {
            message.innerHTML = "ma ta tmlai valentine banauchu jasari ni 😅 💪";
        }
    });
    
    // No button click handler (they're trying to click No!)
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        message.innerHTML = "Nice try! tara tmle no vanna mildaina! 😋";
        
        // Make No button move more dramatically
        moveButtonRandomly(noBtn, true);
        
        // Make Yes button even bigger
        yesBtn.style.width = (yesBtn.offsetWidth + 30) + 'px';
        yesBtn.style.height = (yesBtn.offsetHeight + 15) + 'px';
        yesBtn.style.fontSize = (parseInt(window.getComputedStyle(yesBtn).fontSize) + 3) + 'px';
    });
    
    // Function to move button randomly
    function moveButtonRandomly(button, dramatic = false) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        
        const maxX = containerRect.width - buttonRect.width - 20;
        const maxY = containerRect.height - buttonRect.height - 20;
        
        let randomX, randomY;
        
        if (dramatic) {
            // More dramatic movement
            randomX = Math.max(0, Math.min(maxX, Math.random() * maxX * 1.5));
            randomY = Math.max(0, Math.min(maxY, Math.random() * maxY * 1.5));
        } else {
            // Subtle movement
            const currentX = button.offsetLeft;
            const currentY = button.offsetTop;
            
            randomX = Math.max(0, Math.min(maxX, currentX + (Math.random() - 0.5) * 100));
            randomY = Math.max(0, Math.min(maxY, currentY + (Math.random() - 0.5) * 50));
        }
        
        button.style.position = 'absolute';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
    }
    
    // Function to create floating hearts
    function createFloatingHearts() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '100%';
                heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
                heart.style.animation = 'float 3s ease-in';
                heart.style.opacity = Math.random();
                document.body.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100);
        }
    }
    
    // Add CSS animation for floating hearts
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Reset button sizes on page load
    window.addEventListener('load', function() {
        yesBtn.style.width = 'auto';
        yesBtn.style.height = 'auto';
        yesBtn.style.fontSize = '1.3rem';
        noBtn.style.position = 'static';
    });
});