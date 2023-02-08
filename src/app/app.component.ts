import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { range } from 'rxjs';
import { CanvasService } from './canvas.service';
import { Mouse } from './mouse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ic-game';
  constructor(
    // private canvasService: CanvasService,
    private mouse: Mouse,
    ){}
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;
  ngOnInit(): void {
    let canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    let position = canvas.getBoundingClientRect();
    console.log("debug");
    const contex = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;

    let score = 0;
    let gameFrame = 0;
    if (contex) {
      contex.font = '50px Georgia';
    }

    let canvasPosition = position;
    let tmpmouse = this.mouse;
    canvas.addEventListener("mousedown", function(event: MouseEvent) {
        tmpmouse.x = event.x - canvasPosition.left;
        tmpmouse.y = event.y - canvasPosition.top;
        tmpmouse.click = true;
        console.log(tmpmouse);
    });
    canvas.addEventListener("mouseup", function(event: MouseEvent) {
      tmpmouse.x = event.x - canvasPosition.left;
      tmpmouse.y = event.y - canvasPosition.top;
      tmpmouse.click = false;
      console.log(tmpmouse);
    });
    canvas.addEventListener("keydown", function(event){
      console.log(event);
    });
  }
}
