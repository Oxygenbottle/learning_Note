console.log('123')

// 1-> 2-> 3-> 4
//       prev     head      next      head.next  
//循环1   null     1          2        prev-null;
//循环2   head-1   next-2     3         1
//       
//   prev  1 -> 2
//   prev  2 -> 3
//   prev  3 -> 4
//   prev  4 -> 5
//   prev  5 -> null
//   ——————————————————————
//     prev = null;
//     next = 2 
//     1 -> null;
//     prev = 1 -> null;
//     cur = 2;
//     cycle one over;
//   ——————————————————————
//     next = 3;
//     2.next = 1 -> null;
//     prev = 2 -> 1 -> null;
//     cur = 3;

// 反转链表示例
function reverseList(head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}