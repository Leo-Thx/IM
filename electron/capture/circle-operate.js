const EventEmitter = require('events');

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
        // this.node.addEventListener('mouseup', this.onMouseUp);
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
        console.info(' Circle.mouseUp ');
    }
}

class CircleLeftTop extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }

    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.startX = event.pageX;
        rectangle.startY = event.pageY;

        rectangle.height = rectangle.endY - rectangle.startY;
        rectangle.width = rectangle.endX - rectangle.startX;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.left = `${event.pageX}px`;
        $canvasContainer.style.top = `${event.pageY}px`;
        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;
    }
}

class CircleTop extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }

    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.startY = event.pageY;
        rectangle.height = rectangle.endY - rectangle.startY;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.top = `${event.pageY}px`;
        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;
    }
}

class CircleRightTop extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }

    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.startY = event.pageY;
        rectangle.endX = event.pageX;

        rectangle.height = rectangle.endY - rectangle.startY;
        rectangle.width = rectangle.endX - rectangle.startX;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.top = `${event.pageY}px`;
        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;
    }
}

class CircleRight extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }

    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.endX = event.pageX;
        rectangle.width = event.pageX - rectangle.startX;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;
    }
}

class CircleRightBottom extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.endY = event.pageY;
        rectangle.endX = event.pageX;
        rectangle.height = rectangle.endY - rectangle.startY;
        rectangle.width = rectangle.endX - rectangle.startX;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;

    }
}

class CircleBottom extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.endY = event.pageY;
        rectangle.height = rectangle.endY - rectangle.startY;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;
    }
}

class CircleLeftBottom extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.startX = event.pageX;
        rectangle.endY = event.pageY;

        rectangle.height = rectangle.endY - rectangle.startY;
        rectangle.width = rectangle.endX - rectangle.startX;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.left = `${event.pageX}px`;
        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;
    }
}

class CircleLeft extends Circle{
    constructor(container, type, cursor, zone, capture) {
        super( container, type, cursor, zone, capture )
    }
    calcRectangle( event ) {
        let { rectangle, $canvasContainer } = this.capture;
        rectangle.startX = event.pageX;
        rectangle.width = rectangle.endX - rectangle.startX;
        
        this.capture.calcPointMaskFence({pageX: rectangle.endX, pageY: rectangle.endY});

        $canvasContainer.style.left = `${event.pageX}px`;
        $canvasContainer.style.width = `${rectangle.width}px`;
        $canvasContainer.style.height = `${rectangle.height}px`;
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


const CIRCLES = [
    { type: 'LeftTop', cursor: 'nwse-resize'},   
    { type: 'RightBottom', cursor: 'nwse-resize'},

    { type: 'RightTop', cursor: 'nesw-resize' },
    { type: 'LeftBottom', cursor: 'nesw-resize' },

    { type: 'Top', cursor: 'ns-resize' },
    { type: 'Bottom', cursor: 'ns-resize' },
    
    { type: 'Right', cursor: 'ew-resize' },
    { type: 'Left', cursor: 'ew-resize' },
];

module.exports.Circle = function(container, zone, capture){
    let result = {};
    CIRCLES.forEach(circle=>{
        let Ctor = Circle[ `Circle${circle.type}` ];
        result[ circle.type ] = new Ctor(container, circle.type, circle.cursor, zone, capture);
    });
    return result;
};


module.exports.EventType = EventType;
