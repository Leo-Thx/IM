const EventEmitter = require('events');
const { CIRCLES } = require('./config');

const EventType = {
    MouseUp: 'operate-mouseup',
    MouseDown: 'operate-mousedown',
    MouseMove: 'operate-mouseMove'
};

class Circle extends EventEmitter {
    constructor(container, type, cursor, zone, capture) {
        super();

        this.container = container;
        this.cursor = cursor;
        this.type = type;

        this.zone = zone;
        this.capture = capture;

        this.cssClass = 'circle-' + type.toLowerCase();

        let node = document.createElement('div');
        node.classList.add('operate-circle', this.cssClass);

        this.node = node;
        this.container.append(node);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp   = this.onMouseUp.bind(this);

        this.node.addEventListener('mousedown', this.onMouseDown);
        this.node.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown(event){
        event.preventDefault();
        event.stopPropagation();

        this.emit(EventType.MouseDown, {
            type: this.type,
            operate: this,
            event
        });
    }

    onMouseUp(event){
        this.emit(EventType.MouseUp);
    }
}

class CircleLeftTop extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
}

class CircleTop extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
}

class CircleRightTop extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
}

class CircleRight extends Circle{
    constructor( container, type, cursor ){
        super( container, type, cursor )
    }
}

class CircleRightBottom extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
}

class CircleBottom extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
}
class CircleLeftBottom extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
}
class CircleLeft extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
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


module.exports.Circle = function(container, zone, capture){
    let result = {};
    CIRCLES.forEach(circle=>{
        let Ctor = Circle[ `Circle${circle.type}` ];
        result[ circle.type ] = new Ctor(container, circle.type, circle.cursor, zone, capture);
    });
    return result;
};


module.exports.EventType = EventType;
