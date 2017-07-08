//设置当前屏参与动画的元素class
var screenAnimateElements = {
	'.screen-1' : [
		'.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow'
	],
	'.screen-2' : [
		'.screen-2__heading',
		'.screen-2__subheading',
		'.screen-2__phone',
		'.screen-2__point_i_1',
		'.screen-2__point_i_2',
		'.screen-2__point_i_3'
	],
	'.screen-3' : [
		'.screen-3__heading',
		'.screen-3__subheading',
		'.screen-3__phone',
		'.screen-3__features'
	],
	'.screen-4' : [
		'.screen-4__heading',
		'.screen-4__subheading',
		'.screen-4__type__item__i__1',
		'.screen-4__type__item__i__2',
		'.screen-4__type__item__i__3',
		'.screen-4__type__item__i__4'
	],
	'.screen-5' : [
		'.screen-5__heading',
		'.screen-5__subheading',
		'.screen-5__bg'
	]
}

//封装设置当前屏动画的函数
function setScreenAnimate(screenCls){//screenCls 接收当前屏class
	var screen = document.querySelector(screenCls);//获取当前屏的元素
	var animateElements = screenAnimateElements[screenCls];//获取当前屏下需要参与动画的子元素的class
	var isSetAnimateClass = false;//判断是否初始化子元素动画样式
	var isAnimateClassDone = false;//判断子元素动画是否已完成
	var element;
	screen.onclick=function(){
		//初始化样式
		if ( !isSetAnimateClass ) {//判断是否初始化样式
			for (var i = 0; i < animateElements.length; i++) {
				element = document.querySelector(animateElements[i]);
				element.className += ' ' + animateElements[i].substr(1) + '_animate_init';
			}
			isSetAnimateClass = true;
			return;
		}
		//切换所有animateElements的init --> done
		if ( !isAnimateClassDone ) {
			for (var i = 0; i < animateElements.length; i++) {
				element = document.querySelector(animateElements[i]);
				element.setAttribute('class',element.getAttribute('class').replace('_animate_init','_animate_done'));
			}
			isAnimateClassDone = true;
			return;
		}
		//切换所有animateElements的done --> init
		if ( isAnimateClassDone ) {
			for (var i = 0; i < animateElements.length; i++) {
				element = document.querySelector(animateElements[i]);
				element.setAttribute('class',element.getAttribute('class').replace('_animate_done','_animate_init'));
			}
			isAnimateClassDone = false;
			return;
		}
	}

};

for( var k in screenAnimateElements ){
	setScreenAnimate(k);
}