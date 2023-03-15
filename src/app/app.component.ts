import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Mouse } from './mouse.service';
import { Player } from './player.service';
import { MapService } from './map.service'
import { Item } from './item.service';

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
  map: MapService;
  items = [] as Array<Item>;

  constructor() {
    this.canvas = {} as HTMLCanvasElement;
    this.context = null;
    this.player = {} as Player;
    this.mouse = {} as Mouse;
    this.end = false;
    this.map = {} as MapService;
  }
  
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;
  ngOnInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    console.log(this.canvas);
    let position = this.canvas.getBoundingClientRect();
    this.context = this.canvas.getContext('2d');
    this.map = new MapService(this.context);
    console.log(this.map.map)
    this.mouse = new Mouse(this.canvas, this.map.map)
    this.player = new Player(this.canvas, this.map.map);
    for (let i = 0; i < 4; i++)
      this.items.push(new Item(this.map.map));
    console.log(this.items)

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
        // console.log(raton);
      });
      this.canvas.addEventListener("mouseup", function(event: MouseEvent) {
        raton.x = event.x - position.left;
        raton.y = event.y - position.top;
        raton.click = false;
        // console.log(raton);
    });
    // console.log(this.map)
    this.animate();
    let tmpcanv = this.canvas;
    window.addEventListener("resize", function(){position = tmpcanv.getBoundingClientRect();})
  }
  
  animate = () => {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update(this.mouse);
    this.map.draw(this.context);
    for (var x of this.items) {
      x.draw(this.context);
    }
    this.player.draw(this.context, this.mouse);
    if (this.player.x > (this.canvas.width * 0.95) && this.player.y > (this.canvas.height * 0.95)) {
      this.end = true;
    }
    if (this.end && this.context) {
      let gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
      gradient.addColorStop(0, "red");
      gradient.addColorStop(0.5, "blue");
      gradient.addColorStop(1.0, "red");
      this.context.fillStyle = gradient;
      this.context.fillText("Game Over", 10, 100);
      return
    }
    requestAnimationFrame(this.animate);
  }
}
