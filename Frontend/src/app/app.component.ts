import { Component, Renderer2, HostListener, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http'
import { json } from 'stream/consumers';
import { arrayBuffer } from 'node:stream/consumers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap.css']
})

export class AppComponent implements AfterViewInit {
  title = 'paint';
  constructor(private http: HttpClient) { }
  @ViewChild('canvas', { static: true })

  canvas: any = null;
  ctx: any = null;
  x: any;
  y: any;
  x2: any;
  y2: any;
  radiusx: any;
  radiusy: any;
  centerx: any;
  centery: any;
  rectanglef: any = 0; squaref: any = 0; border: any = 0; fill: any = 0;
  linef: any = 0; selectf: any = 0;
  ellipsef: any = 0; circulef: any = 0;
  trianglef: any = 0;
  colour: string = "#ffffff";
  Bcolor: string = "ffffff";
  width: any;
  height: any;
  isDrawing = false;
  shapes = new Map();
  redof = 0; undof = 0;
  savef = false; laodf = false;
  count = 1;
  coordinates: number[] = [];
  back: any;
  path: any = "";
  loadf = 0;




  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.canvas.addEventListener('mousedown', (e: { offsetX: any; offsetY: any; }) => {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    });

    this.canvas.addEventListener('mouseup', (e: { offsetX: any; offsetY: any; }) => {
      if (this.isDrawing === true) {
        this.x2 = e.offsetX;
        this.y2 = e.offsetY;
        if (this.squaref == 1) {
          this.square();
        }
        else if (this.rectanglef == 1) {
          this.rectangle();
        }
        else if (this.ellipsef == 1) {
          this.ellipse();
        }
        else if (this.circulef == 1) {
          this.circle();
        }
        else if (this.trianglef == 1) {
          this.triangle();
        }
        else if (this.linef == 1) {
          this.line();
        }
        else if (this.selectf == 1) {
          this.select();
        }
        this.isDrawing = false;
      }
    });

  }
  Dsquare() {
    this.rectanglef = 0, this.linef = 0; this.selectf = 0; this.squaref = 1; this.ellipsef = 0; this.circulef = 0; this.trianglef = 0; this.redof = 0;
  }
  Drectangle() {
    this.rectanglef = 1, this.linef = 0; this.selectf = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 0; this.trianglef = 0; this.redof = 0;
  }
  Delipse() {
    this.rectanglef = 0, this.linef = 0; this.selectf = 0; this.squaref = 0; this.ellipsef = 1; this.circulef = 0; this.trianglef = 0; this.redof = 0;
  }
  Dcircle() {
    this.rectanglef = 0, this.linef = 0; this.selectf = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 1; this.trianglef = 0; this.redof = 0;
  }
  Dtriangle() {
    this.rectanglef = 0, this.linef = 0; this.selectf = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 0; this.trianglef = 1; this.redof = 0;
  }
  Dline() {
    this.rectanglef = 0, this.linef = 1; this.selectf = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 0; this.trianglef = 0; this.redof = 0;
  }
  Dselect() {
    this.rectanglef = 0, this.linef = 0; this.selectf = 1; this.squaref = 0; this.ellipsef = 0; this.circulef = 0; this.trianglef = 0; this.redof = 0;
  }

  square() {

    this.ctx.beginPath();
    this.width = Math.abs(this.x - this.x2)
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(Math.min(this.x, this.x2), Math.min(this.y, this.y2), this.width, this.width);

    this.store('square', 'none', this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
    console.log(this.shapes);
    this.isDrawing = false;
    this.ctx.closePath();
  }
  rectangle() {
    this.ctx.beginPath();
    this.width = Math.abs(this.x - this.x2)
    this.height = Math.abs(this.y - this.y2)
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(Math.min(this.x, this.x2), Math.min(this.y, this.y2), this.width, this.height);
    this.isDrawing = false;

    this.store('rectangle', 'none', this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
    console.log(this.shapes);
    this.ctx.closePath();
  }
  ellipse() {

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.radiusx = Math.abs(this.x2 - this.x) / 2;
    this.radiusy = Math.abs(this.y2 - this.y) / 2;
    this.centerx = Math.abs(this.x2 + this.x) / 2;
    this.centery = Math.abs(this.y2 + this.y) / 2;
    this.ctx.ellipse(this.centerx, this.centery, this.radiusx, this.radiusy, Math.PI, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.store('ellipse', 'none', this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
    console.log(this.shapes);
    this.isDrawing = false;

  }
  circle() {

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.radiusx = Math.abs(this.x2 - this.x) / 2;
    this.centerx = Math.abs(this.x2 + this.x) / 2;
    this.centery = Math.abs(this.y2 + this.y) / 2;
    this.ctx.arc(this.centerx, this.centery, this.radiusx, 0, 2 * Math.PI);

    this.store('circle', 'none', this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
    console.log(this.shapes);
    this.ctx.stroke();
  }
  triangle() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y2);
    this.ctx.lineTo(this.x2, this.y2);

    this.ctx.closePath();

    this.store('triangle', 'none', this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
    console.log(this.shapes);
    this.ctx.stroke();

  }
  line() {

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.stroke();
    this.isDrawing = false;

    this.store('line', 'none', this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);

    console.log(this.shapes);
    this.ctx.closePath();

  }


  Cfill() {
    this.fill = 1;
    this.color();
  }
  Cborder() {
    this.border = 1; this.color();
  }

  color() {
    this.colour = (<HTMLInputElement>document.getElementById("color-fill")).value;
    this.Bcolor = (<HTMLInputElement>document.getElementById("color-border")).value;

    if (this.squaref == 1) {
      this.ctx.rect(Math.min(this.x, this.x2), Math.min(this.y, this.y2), this.width, this.width);
      if (this.fill == 1) {
        this.ctx.fillStyle = this.colour;
        this.ctx.fill(); this.fill = 0;
      }

      this.ctx.lineWidth = 2;
      if (this.border == 1) {
        this.ctx.strokeStyle = this.Bcolor; this.border = 0;
      }
      // this.count--;
      this.store('square', this.ctx.fillStyle, this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
      console.log(this.shapes);

      this.ctx.stroke();
    }
    else if (this.rectanglef == 1) {
      this.ctx.rect(Math.min(this.x, this.x2), Math.min(this.y, this.y2), this.width, this.height);
      if (this.fill == 1) {
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        this.fill = 0;
      }
      this.ctx.lineWidth = 2;
      if (this.border == 1) {
        this.ctx.strokeStyle = this.Bcolor;
        this.border = 0;
      }

      // this.count--;
      this.store('rectangle', this.ctx.fillStyle, this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
      this.ctx.stroke();
    }
    else if (this.ellipsef == 1) {
      if (this.border == 1) {
        this.ctx.strokeStyle = this.Bcolor; this.border = 0;
      }
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.ellipse(this.centerx, this.centery, this.radiusx, this.radiusy, Math.PI, 0, 2 * Math.PI);
      if (this.fill == 1) {
        this.ctx.fillStyle = this.colour;
        this.ctx.fill(); this.fill = 0;
      }
      // this.count--;
      this.store('ellipse', this.ctx.fillStyle, this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
      this.ctx.stroke();
    }
    else if (this.circulef == 1) {
      if (this.border == 1) {
        this.ctx.strokeStyle = this.Bcolor; this.border = 0;
      }
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.arc(this.centerx, this.centery, this.radiusx, 0, 2 * Math.PI);
      if (this.fill == 1) {
        this.ctx.fillStyle = this.colour;
        this.ctx.fill(); this.fill = 0;
      }

      // this.count--;
      this.store('circle', this.ctx.fillStyle, this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
      this.ctx.stroke();
    }
    else if (this.trianglef == 1) {
      if (this.border == 1) {
        this.ctx.strokeStyle = this.Bcolor; this.border = 0;
      }
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      if (this.fill == 1) {
        this.ctx.fillStyle = this.colour;
      }
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x, this.y2);
      this.ctx.lineTo(this.x2, this.y2);
      if (this.fill == 1) {
        this.ctx.fill(); this.fill = 0;
      }

      // this.count--;
      this.store('triangle', this.ctx.fillStyle, this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
      this.ctx.closePath();
      this.ctx.stroke();

    }
    else if (this.linef == 1) {
      if (this.border == 1) {
        this.ctx.strokeStyle = this.Bcolor; this.border = 0;
      }
      if (this.fill == 1) {
        this.ctx.strokeStyle = this.colour; this.fill = 0;
      }
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x2, this.y2);
      this.ctx.stroke();

      // this.count--;
      this.store('line', this.ctx.strokeStyle, this.ctx.strokeStyle, this.x, this.y, this.x2, this.y2);
      this.isDrawing = false;
      this.ctx.closePath();

    }
  }

  store(shape: any, color: any, border: any, x1: any, y1: any, x2: any, y2: any,) {
    if (x1 != x2 && y1 != y2) {
      this.shapes.set(this.count, [shape, color, border, x1, y1, x2, y2]);
      this.send();
      this.count++;
    }
  }

  displaySave() {
    this.savef = !this.savef;
    if (this.savef) {
      document.getElementById("save-form")!.style.display = "block";

    }
    else {
      document.getElementById("save-form")!.style.display = "none";

    }
  }
  displayLoad() {
    this.laodf = !this.laodf;
    if (this.laodf) {
      document.getElementById("load-form")!.style.display = "block";
    }
    else {
      document.getElementById("load-form")!.style.display = "none";

    }
  }

  select() {

    this.ctx.beginPath();
    this.width = Math.abs(this.x - this.x2)
    this.height = Math.abs(this.y - this.y2)
    this.ctx.strokeStyle = '#FF0000';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(Math.min(this.x, this.x2), Math.min(this.y, this.y2), this.width, this.height);
    this.isDrawing = false;
    this.ctx.closePath();
  }

  DeleteSelected() {
    this.ctx.clearRect(Math.min(this.x, this.x2) - 1, Math.min(this.y, this.y2) - 1, this.width + 2, this.height + 2);
  }

  deleteAll() {
    if (this.loadf == 0) {
      this.undof = 1
      this.undo();
      this.shapes.clear();
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  }

  send() {
    this.coordinates = [this.shapes.get(this.count)[3], this.shapes.get(this.count)[4], this.shapes.get(this.count)[5], this.shapes.get(this.count)[6]];

    this.http.get('http://localhost:8080/back/shape', {
      responseType: 'text',
      params: {
        id: this.count,
        type: this.shapes.get(this.count)[0],
        fill: this.shapes.get(this.count)[1],
        border: this.shapes.get(this.count)[2],
        coordinates: this.coordinates
      },
      observe: "response"

    })
      .subscribe((response) => {
        this.back = response.body;
      })

  }

  savexml() {

  }
  savejson() {

  }
  loadxml() {

  }
  loadjson() {

  }
  load() {
    this.loadf = 1;
    this.deleteAll();
    let map = new Map<any, any>();
    map = this.shapes;
    for (let item of map.keys()) {
      let filling = map.get(item)[1];
      let bordering = map.get(item)[2];
      let x = map.get(item)[3];
      let y = map.get(item)[4];
      let dim1 = map.get(item)[5];
      let dim2 = map.get(item)[6];
      if (map.get(item)[0] == 'rectangle') {
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, dim1, dim2);
        if (filling != 'none') {
          this.ctx.fillStyle = filling;
          this.ctx.fillRect(x, y, dim1, dim2);
        }
        this.ctx.lineWidth = 2;

        console.log(filling)
      }
      else if (map.get(item)[0] == 'square') {
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, dim1, dim1);
        if (filling != 'none') {
          this.ctx.fillStyle = filling;
          this.ctx.fillRect(x, y, dim1, dim1);
        }
        this.ctx.lineWidth = 2;

        this.ctx.closePath();
      }
      else if (map.get(item)[0] == 'circle') {
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.arc(x, y, dim1, 0, 2 * Math.PI);
        if (filling != 'none') {
          this.ctx.fillStyle = filling;
          this.ctx.fill();
        }
        this.ctx.stroke();
        this.ctx.closePath();
      }
      else if (map.get(item)[0] == 'ellipse') {
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.ellipse(x, y, dim1, dim2, Math.PI, 0, 2 * Math.PI);
        if (filling != 'none') {
          this.ctx.fillStyle = filling;
          this.ctx.fill();
        }
        this.ctx.stroke();
        this.ctx.closePath();
      }
      else if (map.get(item)[0] == 'triangle') {
        this.ctx.strokeStyle = bordering;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        if (filling != 'none') {
          this.ctx.fillStyle = filling;
        }
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, dim2);
        this.ctx.lineTo(dim1, dim2);
        if (filling != 'none') {
          this.ctx.fill();
        }
        this.ctx.closePath();
        this.ctx.stroke();
      }
      else if (map.get(item)[0] == 'line') {
        this.ctx.strokeStyle = bordering;
        this.ctx.strokeStyle = filling;
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(dim1, dim2);
        this.ctx.stroke();
        this.isDrawing = false;
        this.ctx.closePath();
      }
    }
    this.loadf = 0;
  }
  undo() {
    this.redof = 1;
    this.http.get('http://localhost:8080/back/undo', {
      responseType: 'json',
      params: {
        undo: this.undof,
      },
      observe: "response"

    })
      .subscribe((response) => {

        var map = new Map<any, any>();
        for (var value in response.body) {
          let myObj: { [index: string]: any } = {};
          myObj = response.body;

          map.set(Number(value), myObj[value]);
        }
        this.shapes = map;
        console.log(this.shapes);
        this.load();
        if (this.undof == 1) {
          this.undof = 0;
        }
      })

  }
  redo() {
    this.http.get('http://localhost:8080/back/redo', {
      responseType: 'json',
      params: {
        redo: this.redof,
      },
      observe: "response"

    })
      .subscribe((response) => {



        var map = new Map<any, any>();
        for (var value in response.body) {
          let myObj: { [index: string]: any } = {};
          myObj = response.body;

          map.set(Number(value), myObj[value]);
        }
        this.shapes = map;
        console.log(this.shapes);
        this.load();
      })

  }


}
