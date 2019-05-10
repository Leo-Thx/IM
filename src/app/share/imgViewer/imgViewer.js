export default {
    name: "imgViewer",
    props: ['src'],
    data() {
        return {
            width: 500, //图片宽度
            height: 500,
            orginWidth: 1000, //图片原始宽度
            orginHeight: 1000,
            sensitive: 16, //双指缩放灵敏度 16就是60帧，33就是30帧
            prevTimeStamp: 0, //存储时间戳临时变量
            rotate: 0, //旋转的角度,
            scaleOpacity: 1, //缩放显示浮窗的透明度
            viewType: this.$store.state.imgView, //触控方式,默认是触摸板模式(1),鼠标模式为2
            displayNone: "",//延时显示缩放浮窗
            viewer: "",
            marginTop: '0px',
        }
    },
    computed: {
        scale() {
            var that = this
            that.scaleOpacity = 1;
            clearTimeout(this.displayNone);
            this.displayNone = setTimeout(() => {
                that.scaleOpacity = 0
            }, 1000)
            return (this.width / this.orginWidth).toFixed(2);
        },
        style() {
            return {
                width: this.width + 'px',
                transform: 'rotate(' + this.rotate + 'deg)',
                marginTop: Math.abs(window.innerHeight - this.height - 90) / 2 + 'px',
                marginBottom: Math.abs(window.innerHeight - this.height) / 2 + 'px'
            }
        }
    },
    methods: {
        getQueryString(name) {
            var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        },
        load(e) {
            this.orginWidth = document.getElementById('img').naturalWidth;
            this.orginHeight = document.getElementById('img').naturalHeight;
            this.height = ((this.width / this.orginWidth) * this.orginHeight).toFixed(0)
            this.$nextTick(() => {
                // var appDom = document.getElementById("imgView");
                // appDom.scrollTop = Math.abs(window.innerHeight - this.height) / 2

                this.alignCerter()
            })
        },
        stopAnimate() {
            document.getElementById('img').style.transition = 'none'
        },
        startAnimate() {
            document.getElementById('img').style.transition = 'all 0.2s'
        },
        zoom_in() {
            if (this.width > 3000) {
                return
            }
            this.width = (1 + 0.1) * this.width;
            this.height = (1 + 0.1) * this.height;
            this.$nextTick(() => {
                this.alignCerter();
                this.startAnimate();
            })
        },
        zoom_out() {
            if (this.width < 10) {
                return
            }
            this.width = this.width / (1 + 0.1);
            this.height = this.height / (1 + 0.1);
            this.$nextTick(() => {
                this.alignCerter();
                this.startAnimate();
            })
        },
        zoom_in_Click() {
            if (this.viewType == 1) {
                if (this.width > 500) {
                    this.stopAnimate()
                    this.width = (1 + 0.1) * this.width;
                    this.height = (1 + 0.1) * this.height;
                    this.$nextTick(() => {
                        this.alignCerter();
                        this.startAnimate();
                    })
                } else {
                    this.width = (1 + 0.1) * this.width;
                    this.height = (1 + 0.1) * this.height;
                }
            } else {
                this.viewer.zoom(0.1, true);
            }
        },
        zoom_out_Click() {
            if (this.viewType == 1) {
                if (this.width > 500) {
                    this.stopAnimate()
                    this.width = this.width / (1 + 0.1);
                    this.height = this.height / (1 + 0.1);
                    this.$nextTick(() => {
                        this.alignCerter();
                        this.startAnimate();
                    })
                } else {
                    this.width = this.width / (1 + 0.1);
                    this.height = this.height / (1 + 0.1);
                }
            } else {
                this.viewer.zoom(-0.1, true);
            }
        },
        repeat() {
            if (this.viewType == 1) {
                this.stopAnimate()
                if (this.width == this.orginWidth) {
                    this.width = 500
                    this.height = (500 / this.orginWidth) * this.orginHeight
                } else {
                    this.width = this.orginWidth;
                    this.height = this.orginHeight
                }
                this.$nextTick(() => {
                    this.alignCerter();
                    this.startAnimate();
                })
            } else {
                this.viewer.zoomTo(1, true);
            }
        },
        rotate_left() {
            if (this.viewType == 1) {
                this.startAnimate();
                this.rotate -= 90;
            } else {
                this.viewer.rotate(-90);
            }
        },
        rotate_right() {
            if (this.viewType == 1) {
                this.startAnimate();
                this.rotate += 90;
            } else {
                this.viewer.rotate(90);
            }
        },
        alignCerter() {
            // 放大超出窗口宽度时，滚动条始终居中
            var appDom = document.getElementById("imgView");
            appDom.scrollTop = appDom.scrollHeight > window.innerHeight ? (appDom.scrollHeight - appDom.clientHeight) / 2 : 0;
            appDom.scrollLeft = appDom.scrollWidth > window.innerWidth ? (appDom.scrollWidth - appDom.clientWidth) / 2 : 0;
        },
        zoom(e) {
            // 控制触摸板的频率
            if (e.timeStamp - this.prevTimeStamp > this.sensitive && this.viewType == 1) {
                //区分滚轮和触摸板,滚轮无法放大和缩小
                if (e.deltaY < 4 && e.deltaY > -4) {
                    this.stopAnimate()
                    this.prevTimeStamp = e.timeStamp
                    switch (e.wheelDelta) {
                        case 120:
                            this.zoom_in()
                            break;
                        case -120:
                            this.zoom_out()
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        mouseType() {
            this.viewType = 2;
            this.viewer = new Viewer(document.getElementById('img'), {
                inline: true,
                button: false,
                title: false,
                navbar: false,
                backdrop: false,
                viewed: function () {
                    // viewer.zoomTo(1);
                },
                toolbar: {
                    zoomIn: 0,
                    zoomOut: 0,
                    oneToOne: 0,
                    reset: 0,
                    prev: 0,
                    play: {
                        show: 0,
                        size: 'large',
                    },
                    next: 0,
                    rotateLeft: 0,
                    rotateRight: 0,
                    flipHorizontal: 0,
                    flipVertical: 0,
                }
            });
        },
        touchType() {
            this.viewType = 1;
            if (this.viewer) {
                this.viewer.destroy()
                this.viewer = null
            }
        },
        pressESC(e) {
            if (e.which == 27) {
                this.imEvent.$emit('imgViewerShow', '')
            }
        }
    },
    created() {
        var that = this
        this.displayNone = setTimeout(() => {
            that.scaleOpacity = 0
        }, 1000)

        if (global.process.platform == 'darwin') {
            this.marginTop = '22px';
        } else {
            this.marginTop = '32px';
        }
    },
    mounted() {
        // 监听ESC事件
        // document.activeElement.addEventListener('keydown', this.pressESC)
        console.log(this.src)
        if (this.$store.state.imgView == 1) {
            this.touchType();
            document.getElementById('imgView').style.overflow = 'auto';
        } else {
            this.mouseType();
            document.getElementById('imgView').style.overflow = 'hidden';
        }
    }
}
