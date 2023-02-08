import { ElementRef, Injectable, ViewChild } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CanvasService {
    @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;
    canvas: HTMLCanvasElement;
    position: DOMRect;
    constructor(){
        this.canvas = {} as HTMLCanvasElement;
        this.position = {} as DOMRect;
    }
    ngOnInit(): void {
        //canvas setup
        this.canvas = this.myCanvas.nativeElement;
        this.position = this.canvas.getBoundingClientRect();
        console.log("debug");
        const contex = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 500;

        let score = 0;
        let gameFrame = 0;
        if (contex) {
          contex.font = '50px Georgia';
        }

        const mouse = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            click: false,
          }
      
          let canvasPosition = this.position
        this.canvas.addEventListener("mousedown", function(event: MouseEvent){
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
            console.log(mouse);
        });
    }

    // addCanvasEvent(event: keyof HTMLElementEventMap, fn: (this: HTMLCanvasElement, event: MouseEvent) => void) {
    //     this.canvas.addEventListener("mousedown", fn);
    // }
}