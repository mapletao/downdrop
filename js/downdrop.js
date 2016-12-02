;(function(wic){
	var Downdrop=function(opt){
		if(!(this instanceof Downdrop)){
			return new Downdrop(opt);	
		}
		this.init(opt);
	};
	var eventUtil=mapletao.eventUtil;
	Downdrop.prototype={
		init:function(opt){
			this.setOpt(opt);
			this.dealOpt();
			this.setHtml();
			this.setFun();
			this.removeOpt();
		},
		setOpt:function(opt){
			this.ulTemp=['<div class="downdrop">',
											'<div class="downdrop-header">请选择</div>',
											'<i class="angle"></i>',
											'<ul class="downdrop-con">',
											'</ul>',
										'</div>'].join('');
			this.setting = {
				liTemp:'<li data-val="{{val}}">{{text}}</li>',
				text:true,
				isHide:true,
			};
			mapletao.extend(this.setting,opt);
		},
		dealOpt:function(){
			var self=this;
			self.dealLiFns=[];
			if(self.setting.text){
				self.dealLiFns.push(function(self){
					self.headerDom.innerHTML = this.innerHTML;
					self.headerDom.setAttribute("data-val",this.getAttribute("data-val"));
				});
			}
			if(self.setting.isHide){
				self.dealLiFns.push(function(self){
					self.conDom.style.display = "none";
				});
			}
			if(self.setting.cb){
				self.dealLiFns.push(cb);
			}
		},
		setHtml:function(){
			var self = this;
			self.setting.ele.innerHTML=self.ulTemp;
			self.setEle();
			self.setList(self.setting.data);
		},
		setList:function(data){
			var self=this;
			self.lis='';
			data.forEach(function(obj){
				self.lis += self.formateString(self.setting.liTemp,obj);
			});
			self.conDom.innerHTML = self.lis;
			this.headerDom.innerHTML = "请选择";
		},
		formateString:function(str,data){
			return str.replace(/\{\{(\w+)\}\}/g,function(match,key){
				return typeof data[key] === undefined? '' : data[key];
			});
		},
		setEle:function(){
			var ele=this.setting.ele;
			this.headerDom=ele.getElementsByClassName("downdrop-header")[0];
			this.conDoms=document.getElementsByClassName("downdrop-con");
			this.conDom=ele.getElementsByClassName("downdrop-con")[0];
		},
		setFun:function(){
			this.setEleClick();
			this.setHeaderClick();
			this.setConClick();
			this.setDocClick();
		},
		setEleClick:function(){
			var self=this;
			eventUtil.bindEvent(this.setting.ele,"click",self.setDomBubble);
		},
		setDomBubble:function(e){
			eventUtil.stopPropagation(e);
		},
		setHeaderClick:function(){
			var self=this;
			self.dealHeaderFn=self.bindFn(self.dealHeaderFn,self);
			eventUtil.bindEvent(this.headerDom,"click",self.dealHeaderFn);
		},
		dealHeaderFn:function(e,self){
			self.hideDom(e,self);
			self.conDom.style.display = "block";
		},
		setConClick:function(){
			var self=this;
			self.dealLiFn=self.bindFn(self.dealLiFn,self);
			eventUtil.bindEvent(this.conDom,"click",self.dealLiFn);
		},
		dealLiFn:function(e,self){
			e = eventUtil.getEvent(e);
			var target = eventUtil.getEventSrc(e);
			if(target.tagName.toLowerCase() === "li"){
				self.dealLiFns.forEach(function(obj){
					obj.call(target,self);
				});
				target=null;
			}
		},
		bindFn:function(fn,args){
			return function(e){
				fn.call(this,e,args);
			};
		},
		hideDom:function(e,self){
			for(var i=0;i<self.conDoms.length;i++){
				self.conDoms[i].style.display = "none";
			}
		},
		setDocClick:function(){
			var self = this;
			Downdrop.prototype.hideDom=self.bindFn(self.hideDom,self);
			eventUtil.bindEvent(document,"click",self.hideDom);
		},
		removeOpt:function(){
			delete this.setting;
			delete this.lis;
			delete this.ulTemp;
		}
	};
	window.Downdrop=Downdrop;
})(window);