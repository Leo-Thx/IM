// 由于涉及到以后进行涂鸦，截图单独由canvas节点处理
// 其他操作使用外放的节点

// module.exports = [
//     { row: 'x', col: 'y', cursor: 'nwse-resize' },
//     { row: '', col: 'y', cursor: 'ns-resize' },
//     { row: 'r', col: 'y', cursor: 'nesw-resize' },

//     { row: 'x', col: '', cursor: 'ew-resize' },
//     { row: 'r', col: '', cursor: 'ew-resize' },

//     { row: 'x', col: 'b', cursor: 'nesw-resize' },
//     { row: '', col: 'b', cursor: 'ns-resize' },
//     { row: 'r', col: 'b', cursor: 'nwse-resize' },
// ]

// const LINES = [
//     { type: 'Top', cursor: 'n-resize' },
//     { type: 'Right', cursor: 'e-resize' },
//     { type: 'Bottom', cursor: 's-resize' },
//     { type: 'Left', cursor: 'w-resize' },
// ];

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

module.exports = {
    // LINES, 
    CIRCLES
};
