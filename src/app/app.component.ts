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
        

        const imageObj = new Image();
        const imageUrl = "./assets/xanadu-terrain_181231-104856.png";
        imageObj.src = imageUrl;

        fabric.Image.fromURL(imageUrl, function (img) {
            // canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            //   scaleX: canvas.width / img.width,
            //   scaleY: canvas.height / img.height
            // });
            img.scale(0.085) // <<<<<----- Apply scale
            canvas.add(img);
            canvas.renderAll();
            //   canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {

            //     // Optionally add an opacity lvl to the image
            //     backgroundImageOpacity: 0.5,
            //     // should the image be resized to fit the container?
            //     backgroundImageStretch: true
            //   });


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

        const rect = new fabric.Rect({
            top: 100,
            left: 100,
            width: 60,
            height: 70,
            fill: 'red'
        });
        canvas.add(rect);

        canvas.on('mouse:wheel', function (opt) {

            // todo look at https://jsfiddle.net/fgLmyxw4/
            var delta = opt.e.deltaY;
            var zoom = canvas.getZoom();
            console.log("Zoom", zoom);
            zoom = zoom - delta / 200;
            // if (zoom > 40) zoom = 40;
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
            if (this.isDragging)
            {
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


