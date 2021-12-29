Promise
==========================
首先理解函数的作用，讲需要执行的耗时逻辑或者请求进行一个异步回调，避免JS中单线程阻塞。
然后剖析promise函数
>  1、他是拥有一种初态，两种终态，状态不可逆且不可修改的。
  初态 - 默认：   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   'pending';
  终态 - 决定/完成： 'fulfilled';
  终态 - 拒绝/失败： 'rejected';
