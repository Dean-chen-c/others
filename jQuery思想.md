### jQuery思想

```js
(function () {
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
  };
  my.extend = my.fn.extend = function () {
    var target = arguments[0] || {},
      i = 1,
      length = arguments.length;
    if (i === length) {
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
  //可以无 new 实例化 my 对象的关键，init的实例可以调用my原型上的方法
  my.fn.init.prototype = my.prototype;
  window.my = my;
  return my;
})();
```

