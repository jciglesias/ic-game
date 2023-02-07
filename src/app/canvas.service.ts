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
    }

    addCanvasEvent(event: string, fn: any) {
        this.canvas.addEventListener(event, fn);
    }
}