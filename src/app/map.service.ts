import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class MapService {
    map: Array< Array< number > >;
    id: ImageData;

    constructor(ctx: CanvasRenderingContext2D | null) {
        this.map = this.createMap(33, 65);
        this.id = {} as ImageData;
        if (ctx) {
            this.id = ctx.createImageData(650, 330);
            let buff = new Uint8ClampedArray(650 * 330 * 4)
            for (let i = 0; i < (this.map.length * 10); i++) {
                for (let j = 0; j < (this.map[Math.floor(i / 10)].length * 10); j++) {
                    if (this.map[Math.floor(i / 10)][Math.floor(j / 10)]) {
                        let pos = (i * 650 + j) * 4;
                        buff[pos] = 0;
                        buff[pos + 1] = 0;
                        buff[pos + 2] = 0;
                        buff[pos + 3] = 255;
                    }
                    else {
                        let pos = (i * 650 + j) * 4;
                        buff[pos] = 255;
                        buff[pos + 1] = 255;
                        buff[pos + 2] = 255;
                        buff[pos + 3] = 255;
                    }
                }
            }
            this.id.data.set(buff);
        }
    }

    createArray(num: number, rows:number, columns: number) {
        var array: Array<Array<number>> = [];
        for (var i = 0; i < rows; i++) {
          array.push([]);
          for (var j = 0; j < columns; j++) {
            array[i].push(num);
          }
        }
        return array;
    }

  //lets create a randomly generated map for our dungeon crawler
    createMap(rows: number, columns: number) {
        let  // width and height of the map
          maxTunnels = 150, // max number of tunnels possible
          maxLength = 300, // max length each tunnel can have
          map = this.createArray(1, rows, columns), // create a 2d array full of 1's
          currentRow = Math.floor(Math.random() * rows), // our current row - start at a random spot
          currentColumn = Math.floor(Math.random() * columns), // our current column - start at a random spot
          directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
          lastDirection: number[] = [], // save the last direction we went
          randomDirection; // next turn/direction - holds a value from directions

        // lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
        while (maxTunnels && rows && columns && maxLength) {

          // lets get a random direction - until it is a perpendicular to our lastDirection
          // if the last direction = left or right,
          // then our new direction has to be up or down,
          // and vice versa
          do {
             randomDirection = directions[Math.floor(Math.random() * directions.length)];
          } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

          var randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
            tunnelLength = 0; //current length of tunnel being created

	    	// lets loop until our tunnel is long enough or until we hit an edge
          while (tunnelLength < randomLength) {

            //break the loop if it is going out of the map
            if (((currentRow === 0) && (randomDirection[0] === -1)) ||
                ((currentColumn === 0) && (randomDirection[1] === -1)) ||
                ((currentRow === rows - 1) && (randomDirection[0] === 1)) ||
                ((currentColumn === columns - 1) && (randomDirection[1] === 1))) {
              break;
            } else {
              map[currentRow][currentColumn] = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
              currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
              currentColumn += randomDirection[1];
              tunnelLength++; //the tunnel is now one longer, so lets increment that variable
            }
          }

          if (tunnelLength) { // update our variables unless our last loop broke before we made any part of a tunnel
            lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
            maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
          }
        }
        return map; // all our tunnels have been created and our map is complete, so lets return it to our render()
    };

    draw(context: CanvasRenderingContext2D | null) {
        if (context) {
            context.fillStyle = "black";
            context.strokeStyle = "blue";
            context.beginPath();
            context.putImageData(this.id, 0, 0)
            // context.closePath();
            // context.stroke();
            // context.fill();
        }
    }
};