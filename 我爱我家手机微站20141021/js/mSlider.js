//活动轮播图
function createPicMove(a, b, c) {
    var g = function (j) {
        return "string" == typeof j ? document.getElementById(j) : j
    };
    var d = function (j, l) {
        for (var k in l) {
            j[k] = l[k]
        }
        return j
    };
    var f = function (j) {
        return j.currentStyle || document.defaultView.getComputedStyle(j, null)
    };
    var i = function (l, j) {
        var k = Array.prototype.slice.call(arguments).slice(2);
        return function () {
            return j.apply(l, k.concat(Array.prototype.slice.call(arguments)))
        }
    };
    var e = {
        Quart: {
            easeOut: function (k, j, m, l) {
                return -m * ((k = k / l - 1) * k * k * k - 1) + j
            }
        },
        Back: {
            easeOut: function (k, j, n, m, l) {
                if (l == undefined) {
                    l = 1.70158
                }
                return n * ((k = k / m - 1) * k * ((l + 1) * k + l) + 1) + j
            }
        },
        Bounce: {
            easeOut: function (k, j, m, l) {
                if ((k /= l) < (1 / 2.75)) {
                    return m * (7.5625 * k * k) + j
                } else {
                    if (k < (2 / 2.75)) {
                        return m * (7.5625 * (k -= (1.5 / 2.75)) * k + 0.75) + j
                    } else {
                        if (k < (2.5 / 2.75)) {
                            return m * (7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375) + j
                        } else {
                            return m * (7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375) + j
                        }
                    }
                }
            }
        }
    };
    var h = function (k, n, m, l) {
        this._slider = g(n);
        this._container = g(k);
        this._timer = null;
        this._count = Math.abs(m);
        this._target = 0;
        this._t = this._b = this._c = 0;
        this.Index = 0;
        this.SetOptions(l);
        this.Auto = !!this.options.Auto;
        this.Duration = Math.abs(this.options.Duration);
        this.Time = Math.abs(this.options.Time);
        this.Pause = Math.abs(this.options.Pause);
        this.Tween = this.options.Tween;
        this.onStart = this.options.onStart;
        this.onFinish = this.options.onFinish;
        var j = !!this.options.Vertical;
        this._css = j ? "top" : "left";
        var o = f(this._container).position;
        o == "relative" || o == "absolute" || (this._container.style.position = "relative");
        this._container.style.overflow = "hidden";
        this._slider.style.position = "absolute";
        this.Change = this.options.Change ? this.options.Change : this._slider[j ? "offsetHeight" : "offsetWidth"] / this._count
    };
    h.prototype = {
        SetOptions: function (j) {
            this.options = {
                Vertical: true,
                Auto: true,
                Change: 0,
                Duration: 50,
                Time: 10,
                Pause: 4000,
                onStart: function () { },
                onFinish: function () { },
                Tween: e.Quart.easeOut
            };
            d(this.options, j || {})
        },
        Run: function (j) {
            j == undefined && (j = this.Index);
            j < 0 && (j = this._count - 1) || j >= this._count && (j = 0);
            this._target = -Math.abs(this.Change) * (this.Index = j);
            this._t = 0;
            this._b = parseInt(f(this._slider)[this.options.Vertical ? "top" : "left"]);
            this._c = this._target - this._b;
            this.onStart();
            this.Move()
        },
        Move: function () {
            clearTimeout(this._timer);
            if (this._c && this._t < this.Duration) {
                this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
                this._timer = setTimeout(i(this, this.Move), this.Time)
            } else {
                this.MoveTo(this._target);
                this.Auto && (this._timer = setTimeout(i(this, this.Next), this.Pause))
            }
        },
        MoveTo: function (j) {
            this._slider.style[this._css] = j + "px"
        },
        Next: function () {
            this.Run(++this.Index)
        },
        Previous: function () {
            this.Run(--this.Index)
        },
        Stop: function () {
            clearTimeout(this._timer);
            this.MoveTo(this._target)
        }
    };
    return new h(a, b, c, {
        Vertical: false
    })
}

// 数量
var picCount = $("#idSlider2 li").length;
// 总宽
$("#idSlider2").css("width", (picCount * 100) + "%");
// 下标总宽
$(".pic-num1").css("width", (picCount * 30) + "px");

var forEach = function (array, callback) {
    for (var i = 0, len = array.length; i < len; i++) { callback.call(this, array[i], i); }
}
var st = createPicMove("idContainer2", "idSlider2", picCount);	//图片数量更改后需更改此数值
var nums = [];
//插入数字
for (var i = 0, n = st._count - 1; i <= n; i++) {
    var li = document.createElement("li");
    nums[i] = document.getElementById("idNum").appendChild(li);
}
//设置按钮样式
st.onStart = function () {
    //forEach(nums, function(o, i){ o.className = ""})
    forEach(nums, function (o, i) { o.className = st.Index == i ? "new-tbl-cell on" : "new-tbl-cell"; })
}
// 重新设置浮动
$("#idSlider2").css("position", "relative");

var _initX = 0;
var _finishX = 0;
var _startX = 0;
var _startY = 0;
function touchStart(event) {
    _startX = event.touches[0].clientX;
    _startY = event.touches[0].clientY;
    _initX = _startX;
}
function touchMove(event) {
    var touches = event.touches;
    var _endX = event.touches[0].clientX;
    var _endY = event.touches[0].clientY;
    if (Math.abs(_endY - _startY) > Math.abs(_endX - _startX)) {
        return;
    }
    event.preventDefault();
    _finishX = _endX;
    var _absX = Math.abs(_endX - _startX);
    var lastX = $('#idSlider2').css('left').replace('px', '');
    if (_startX > _endX) {
        st.Stop();
        $('#idSlider2').css('left', (parseInt(lastX) - _absX) + 'px');
    } else {
        st.Stop();
        $('#idSlider2').css('left', (parseInt(lastX) + _absX) + 'px');
    }
    _startX = _endX;
}
//触屏  离开屏幕事件
function touchEnd(event) {
    if (_finishX == 0) {
        return;
    }
    if (_initX > _finishX) {
        bindEvent(_initX, _finishX);
    } else if (_initX < _finishX) {
        bindEvent(_initX, _finishX);
    }
    _initX = 0;
    _finishX = 0;
}

/**
 *  绑定触屏触发事件
 * @param start
 * @param end
 */
function bindEvent(start, end) {
    if (start >= end) {
        st.Next();
    } else {
        st.Previous();
    }
}
var resetScrollEle = function () {
    var slider2Li = $("#idSlider2 li");
    slider2Li.css("width", $(".scroll-wrapper").width() + "px");
}

window.addEventListener("resize", function () {
    st.Change = st._slider.offsetWidth / st._count;
    st.Next();
    resetScrollEle();
});
window.addEventListener("orientationchange", function () {
    st.Change = st._slider.offsetWidth / st._count;
    st.Next();
    resetScrollEle();
})

st.Run();
resetScrollEle();