import { Injectable } from "@angular/core";
import { CanvasService } from "./canvas.service";

@Injectable({providedIn: 'root'})
export class MouseService {
    constructor(private canvasService: CanvasService){}

    ngOnInit(){
        //mouse interaction
        const mouse = {
            x: this.canvasService.canvas.width / 2,
            y: this.canvasService.canvas.height / 2,
            click: false,
        }

        let canvasPosition = this.canvasService.position;
        this.canvasService.canvas.addEventListener("mousedown", function(event){
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
            console.log(mouse);
        });
    }
}