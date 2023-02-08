import { Injectable } from "@angular/core";
import { CanvasService } from "./canvas.service";

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
    constructor(){
        this.x = 0;
        this.y = 0;
        this.radius = 50;
        this.angle = 0;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteHeight = 327;
        this.spriteWidth = 498;
    }

    ngOnInit(){}
}