import { Injectable } from "@angular/core";
import { CanvasService } from "./canvas.service";

@Injectable({providedIn: 'root'})
export class Mouse {
    x: number;
    y: number;
    click: boolean;
    constructor(private canvasService: CanvasService){
        this.x = 0;
        this.y = 0;
        this.click = false;
    }

    ngOnInit(){}
}