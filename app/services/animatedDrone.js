

export function startAnimatedDrone() {

    let isDrone = document.getElementById('drone');
    const body = document.getElementById('body');


    if(isDrone) {
        isDrone.remove();
    }

    const drone = document.createElement('img');
    drone.id = 'drone';
    drone.src = 'app/images/pngwing.com.png';
    drone.alt = 'drone-img';
    drone.style.display = 'block'

    body.appendChild(drone);

    let droneX = window.innerWidth - 150;
    let droneY = 0;
    const droneWidth = 150;
    const droneHeight = 150;
    const step = 4;
    const minWidth = 0;
    let isMovingLeftToRight = true;
    
    drone.style.width = droneWidth + 'px';
    drone.style.height = droneHeight + 'px';
    drone.style.top = droneY + 'px';
    drone.style.right = droneX + 'px';
    
    const moveDrone = () => {
        if (isMovingLeftToRight) {
            droneX -= step;
            if (droneX <= minWidth) {
                isMovingLeftToRight = false;
            }
        } else {
            droneX += step;
            if (droneX >= window.innerWidth - droneWidth) {
                isMovingLeftToRight = true;
            }
        }
        drone.style.right = droneX + 'px';
    };
    
    setInterval(moveDrone, 20);
};



export function showAnimatedDrone () {
    startAnimatedDrone();
};

export function hideAnimatedDrone () {
    drone.style.display = 'none';
};


