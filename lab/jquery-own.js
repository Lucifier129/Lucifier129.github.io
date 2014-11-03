;(function(window) {
        var obj = {},
            toStr = obj.toString,
            hasOwnProp = obj.hasOwnProperty,
            arr = [],
            slice = arr.slice,
            push = arr.push;

        var isObject = function(obj) {
                return obj == null ? obj.toString() : toStr.call(obj) === '[object Object]';
            },
            isArray = Array.isArray || function(obj) {
                return toStr.call(obj) === '[object Array]';
            },
            isFunction = function(obj) {
                return typeof obj === 'function';
            },
            isString = function(obj) {
                return typeof obj === 'string';
            },
            isBoolean = function(obj) {
                return typeof obj === 'boolean';
            },
            inArray = function(arr, item) {
                return arr.indexOf(item) !== -1;
            };

        function each(obj, callback) {
            //如果既不是对象也不是数组，不迭代，直接返回
            if (!isObject(obj) && !isArray(obj)) {
                return obj;
            }
            var len = obj.length;
            //要求obj.length类型为数字且不小于0
            //符合该条件就当做数组来迭代
            if (typeof len === 'number' && len >= 0) {
                //如果有用户滥用length属性，导致错误是其活该
                for (var i = 0; i < len; i += 1) {
                    //callback函数的this值为数组中的每一项
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        //如果callback函数的返回值等价于false
                        //终止迭代
                        break;
                    }
                }
            } else {
                //程序运行到这一步，说明该迭代的Obj类型为object
                for (var prop in obj) {
                    if (hasOwnProp.call(obj, prop)) {
                        if (callback.call(obj[prop], prop, obj[prop]) === false) {
                            break;
                        }
                    }
                }
            }
            //返回被迭代的数组或对象
            return obj;
        }
        //好用的函数，输出为静态方法
        jQuery.each = each;

        function extend(target) {
            //将除target之外的所有参数保存为sources
            var sources = slice.call(arguments, 1);
            //迭代器each派上了用场
            each(sources, function() {
                each(this, function(key, value) {
                     target[key] = value;
                });
            });
            //返回被扩展的对象
            return target;
        }

         //好用的函数，输出为静态方法
         jQuery.extend = extend;

        function pushStack(target) {
            var len = target.length;

            if (typeof len !== 'number' || len < 0) {
                //没有length属性，或者它小于0，直接返回target
                return target;
            }

            //保存除target外的所有参数并转化为数组形式
            var sources = slice.call(arguments, 1);

            each(sources, function() {
                //this值就是sources数组中的每一项
                var len = this.length;

                //同样判断是否为数组或类数组
                if (typeof len !== 'number' || len < 0) {
                    return;
                }

                //之前保存的常用函数之一push，派上用场
                //与apply结合，批量push进target中
                push.apply(target, this);
            });
            return target;
        }

        function jQuery(selector, context) {
            return new jQuery.init(selector, context);
        }

        //函数也是对象，也可以添加属性和方法
        jQuery.init = function(selector, context) {

            //定义length属性，成为类数组
            //可以用each迭代，用pushStack批量增加元素
            this.length = 0;

            if (selector && selector.nodeName) {
                //如果第一个参数为dom节点
                //保存为this[0]
                this[0] = selector;
                this.length = 1;
            } else if (isFunction(selector)) {
                //如果第一个参数为函数，则为DOM ready 事件
                return document.addEventListener('DOMContentLoaded', selector, false);
            } else {
                //原生方法处理selector选择器，如果有context上下文，则以它为起点搜索，否则以document为始
                //要求context必须是DOM，即便是jQuery的实例也不行，因为我们只是粗糙模拟
                var items = (context && context.nodeName ? context : document).querySelectorAll(selector);

                pushStack(this, items);
            }


        };

        //将jQuery的原型对象放到它的fn属性中
        jQuery.fn = jQuery.prototype;
        //本来这句与上句并做一起，为了便于理解，分拆开来
        //jQuery.init是函数，函数都有prototype原型对象
        //而且是可改变的，让它指向jQuery.prototype
        jQuery.init.prototype = jQuery.prototype;

        //设置一个jQuery的简写
        var $ = jQuery;

        //添加extend方法给jQuery的原型
        //专门用来拓展它自己
        $.fn.extend = function() {
            return extend.apply(window, [this].concat(slice.call(arguments)));
        };

        $.fn.extend({
            //each在这里很简单
            each: function(callback) {
                return each(this, callback);
            },
            //以下为搜索dom节点的操作
            find: function(selector) {
                //什么参数都不传，在这里返回空的jQ实例， 下同
                var ret = $();
                var nodes = [];
                //其实可以用each(this, callback)
                //但既然已经有$.fn.each，那就直接使用
                this.each(function() {
                    //注意：这里的this值，是上一个this值的项
                    //请看each函数的源码
                    var items = this.querySelectorAll(selector);

                    //搜索到的新元素先推入一个数组
                    //毕竟push为数组原生方法，比类数组更快
                    //items里有元素才推进去
                    items.length && push.apply(nodes, items);
                });
                //最后才推进新jQ实例
                return pushStack(ret, nodes);
            },
            eq: function(index) {
                index = index >= 0 ? index : index + this.length;
                return $(this[index]);
            },
            children: function(selector) {
                //返回新jQ实例
                var ret = $();
                var nodes = [];
                //如果有选择器参数，则新建一个jQuery专用的随机id
                var id = selector || 'jQuery' + Math.random().toString(36).substr(2);

                this.each(function() {
                    var items;
                    if (selector) {
                        //设置id，如果有就用其以前的id
                        this.id = this.id || id;
                        //构造选择器'#id>.target',选中所需元素
                        items = document.querySelectorAll(this.id + '>' + selector);
                        //拿到之后删除添加的随机id
                        if (this.id === id) {
                            this.removeAttribute('id');
                        }
                    } else {
                        //没选择器，直接获取children属性中的节点
                        items = this.children;
                    }

                    items.length && push.apply(nodes, items);
                });
                //推入栈
                return pushStack(ret, nodes);
            },
            first: function() {
                //新实例,下同
                var ret = $();
                var nodes = [];
                this.each(function() {
                    var item = this.firstElementChild;
                    //存在第一个非文本非注释的元素节点，才推进去
                    item && nodes.push(item);
                });
                //最后才全部压入栈,pushStack直接返回第一个参数，恰好是我们要返回的
                return pushStack(ret, nodes);
            },
            last: function() {
                var ret = $();
                var nodes = [];
                this.each(function() {
                    var item = this.lastElementChild;
                    item && nodes.push(item);
                });
                return pushStack(ret, nodes);
            },
            siblings: function(selector) {
                var ret = $();
                var nodes = [];
                //如果有选择器参数，则新建一个jQuery专用的随机id
                var id = selector || 'jQuery' + Math.random().toString(36).substr(2);
                this.each(function() {
                    //找到父节点
                    var parent = this.parentNode,
                        items;
                    if (selector) {
                        //设置id
                        parent.id = parent.id || id;
                        items = document.querySelectorAll(parent.id + '>' + selector);
                        //删除id
                        if (parent.id === id) {
                            parent.removeAttribute('id');
                        }
                        items.length && push.apply(nodes, items);
                    } else {
                        push.apply(nodes, parent.children);
                    }
                    //从数组中删除该节点，则余下全部兄弟节点
                    nodes.splice(nodes.indexOf(this), 1);
                });

                return pushStack(ret, nodes);
            },
            parent: function() {
                var ret = $();
                var nodes = [];

                this.each(function() {
                    var parent = this.parentNode;
                    parent && nodes.push(parent);
                });

                return pushStack(ret, nodes);
            },
            index: function() {
                var target = this[0];
                return slice.call(target.parentNode.children).indexOf(target);
            },
            append: function(node) {
                var len = this.length;
                this[0].appendChild(node);
                return this;
            },
            prepend: function(node) {
                var len = this.length;
                var first = this[0].firstElementChild;
                this[0].insertBefore(node, first);
                return this;
            }
        });

        $.fn.extend({
            css: function() {
                //css方法既是getter又是setter，参数不定
                //干脆不写形参，将实参转为数组形式
                var args = slice.call(arguments);
                var len = args.length;

                //如果参数数量为1，且其为字符串
                //就是 $(elem).css('color')
                if (len === 1 && typeof args[0] === 'string') {
                    //get one
                    return getComputedStyle(this[0], null).getPropertyValue(args[0]);
                } else if (len === 2) {
                    //形式为：$(elem).css('color', '#333');
                    //set all
                    return this.each(function() {
                        this.style[args[0]] = args[1];
                    });
                }
            },
            addClass: function(classNames) {
                //如果不是字符串参数，直接返回this
                if (typeof classNames !== 'string') {
                    return this;
                }
                //去掉两端空白符后，返回数组形式
                classNames = classNames.trim().split(' ');
                return this.each(function() {
                    var classList = this.classList;
                    //再遍历一遍，添加所有class名
                    each(classNames, function(key, value) {
                        classList.add(value);
                    });
                });
            },
            removeClass: function(classNames) {
                //如果不是字符串参数，直接返回this
                if (typeof classNames !== 'string') {
                    return this;
                }
                //去掉两端空白符后，返回数组形式
                classNames = classNames.trim().split(' ');
                return this.each(function() {
                    var classList = this.classList;
                    //再遍历一遍，删除所有class名
                    each(classNames, function(key, value) {
                        //与addClass只有一个差别
                        //许多可以合并函数来优化都没有做，只为直观
                        classList.remove(value);
                    });
                });
            }
        });

        //动画组件要定义一些工具方法
        var nextTick = requestAnimationFrame || function(fn) {
            return setTimeout(fn, 1000 / 60);
        };

        function getStyle(elem, prop) {
            return parseFloat(getComputedStyle(elem, null).getPropertyValue(prop), 10);
        }

        function animate(elem, propObj, duration, callback) {
            var start = +new Date();
            var oldValue = {};
            var diff = {};
            var ratio;
            for (var prop in propObj) {
                diff[prop] = propObj[prop] - (oldValue[prop] = getStyle(elem, prop));
            }


            function move() {
                ratio = (+new Date() - start) / duration;
                if (ratio < 1) {
                    each(diff, function(prop) {
                        elem.style[prop] = oldValue[prop] + this * ratio + 'px';
                    });
                    nextTick(move);
                } else {
                    each(diff, function(prop) {
                        elem.style[prop] = propObj[prop] + 'px';
                    });
                    callback();
                }
            }

            move();
        }

    function noop() {};

    $.fn.animate = function(propObj, duration, callback) {
        var self = this,
            len = self.length,
            count = 0;
        return self.each(function() {
            animate(this, propObj, duration || 400, typeof callback === 'function' ? function() {
                ++count === len && callback.call(self);
            } : noop);
        });
    };

    window.jQuery = window.$ = jQuery;

}(window));