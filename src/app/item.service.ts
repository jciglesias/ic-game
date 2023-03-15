import { Injectable } from "@angular/core";
import { Mouse } from "./mouse.service";

@Injectable({providedIn: 'root'})
export class Item {
    x: number;
    y: number;
    radius: number;
    state: boolean;

    constructor(map: Array<Array<number>>) {
        let y = Math.floor(Math.random() * 330);
        let x = Math.floor(Math.random() * 650);
        while (map[y][x]) {
            y = Math.floor(Math.random() * 330);
            x = Math.floor(Math.random() * 650);
            // console.log(x, y);
        }
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.state = true;
    }

    draw(context: CanvasRenderingContext2D | null) {
        if (context && this.state) {
            // console.log(this.x, this.y)
            context.fillStyle = 'green';
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }
}