//获取元素
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
	var baseCls = getCls( element );
	if ( baseCls.indexOf(cls) === -1 ) {
		setCls( element, baseCls + ' ' + cls);
	}
}

//删除样式
var delCls = function( element,cls ){

}

/*var str = 'abcdefghijklmnop';
console.log(str.split('cd').join(' '));*/