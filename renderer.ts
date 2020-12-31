const Konva = require('konva');

let inRectArr = [];
let layer;
function test() {

    // var x: string = '1';
    // var y: number;
    // console.log( typeof x, typeof y );
    
    // x = 'hello';
    // y = 2;
    // console.log( typeof x, typeof y );
    
    // x = 'true';
    // y = 3;
    // console.log( typeof x, typeof y );
    
    let width: number = window.innerWidth;
    let height: number = window.innerHeight;
    

    // first we need to create a stage
    var stage = new Konva.Stage({
        container: 'container',   // id of container <div>
        width: width, //500,
        height: height //500
    });

    // then create layer
    layer = new Konva.Layer();
    // add the layer to the stage
    stage.add(layer);

    let main = new Konva.Rect({
        x: 10,
        y: 10,
        width: 240,
        height: 80,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 4,
        cornerRadius: 16
    });

    layer.add(main);
    for(let i = 0; i < 6; i++){
        let x = 10 + 40 * i;
        let color;
        if(i == 2 || i == 5) color = 'white';
        else color = 'blue'; 
        let r = new Konva.Rect({
            x: i==5 ? x-20 : x,
            y: 10,
            width: (i==0 || i==5) ? 60 : 40,
            height: 80,
            fill: color,
            stroke: 'black',
            strokeWidth: 4,
            cornerRadius: (i==0 || i==5) ? 16 : 0
        });
        inRectArr.push(r);
    }
    for(let i = 0; i < 4; i++){
        layer.add(inRectArr[i]);
    }
    layer.add(inRectArr[5]);
    layer.add(inRectArr[4]);
    // create our shape
    var circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
    });

    // add the shape to the layer
    layer.add(circle);

    // // add the layer to the stage
    // stage.add(layer);

    // draw the image
    layer.draw();
}

test();

function move(i: number){
    switch (i){
        case 0:
            // 2, 5
            inRectArr[1].fill('blue');
            inRectArr[2].fill('white');
            inRectArr[4].fill('blue');
            inRectArr[5].fill('white');
            break;
        case 1:
            // 0, 3
            inRectArr[5].fill('blue');
            inRectArr[0].fill('white');
            inRectArr[2].fill('blue');
            inRectArr[3].fill('white');
            break;
        case 2:
            // 1, 4
            inRectArr[0].fill('blue');
            inRectArr[1].fill('white');
            inRectArr[3].fill('blue');
            inRectArr[4].fill('white');
            break;
    }
    layer.draw();
}

let ind = 0;

setInterval(()=>{
    move(ind);
    if(ind == 2) ind = 0;
    else ind++;
}, 150);
//move(2);