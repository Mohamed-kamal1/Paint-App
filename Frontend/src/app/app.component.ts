import { Component, Renderer2, HostListener, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap.css']
})
export class AppComponent implements AfterViewInit {
  title = 'paint';
  // constructor(private http: HttpClient) { }
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
  linef: any = 0; se: any = 0;
  ellipsef: any = 0; circulef: any = 0;
  trianglef: any = 0;
  colour: string = "#ffffff";
  Bcolor: string = "ffffff";
  width: any;
  height: any;
  isDrawing = false;
  shapes = new Map();
  redoo = 0;
  savef = false; laodf = false;


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
        this.isDrawing = false;
      }
    });

  }
  Dsquare() {
    this.rectanglef = 0, this.linef = 0; this.se = 0; this.squaref = 1; this.ellipsef = 0; this.circulef = 0; this.trianglef = 0; this.redoo = 0;
  }
  Drectangle() {
    this.rectanglef = 1, this.linef = 0; this.se = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 0; this.trianglef = 0; this.redoo = 0;
  }
  Delipse() {
    this.rectanglef = 0, this.linef = 0; this.se = 0; this.squaref = 0; this.ellipsef = 1; this.circulef = 0; this.trianglef = 0; this.redoo = 0;
  }
  Dcircle() {
    this.rectanglef = 0, this.linef = 0; this.se = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 1; this.trianglef = 0; this.redoo = 0;
  }
  Dtriangle() {
    this.rectanglef = 0, this.linef = 0; this.se = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 0; this.trianglef = 1; this.redoo = 0;
  }
  Dline() {
    this.rectanglef = 0, this.linef = 1; this.se = 0; this.squaref = 0; this.ellipsef = 0; this.circulef = 0; this.trianglef = 0; this.redoo = 0;
  }

  square() {

    this.ctx.beginPath();
    this.width = Math.abs(this.x - this.x2)
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(Math.min(this.x, this.x2), Math.min(this.y, this.y2), this.width, this.width);

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


    console.log(this.shapes);
    console.log(this.ctx.isPointInPath(this.x2, this.y2));
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

      this.isDrawing = false;
      this.ctx.closePath();

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


}
