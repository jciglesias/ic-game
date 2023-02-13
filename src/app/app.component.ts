import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Mouse } from './mouse.service';
import { Player } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ic-game';
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;

  constructor(private player: Player, private mouse: Mouse) {
    // let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas = {} as HTMLCanvasElement;
    this.context = null;
  }
  
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;
  ngOnInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    // this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log(this.canvas);
    let position = this.canvas.getBoundingClientRect();
    console.log("debug");
    this.context = this.canvas.getContext('2d');

    let score = 0;
    let gameFrame = 0;
    if (this.context) {
      this.context.font = '50px Georgia';
    }

    let raton = this.mouse;
    this.canvas.addEventListener("mousedown", function(event: MouseEvent) {
      raton.x = event.x - position.left;
      raton.y = event.y - position.top;
        raton.click = true;
        console.log(raton);
      });
      this.canvas.addEventListener("mouseup", function(event: MouseEvent) {
        raton.x = event.x - position.left;
        raton.y = event.y - position.top;
        raton.click = false;
        console.log(raton);
    });
    this.animate();
  }
  
  animate() {
    this.player.update(this.mouse);
    this.player.draw(this.context, this.mouse);
    requestAnimationFrame(this.animate);
  }
}
