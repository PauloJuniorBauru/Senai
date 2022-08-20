const mario = document.querySelector('img.mario');

addEventListener("keydown", function(event) {
    if (event.key == "ArrowUp") {
        mario.classList.add("jump");
        
        setTimeout(function() {
            mario.classList.remove("jump");
        }, 500);
    }
});




const bullet = document.querySelector('img#bullet');
const floor = document.querySelector('img#floor');

const ckeck_position = setInterval(function() {
    const bullet_position = bullet.offsetLeft;
    const mario_position = getComputedStyle(mario).bottom.replace('px', '');
    const floor_position = floor.offsetLeft;

    if (bullet_position <= 110 && mario_position < 50 && bullet_position > 0) {
        bullet.style.animation = "none";
        bullet.style.left = `${bullet_position}px`;

        mario.style.animation = "none";
        mario.src = "_img/mario-lose.png";
        mario.style.width = "7%";
        mario.style.left = "7%";       
        mario.style.bottom = `${mario_position}px`;
         
        floor.style.animation = "none";
        floor.style.left = `${floor_position}px`;
    }
}, 10);
