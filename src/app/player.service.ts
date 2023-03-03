import { Injectable } from "@angular/core";
import { Mouse } from "./mouse.service";

@Injectable({providedIn: 'root'})
export class Player {
    x: number;
    y: number;
    radius: number;
    angle: number;
    frameX: number;
    frameY: number;
    frame: number;
    spriteWidth: number;
    spriteHeight: number;
    adjustX: number;
    adjustY: number;
    map: Array< Array<number> >;
    constructor(canvas: HTMLCanvasElement, map: Array< Array< number > >){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        for (let i = 0; i < (map.length * 10); i++) {
            for (let j = 0; j < (map[Math.floor(i / 10)].length * 10); j++) {
                if (map[Math.floor(i / 10)][Math.floor(j / 10)] == 0) {
                    this.x = Math.floor(j / 10);
                    this.y = Math.floor(i / 10);
                    break ;
                }
            }
            if (this.y)
                break ;
        }
        this.map = map;
        this.angle = 0;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.adjustX = canvas.width / canvas.offsetWidth;
        this.adjustY = canvas.height / canvas.offsetHeight;
        this.spriteWidth = 498 * this.adjustX;
        this.spriteHeight = 327 * this.adjustY;
        this.radius = 5;
    }

    update(mouse: Mouse){
        const dx = this.x - (mouse.x * this.adjustX);
        const dy = this.y - (mouse.y * this.adjustY);

        if (this.map[Math.round(this.x - (dx / 30))][Math.round(this.y - (dy / 30))] == 0) {
                this.x -= dx / 30;
                this.y -= dy / 30;
        }
    }

    draw(context: CanvasRenderingContext2D | null, mouse: Mouse) {
        if (context) {
            if (mouse.click) {
                // context.lineWidth = 0.1;
                context.beginPath();
                context.moveTo(this.x, this.y);
                // context.lineTo(mouse.x * this.adjustX, mouse.y * this.adjustY);
                // context.stroke();
            }
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }
};