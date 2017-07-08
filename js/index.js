//获取元素
var baseCls;
var screen;
var animateElements;
var getEle = function( selector ){
	return document.querySelector( selector );
}

var getAllEle = function( selector ){
	return document.querySelectorAll( selector );
}

//获取元素样式
var getCls = function( element ){
	return element.getAttribute( 'class' );
}

//设置元素样式
var setCls = function( element, cls){
	return element.setAttribute( 'class' , cls );
}

//添加样式
var addCls = function( element,cls ){
	baseCls = getCls( element );
	if ( baseCls.indexOf(cls) === -1 ) {
		setCls( element, baseCls + ' ' + cls);
	}
}

//删除样式
var delCls = function( element,cls ){
	baseCls = getCls( element );
	if ( baseCls.indexOf( cls ) !=-1 ) {
		setCls( element,baseCls.split( cls ).join(' ').replace(/\s+/g,' '));
	}
}

//一、动画样式初始化
var screenAnimateElements = {//获取所有参与动画的元素class
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
var ScreenAnimateInit = function( screenCls ){
	screen = document.querySelector(screenCls);
	animateElements = screenAnimateElements[screenCls];//获取当前屏下所有参与动画的元素class
	for (var i = 0; i < animateElements.length; i++) {
				element = document.querySelector(animateElements[i]);
				element.className += ' ' + animateElements[i].substr(1) + '_animate_init';
			}
}
var screenAnimateDone = function( screenCls ){
	for (var i = 0; i < animateElements.length; i++) {
			screen = document.querySelector(screenCls);
			animateElements = screenAnimateElements[screenCls];
			element = document.querySelector(animateElements[i]);
			element.setAttribute('class',element.getAttribute('class').replace('_animate_init','_animate_done'));
		}
}
window.onload=function(){
	for( var k in screenAnimateElements ){
		if ( k === '.screen-1' ) {
			continue;
		}
		ScreenAnimateInit(k);
	}
}

var navItems = getAllEle( '.header__nav-item' );
var outlineItems = getAllEle( '.outline_outline-item' );
var navTip = getEle( '.header_nav-tip' );
//导航条样式切换
var switchNavActive = function( idx ){
	for (var i = 0; i < navItems.length; i++) {
		delCls( navItems[ i ], 'header__nav-item_status_active' );
		addCls( navItems[ idx ], 'header__nav-item_status_active' );
		navSlide( i,navItems,idx)
	}
	for (var i = 0; i < outlineItems.length; i++) {
		delCls( outlineItems[ i ], 'outline_status_active' );
		addCls( outlineItems[ idx ], 'outline_status_active' );
	}
}

switchNavActive(0);
//滚动时，播放对应屏的子元素动画
window.onscroll=function(){
	var top = document.body.scrollTop;
	if ( top > 80 ) {
		addCls( getEle( '.header' ),'header_status_black' );
		addCls( getEle( '.outline' ),'outline_status_in' );
	}
	else {
		delCls( getEle( '.header' ),'header_status_black' );
		delCls( getEle( '.outline' ),'outline_status_in' );
		switchNavActive(0);
	}
	if ( top < 800) {
		screenAnimateDone( '.screen-1' );
	}
	if ( top > 800 -150 ) {
		screenAnimateDone( '.screen-2' );
		switchNavActive(1);
	}
	if ( top > 800 *2 -150 ) {
		screenAnimateDone( '.screen-3' );
		switchNavActive(2);
	}
	if ( top > 800 *3 -150 ) {
		screenAnimateDone( '.screen-4' );
		switchNavActive(3);
	}
	if ( top > 800 *4 -150 ) {
		screenAnimateDone( '.screen-5' );
		switchNavActive(4);
	}
	if ( top > 800 *4 + 500 ) {
		switchNavActive(5);
	}
}

//导航条与侧边大纲同步定位
var navJump = function( i ,item ){
	item.onclick = function(){
		document.body.scrollTop = i * 800;
	}	
}
for (var i = 0; i < navItems.length; i++) {
	navJump( i ,navItems[i] );
}
for (var i = 0; i < outlineItems.length; i++) {
	navJump( i ,outlineItems[i] )
}

//导航条滑动门样式特效

var _index;
function navSlide( idx,items ,index){
	if ( index ) {
		navTip.style.left = index * 70 + 'px';
	}else{
		navTip.style.left = 0 + 'px';
	}
	items[ idx ].onmouseover = function(){
		navTip.style.left = idx * 70 + 'px';
	}
	items[ idx ].onmouseout = function(){
		for (var i = 0; i < navItems.length; i++) {
			if( getCls( navItems[i] ).indexOf( 'header__nav-item_status_active' ) != -1 ){
				_index = i;
				break;
			}
		}
		navTip.style.left = _index * 70 + 'px';
	}
}
for (var i = 0; i < navItems.length; i++) {
	navSlide( i,navItems );
}

setTimeout(function(){
	screenAnimateDone('.screen-1');
},800)