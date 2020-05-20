### jQuery思想

- 整个沙箱
- 无news实例化
- 方便插件扩展
- 链式调用

```js
(function () {
  var class2type = {};
  var my = function (selector) {
    return new my.fn.init(selector);
  };
  // fn为my的原型 ，之后扩展都是原型上面的方法
  my.fn = my.prototype = {
    constructor: my,
    length: 0,
    init: function (selector) {
      return this;
    },
    each: function (callback) {
      return my.each(this, callback);
    },
  };
  my.extend = my.fn.extend = function () {
    var target = arguments[0] || {},
      i = 1,
      length = arguments.length;
    //是否扩展my
    if (i === length) {
      //可以指向 my，也可以指向 my.fn
      target = this;
      i--;
    }
    for (; i < length; i++) {
      for (var key in arguments[i]) {
        target[key] = arguments[i][key];
      }
    }
    return target;
  };

  //扩展 全局函数，不挂载到实例上面
  my.extend({
    each: function (obj, callback) {
      var length,
        i = 0;
      length = obj.length;
      for (; i < length; i++) {
        callback && callback.call(obj[i], i, obj[i]);
      }
      return obj;
    },
    type: function (obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function"
        ? class2type[toString.call(obj)] || "object"
        : typeof obj;
    },
    say: function () {
      return "say";
    },
  });
  // 扩展 实例方法
  my.fn.extend({
    sing: function () {
      return "sing";
    },
  });
  // 生成 class2type 的对象
  my.each(
    "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
      " "
    ),
    function (i, name) {
      console.log(this);
      class2type["[object " + name + "]"] = name.toLowerCase();
    }
  );
  //可以无 new 实例化 my 对象的关键，init的实例可以调用my原型上的方法
  my.fn.init.prototype = my.prototype;
  window.my = my;
  return my;
})();
```

