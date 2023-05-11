// 懒加载主函数
const lazyload = function (lazyImages) {
  let active = false;
  if (active === false) {
    active = true;
    setTimeout(() => {

      lazyImages.forEach(lazyImage => {
        if (
          (
            lazyImage.getBoundingClientRect().top <= window.innerHeight &&
            lazyImage.getBoundingClientRect().bottom >= 0
          ) &&
          getComputedStyle(lazyImage).display !== 'none'

        ) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImages = lazyImages.filter(image => {
            return image !== lazyImage;
          })
        }
      })
    }, 800);
  }
}

export default lazyload;