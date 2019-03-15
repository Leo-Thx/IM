const EventEmitter = require('events');
const { CIRCLES } = require('./config');

class Circle extends EventEmitter {
    constructor(container, type, cursor) {
        super();

        this.container = container;
        this.cursor = cursor;
        this.type = type;

        this.cssClass = 'circle-' + type.toLowerCase();
        this.mousedowned = false;   // 标志鼠标是否按下

        let node = document.createElement('div');
        node.classList.add('operate-circle', this.cssClass);

        this.node = node;
        this.container.append(node);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp   = this.onMouseUp.bind(this);

        this.node.addEventListener('mousedown', this.onMouseDown);
        this.node.addEventListener('mousemove', this.onMouseMove);
        this.node.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown(){
        console.info('onMouseDown');
    }
    onMouseMove(){
        console.info('onMouseMove');
    }
    onMouseUp(event){
        this.emit('e-mouseup');
    }
}

class CircleLeftTop extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}

class CircleTop extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}
class CircleRightTop extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}

class CircleRight extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}
class CircleRightBottom extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}

class CircleBottom extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}
class CircleLeftBottom extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}
class CircleLeft extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}


Object.assign(Circle, {
    CircleLeftTop,
    CircleTop,
    CircleRightTop,
    CircleRight,
    CircleRightBottom,
    CircleBottom,
    CircleLeftBottom,
    CircleLeft
});


module.exports = function(container){
    let result = {};
    CIRCLES.forEach(circle=>{
        let Ctor = Circle[ `Circle${circle.type}` ];
        result[ circle.type ] = new Ctor(container, circle.type, circle.cursor);
    });
    return result;
};

