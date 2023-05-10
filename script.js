const clouds = ["a", "b", "c", "d", "e", "f", "g", "h"];

function getRandomCloud() {
    const randomIndex = Math.floor(Math.random() * clouds.length);
    return clouds[randomIndex];
}

function animateCloud() {
    const textContainer = document.querySelector(".text-container");
    const cloud = getRandomCloud();
    textContainer.textContent = cloud;
    const containerWidth = document.querySelector(".container").getBoundingClientRect().width;
    const textWidth = textContainer.getBoundingClientRect().width;
    const duration = Math.random() * 8000 + 2000; // between 2 and 10 seconds
    const delay = Math.random() * 2000; // between 0 and 2 seconds
    textContainer.style.left = `${containerWidth}px`;
    textContainer.style.transition = `all ${duration}ms ease-in-out ${delay}ms`;
    setTimeout(animateCloud, duration + delay);
}

animateCloud();
