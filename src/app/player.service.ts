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
    constructor(canvas: HTMLCanvasElement){
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.adjustX = canvas.width / canvas.offsetWidth;
        this.adjustY = canvas.height / canvas.offsetHeight;
        this.spriteWidth = 498 * this.adjustX;
        this.spriteHeight = 327 * this.adjustY;
        this.radius = 50 * (this.adjustX + this.adjustY) / 2;
    }

    update(mouse: Mouse){
        const dx = this.x - (mouse.x * this.adjustX);
        const dy = this.y - (mouse.y * this.adjustY);

        if (mouse.x != this.x) {
            this.x -= dx / 30;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 30;
        }
    }

    draw(context: CanvasRenderingContext2D | null, mouse: Mouse) {
        if (context) {
            if (mouse.click) {
                context.lineWidth = 0.1;
                context.beginPath();
                context.moveTo(this.x, this.y);
                // context.lineTo(mouse.x * this.adjustX, mouse.y * this.adjustY);
                context.stroke();
            }
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }
}