## 下拉框需求分析

- 点击显示下拉框出现该下拉框内容列表，并隐藏其他所有下拉框列表
- 点击下拉框列表项
  - 隐藏下拉框列表，并将内容复制到显示区域
  - 不隐藏列表，不赋值
  - 赋值但不隐藏下拉框列表
  - 有回调则调用回调
- 点击body区域隐藏下拉框列表
- 提供更换列表项内容方法
- 更换内容时下拉框仍然可用

## 后续需求待开发...

## html结构模板
- html css 实现静态布局
	- 默认高度30
	- 内容绝对定位
	- 用div画右侧三角
	- 内容设置最大高度，超出的出现滚动条
	- 鼠标滑过反馈
	- 有边框

## js实现动态效果及优化
- 监听绑定事件及优化处理
	- 兼容浏览器
	- 使用惰性模式
	- 获取数据源
	- 阻止冒泡
	- 阻止默认行为

- 构造器函数Downdrop 参数opt
	- 安全性检测
	- 调用初始化init方法
	- 原型模式
	- 提供入口 
	
- 参数opt
	- ele 容器对象 必须
	- data 数据 必须
	- liTemp 列表模板 默认"<li data-val="{{val}}">{{text}}</li>"
	- text  是否赋值 默认true
	- isHide 点击是否隐藏 默认true
	- cb   点击列表项的回调 可选

- init 方法
	- 参数扩展 setOpt
	- dealOpt 处理参数
	- setHtml 解析数据，并将数据添加进列表内容中
	- 事件设置 setFun
	- removeOpt 解除配置信息

- setOpt 方法
	- 扩展默认配置
	- extend 浅赋值

- dealOpt 方法
	- 处理列表项的点击触发事件
	- 将触发的事件放入数组中
	- 处理的参数
	  - text 是否赋值
	  - inHide 是够隐藏
	  - cb 是否有回调 

- setHtml 方法
	- 解析数据，并将数据添加进列表内容中
	- 调用setEle函数，设置需要操作的对象节点
	- setList函数 解析展示数据下拉列表项

- setList 方法
	- data 数据
	- formateString方法，模板处理，数据替换
	- 解析展示数据下拉列表项

- formateString 方法 
	- str:模板 
	- data:数据
	- 模板处理，数据替换

- setFun 事件设置方法
	- setEleClick 阻止冒泡
	- setHeaderClick 下拉框显示框点击事件
	- setConClick 列表项点击事件
	- setDocClick document点击事件

- setEleClick 阻止冒泡
	- 阻止下拉框里面的事件像外面传递

- bindFn 传递参数
	- 参与者模式传递当前下拉框实例

- setHeaderClick 下拉框显示框点击事件
	- 绑定事件
	- bindFn 方法 传递参数
	- dealHeaderFn 方法 处理点击事件

- dealHeaderFn 方法
	- 显示当前下拉列表 隐藏其它下拉列表

- setConClick 方法
	- 绑定当前下拉列表点击事件
	- dealLiFn 处理点击事件

- dealLiFn 方法
	- 处理下拉列表内容点击事件
	- 捕获事件源
	- 点击li，处理对应的事件

- hideDom
	- 隐藏下拉框列表

-setDocClick
	- 点击非下拉区域隐藏所有下拉列表

- removeOpt 
	- 解除配置信息