import {
  getMin
} from "../utils";
// import {
//   mount
// } from 'vue'
class WaterFall {
  constructor() {
    const abox = document.querySelectorAll('.box');
    const cont = document.querySelector('.cont');
    const clientW = document.documentElement.clientWidth;

    this.clientW = clientW;
    this.abox = abox;
    this.cont = cont;
  }
  init() {
    // console.log('初始化waterFall')
    this.maxNum = parseInt(
      this.clientW / this.abox[0].offsetWidth,
      10
    )
    // console.log('一行可以显示几个', this.maxNum)
    this.cont.style.width = this.maxNum * this.abox[0].offsetWidth + 'px';

    this.processFirstLine();
    this.processOtherLine();
  }
  processFirstLine() {
    // 布局第一行
    this.heightArr = [];
    for (let i = 0; i < this.maxNum; i++) {
      this.heightArr.push(
        this.abox[i].offsetHeight
      )
      // 虚拟DOM的优化
      // this.heightArr.push({
      //   height: this.abox[i].offsetHeight,
      //   index: index,
      // })
    }
    // console.log(this.heightArr, 'heightArr')
  }
  processOtherLine() {
    for (let i = this.maxNum; i < this.abox.length; i++) {
      let min = getMin(this.heightArr);
      let minIndex = this.heightArr.indexOf(min);

      this.abox[i].style.position = 'absolute';
      this.abox[i].style.top = min + 'px';
      this.abox[i].style.left = minIndex * this.abox[0].offsetWidth + 'px';
      this.heightArr[minIndex] = this.heightArr[minIndex] + this.abox[i].offsetHeight;
    }
  }

  static getInstance(args) {
    if (WaterFall._instance) {
      WaterFall._instance = new WaterFall();
    }
    // else {
    //   WaterFall.update(args);
    // }
    return WaterFall._instance;
  }

  // 单实例复用，数据更新
  // static update(args) {
  //   mount(args);
  // }
}

export default WaterFall;