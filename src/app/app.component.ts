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
  player: Player;
  mouse: Mouse;
  end: boolean;

  constructor() {
    this.canvas = {} as HTMLCanvasElement;
    this.context = null;
    this.player = {} as Player;
    this.mouse = {} as Mouse;
    this.end = false;
  }
  
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;
  ngOnInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    console.log(this.canvas);
    let position = this.canvas.getBoundingClientRect();
    this.context = this.canvas.getContext('2d');
    this.mouse = new Mouse(this.canvas)
    this.player = new Player(this.canvas);

    let score = 0;
    let gameFrame = 0;
    if (this.context) {
      this.context.font = ((this.canvas.width * this.canvas.height) * 0.001) + 'px Georgia';
      let gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
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
  
  animate = () => {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update(this.mouse);
    this.player.draw(this.context, this.mouse);
    if (this.player.x > (this.canvas.width * 0.95) && this.player.y > (this.canvas.height * 0.95)) {
      this.end = true;
    }
    if (this.end && this.context) {
      let gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
      gradient.addColorStop(0, "black");
      gradient.addColorStop(0.5, "blue");
      gradient.addColorStop(1.0, "black");
      this.context.fillStyle = gradient;
      this.context.fillText("Game Over", 10, 100);
      return
    }
    requestAnimationFrame(this.animate);
  }
}
