import { Injectable } from "@angular/core";
import { CanvasService } from "./canvas.service";

@Injectable({providedIn: 'root'})
export class Mouse {
    x: number;
    y: number;
    click: boolean;
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
        this.click = false;
    }

    ngOnInit(){}
};