/**
 * @author zhangxinxu(.com)
 * @description iPhoneX鐐僵娓愬彉鑳屾櫙瀹炵幇
 * @link http://www.zhangxinxu.com/wordpress/?p=6614
 * @license MIT 基于pixi.js的iPhoneX屏保
 */
var colorfulBackground = function (t) {
  var A = {
    container: document.body,
    size: [512, 512],
    grid: [2, 3],
    backgroundColor: '#E0DEE6',
    colors: ['#F24592', '#36129A', '#FDFB39', '#5DB7EE', '#E74C45', '#E5243F'],
    animation: true
  };
  t = t || {};
  var b = {};
  for (var n in A) {
    b[n] = typeof t[n] !== 'undefined' ? t[n] : A[n];
  }
  var g = document.createElement('canvas');
  var J = g.getContext('2d');
  var a = b.size[0];
  var c = b.size[1];
  g.width = a;
  g.height = c;
  J.fillStyle = b.backgroundColor;
  J.fillRect(0, 0, a, c);
  var E = b.grid;
  var C = [];
  for (var o = 0; o <= E[1]; o++) {
    if (o == 0 || o == E[1]) {
      C.push({ x: 0, y: o ? c : 0 });
      for (var f = 0; f < E[0] - 1; f++) {
        C.push({ x: a * Math.random(), y: o ? c : 0 });
      }
      C.push({ x: a, y: o ? c : 0 });
    } else {
      C.push({ x: 0, y: ((o + Math.random()) * c) / E[1] });
      C.push({ x: a, y: ((o + Math.random()) * c) / E[1] });
    }
  }
  var u = C.length;
  var v = [];
  var I, H, x, w, z, y;
  for (var D = 0; D < E[1]; D++) {
    for (var G = 0; G < E[0]; G++) {
      if (D == 0) {
        I = C[G].x;
        H = C[G].y;
        z = C[G + 1].x;
        y = C[G + 1].y;
      } else {
        if (D == E[1] - 1) {
          I = C[u - E[0] - 1 + G].x;
          H = C[u - E[0] - 1 + G].y;
          z = C[u - E[0] + G].x;
          y = C[u - E[0] + G].y;
        } else {
          I = C[E[0] + 1 + 2 * (D - 1) + G].x;
          H = C[E[0] + 1 + 2 * (D - 1) + G].y;
          z = C[E[0] + 3 + 2 * (D - 1) + G].x;
          y = C[E[0] + 3 + 2 * (D - 1) + G].y;
        }
      }
      if (H == 0 && y == 0) {
        x = a * Math.random();
        w = c * (0.5 + Math.random());
      } else {
        if (H == c && y == c) {
          x = a * Math.random();
          w = c * (Math.random() - 1);
        } else {
          if (I == 0 && z == 0) {
            x = a * (0.5 + Math.random());
            w = c * Math.random();
          } else {
            if (I == a && z == a) {
              x = a * (Math.random() - 1);
              w = c * Math.random();
            } else {
              x = a * Math.random();
              w = c * Math.random();
            }
          }
        }
      }
      v.push({ M: [I, H], Q: [x, w], T: [z, y] });
    }
  }
  var F = [];
  var s = b.colors.length;
  for (var m = 0; m < v.length; m++) {
    F.push(b.colors[m % s]);
  }
  var e = typeof J.filter != 'undefined';
  v.forEach(function (L, K) {
    J.beginPath();
    J.moveTo(L.M[0], L.M[1]);
    J.quadraticCurveTo(L.Q[0], L.Q[1], L.T[0], L.T[1]);
    J.closePath();
    J.filter = 'blur(65px)';
    J.fillStyle = F[K];
    J.fill();
  });
  if (b.animation == false) {
    b.container.appendChild(g);
    if (e == false) {
      g.style.webkitFilter = 'blur(65px)';
      g.style.filter = 'blur(65px)';
    }
    return;
  }
  var h = g.toDataURL();
  var B = new PIXI.autoDetectRenderer(a, c, { transparent: true });
  var j = new PIXI.Container();
  a = c = 2048;
  g.width = a;
  g.height = c;
  J.clearRect(0, 0, a, c);
  J.fillStyle = b.backgroundColor;
  J.fillRect(0, 0, a, c);
  [
    'M125-51c0,0-72.5,150-75,287.5C48.679,309.16,57.5,534-75,684s60,397.5,135,520 s278.607,207.718,382.5,150c112.5-62.5,92.5-550,0-652.5c-90.134-99.879-30-377.5-35-650S125-51,125-51z',
    'M505,151.5C485,219,434.653,481.325,575,489c320,17.5,240,202.5,492.5,180 c171.692-15.299,375-263.115,547.5-257.808S1842.5,199,1715,144s-550,65-627.5,70S844.586-1.317,687.5,36.5 C552.5,69,505,151.5,505,151.5z',
    'M1950,32.132C1910,141.5,2037.5,271.5,1875,479s-405,220-230,415 s402.5,555,635,182.5s-12.5-517.5-42.5-840s-104-450-189.5-365S1950,32.132,1950,32.132z',
    'M633.349,917.451c80,180,106.651,214.049,104.151,299.049 c-3.682,125.171,55.31,232.39,210,242.5c76.5,5,125,132.5,207.5-37.5c99.853-205.757-50-400,0-480S850,630.081,722.5,714.541 S633.349,917.451,633.349,917.451z',
    'M-347.5,1889.395c117.5-112.5,262.5-220,472.5-297.5s585,72.5,742.5,32.5 s357.5-305,442.5-200s120.295,325-174.853,437.5s-360.147-47.5-602.647,110s-435,330-642.5,197.5S-347.5,1889.395-347.5,1889.395z',
    'M1287.5,1102.931c-11.508,177.546,125,58.569,152.5,283.569s-97.5,360,65,455 s315,407.5,540,332.5s335-12.5,275-320s-287.5-312.5-460-507.5S1545,684,1430,864S1290,1064.361,1287.5,1102.931z'
  ].forEach(function (L) {
    var K = new Path2D(L);
    J.fillStyle = 'rgba(0,0,0,' + (0.2 + 0.8 * Math.random()) + ')';
    J.filter = 'blur(30px)';
    J.fill(K);
  });
  var l = new PIXI.Sprite.fromImage(g.toDataURL());
  var r = new PIXI.filters.DisplacementFilter(l);
  b.container.appendChild(B.view);
  if (e == false) {
    B.view.style.webkitFilter = 'blur(65px)';
    B.view.style.filter = 'blur(65px)';
  }
  j.filters = [r];
  r.autoFit = false;
  j.addChild(l);
  var i = new PIXI.ticker.Ticker();
  i.autoStart = true;
  i.add(function () {
    B.render(j);
  });
  var p = new PIXI.Texture.fromImage(h);
  var d = new PIXI.Sprite(p);
  d.anchor.set(0.5);
  d.x = B.width / 2;
  d.y = B.height / 2;
  j.addChild(d);
  var k;
  var q = function () {
    l.rotation += 0.001;
    k = requestAnimationFrame(q);
  };
  q();
  l.anchor.set(0.5);
  l.x = B.view.width / 2;
  l.y = B.view.height / 2;
  r.scale.x = 80;
  r.scale.y = 120;
};
