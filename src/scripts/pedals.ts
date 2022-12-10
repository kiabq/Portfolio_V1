class Leaf {
    y: number;
    x: number;
    ry: number;
    rx: number;
    element: string;

    constructor(y: number, x: number, rx: number, ry: number, element: string) {
        this.y = y;
        this.x = x;
        this.ry = ry;
        this.rx = rx;
        this.element = element;
    }

    getElement() {
        return this.element;
    }

    getX() {
        return this.x;
    }

    setY() {
        if (this.y >= 100) {
            this.y = random(-150, -50);
            this.x = random(950)
        } else {
            this.y += 1;
        }

        return this.y;
    }

    setRX() {
        if (this.rx >= 360) {
            this.rx = 0;
        } else {
            this.rx += random(5);
        }

        return this.rx;
    }

    setRY() {
        if (this.ry >= 360) {
            this.ry = 0;
        } else {
            this.ry += random(2);
        }

        return this.ry;
    }
}

function random(max: number, min?: number) {
    if (min) {
        return Math.random() * (max - min) + min;
    } else {
        return Math.random() * max;
    }
}

function temp() {
    const BANNER = document.querySelector(".pedals");
    let loaded = false;

    let names: Array<Leaf> = [];

    for (let i = 0; i < 40; i++) {
        let x = random(BANNER!.clientWidth);

        names.push(new Leaf(
            random(-150, -50), 
            random(BANNER!.clientWidth),
            random(360), 
            random(360), 
            `<img src="/blob/main/public/images/flower2.png" class='e' style="transform: translateX(${x}px)"/>`
            ));
    }

    function load() {
        if (!loaded) {
            for (let i = 0; i < names.length; i++) {
                BANNER!.innerHTML += names[i].getElement();
            }

            loaded = true;
        } else {
            for (let i = 0; i < names.length; i++) {
                const x = `translateX(${names[i].getX()}px)`;
                const y = `translateY(${names[i].setY()}px)`;
                const rx = `rotateX(${names[i].setRX()}deg)`;
                const ry = `rotateY(${names[i].setRY()}deg)`;

                (BANNER!.children.item(i) as HTMLElement).style.transform = `${x} ${y} ${rx} ${ry}`
            }
        }
    }

    setInterval(load, 20);
    
    window.addEventListener("DOMContentLoaded", load);
}

temp();

export default temp;
