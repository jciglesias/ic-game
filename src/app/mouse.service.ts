import { Injectable } from "@angular/core";
import { CanvasService } from "./canvas.service";

@Injectable({providedIn: 'root'})
export class Mouse {
    x: number;
    y: number;
    click: boolean;
    constructor(canvas: HTMLCanvasElement){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.click = false;
    }

    ngOnInit(){}
};