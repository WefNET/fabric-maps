import { Component, OnInit } from '@angular/core';

declare const fabric: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'maps-fabric';


  ngOnInit() {
    const canvas = new fabric.Canvas('canvas');
    const rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 70,
      fill: 'red'
    });
    canvas.add(rect);

    const imageObj = new Image();
    const imageUrl = "./assets/xanadu-terrain_181231-104856.png";
    imageObj.src = imageUrl;

    fabric.Image.fromURL(imageUrl, function (img) {
      // canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      //   scaleX: canvas.width / img.width,
      //   scaleY: canvas.height / img.height
      // });

      canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
        scaleX: 0.5,
        scaleY: 0.5,
        // Optionally add an opacity lvl to the image
        backgroundImageOpacity: 0.5,
        // should the image be resized to fit the container?
        backgroundImageStretch: true
      });
    });

    // canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
    //   // Optionally add an opacity lvl to the image
    //   backgroundImageOpacity: 0.5,
    //   // should the image be resized to fit the container?
    //   backgroundImageStretch: true
    // });

    var width = window.innerWidth;
    var height = window.innerHeight;

    canvas.setWidth(width) - 20;
    canvas.setHeight(height - 20);
    canvas.calcOffset();



    canvas.on('mouse:wheel', function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom = zoom - delta / 50;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    })

    canvas.on('mouse:down', function (opt) {
      var evt = opt.e;

      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;

    });
    canvas.on('mouse:move', function (opt) {
      if (this.isDragging) {
        var e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on('mouse:up', function (opt) {
      this.isDragging = false;
      this.selection = true;
    });



  }
}


