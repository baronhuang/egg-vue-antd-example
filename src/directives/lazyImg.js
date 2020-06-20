/**
 * Created on 2019/2/27 0027
 * @author: ben0721@yeah.net
 * @desc: 一个图片懒加载的directive的简单示例
 */
function success (el, path) {
  el.classList.remove('lazy-load-error');
  el.classList.remove('lazy-load-progress');
  el.classList.add('lazy-load-success');
  el.src = path;
}

function loading (el) {
  el.classList.remove('lazy-load-error');
  el.classList.remove('lazy-load-success');
  el.classList.add('lazy-load-progress');
}

function failure (el) {
  el.classList.remove('lazy-load-success');
  el.classList.remove('lazy-load-progress');
  el.classList.add('lazy-load-error');
}

// 加载图片
function loadImage (path, success, failure) {
  const img = new Image();
  img.addEventListener('load', success, { capture: false, passive: true });
  img.addEventListener('error', failure, { capture: false, passive: true });
  img.src = path;
}

// 返回一个可执行的方法
export default (Vue) => {
  require('@/assets/style/lazy.scss');
  Vue.directive('lazy-img', (el, binding, vnode) => {
    const path = binding.value;
    loading(el);
    loadImage(
      path,
      () => success(el, path),
      () => failure(el)
    );
  });
};
