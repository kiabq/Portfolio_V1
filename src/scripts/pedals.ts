function temp() {
    const BANNER = document.querySelector(".pedals");
    let rotationX = 5;
    let translateY = -50;
    let rotationY = 3;
    

    for (let i = 0; i < 5; i++) {
        BANNER!.innerHTML += `<div class='e'>${i}</div>`;
    }

    function add() {
        translateY += 1;
        rotationX += 2;
        rotationY += 1;
    }

    BANNER!.innerHTML += "<div class='e'>Hi</div>";
    const DIV = <any> document.querySelectorAll(".e");    

    function load() {
        if (translateY > 500) {
            translateY = -50;
        }

        if (rotationX >= 360) {
            rotationX = 0;
        } 

        if (rotationY >= 360) {
            rotationY = 0;
        }

        add();
        for (const ELEMENT of DIV) {
            ELEMENT.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        }
        
    }

    setInterval(load, 20);
    
    window.addEventListener("DOMContentLoaded", load);
}

temp();

export default temp;