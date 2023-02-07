import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasService } from './canvas.service';
import { MouseService } from './mouse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ic-game';
  constructor(
    private canvasService: CanvasService,
    // private mouseService: MouseService,
    ){}
  ngOnInit(): void {
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
