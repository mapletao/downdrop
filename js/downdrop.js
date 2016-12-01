;(function(wic){
	var Downdrop=function(opt){
		if(!(this instanceof Downdrop)){
			alert(2)
			return new Downdrop(opt);	
		}
		alert(1)
		this.init(opt);
	};
	var mapletao={
		eventUtil:{
			//处理iethis指向问题
			bindfn:function(fn,ele){
				return  function(){
					return fn.call(ele);
				}
			},
			//绑定事件
			bindEvent:(function(dom,type,fn){
				if(window.addEventListener){
					return function(dom,type,fn){
						dom.addEventListener(type,fn,false)
					};
				}else if(window.attachEvent){
					var self=this;
					return function(dom,type,fn){
						fn=self.bindfn(fn,ele);
						dom.attachEvent('on'+type,fn);
					};
				}else{
					return function(dom,type,fn){
						dom["on"+type]=fn;
					};
				}
			})(),
			// 阻止冒泡
			stopPropagation:function(e){
				var self=this;
				if(window.event){
					self.stopPropagation=function(e){
						window.event.cancelBubble = true;
					}
				}else{
					self.stopPropagation=function(e){
						e.stopPropagation();
					}
				}
				self.stopPropagation();
			},
			//阻止默认行为
			preventDefault:function(){
				var self=this;
				if(window.event){
					self.preventDefault=function(e){
						window.event.returnValue = false
					}
				}else{
					self.preventDefault=function(e){
						e.preventDefault();
					}
				}
				self.preventDefault();
			},
			//解除事件
			removeBind:(function(ele, type, fn) {
				if (window.removeEventListerner) { // 标准浏览器
					return function(dom,type,fn){
						ele.removeEventListerner(type, fn, false);
					};
				} else if (window.detachEvent) { // IE浏览器
					return function(dom,type,fn){
						ele.detachEvent("on" + type, fn);
					};
				} else{
					return function(dom,type,fn){
						ele["on"+type]=null;
					};
				}
			})()
		}
	}
	Downdrop.prototype={
		init:function(opt){}
	};
	window.Downdrop=Downdrop;
})(window)