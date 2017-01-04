
console.log('start');


var container = document.querySelector('#all-container')
var textInput = document.querySelector('#main-text-input')
var addButton = document.querySelector('#main-button-add')
var todoCells = document.querySelector('.todo-cells')
//大坑 后添加啊的元素在这里提取没用，要在用到的函数里声明
//var canEdit = document.querySelector('.canEdit')




var todoList = []
//添加事件
var addPlan = function() {
	addButton.addEventListener('click', function(){
		var task = textInput.value
		var todo = {
			task: task,
			time: currentTime()
		}
		todoList.push(todo)
		saveTodo()
		insertTodo(todo)
	})
}
//插入html
var insertTodo = function(todo) {
	var t = tem(todo)
	todoCells.insertAdjacentHTML('beforeEnd', t)
}

//时间
var currentTime = function() {
	var d = new Date()
	var time = (d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日')
	return time
}

// 增加的html
var tem = function(todo) {
	t = `
		<div class='todo-cell'>
			<div id='time'>${todo.time}</div>
			<p class="canEdit">${todo.task}</p>
			<button class='todo-done'>完成</button>
			<button class='todo-delete'>删除</button>
			<button class='todo-edit'>编辑</button>
		</div>
		`
	return t
}


//可编辑
var bindEdit = function() {

	todoCells.addEventListener('click', function(event) {
		var self = event.target
		var todoDiv = self.parentNode
		//console.log('self', self)
		//console.log('todoDiv', todoDiv)
		if(self.classList.contains('todo-edit')) {
			var canEdit = todoDiv.children[1]
			//console.log('canEdit', canEdit)
			canEdit.setAttribute('contenteditable', 'true')
			canEdit.focus()
			//失焦后不可编辑,保存 todo
			canEdit.onblur = function() {
				//console.log('失焦');
				canEdit.setAttribute('contenteditable', 'false')
			}
		}
	})
}


//完成与删除
var bindDone = function() {

	todoCells.addEventListener('click', function(event) {
		var target = event.target
		var todoDiv = target.parentElement
		console.log('target', target);
		console.log('todoDiv', todoDiv);
		if(target.classList.contains('todo-done')) {
			toggle(todoDiv, 'done')
		}else if(target.classList.contains('todo-delete')){
			//将元素从todoList移除
			var index = indexOfElement(todoDiv)
			todoList.splice(index, 1)
			console.log('index', index);
			//删除
			todoDiv.remove()
			saveTodo()
		}
	})
}
//返回target的父元素在其父元素的下标
var indexOfElement = function(element) {
	var parent = element.parentElement
	//console.log('parent',parent.children[1]);

	var len = parent.children.length
	//console.log('len',len);
	for(var i = 0; i < len; i++) {
		var e = parent.children[i]
		if(e === element) {
			return i
		}
	}
}

var toggle = function(element, className) {
	if(element.classList.contains(className)) {
		element.classList.remove(className)
	}else {
		element.classList.add(className)
	}
}


//存储todoList
var saveTodo = function() {
	var s = JSON.stringify(todoList)
	localStorage.todoList = s
}


//加载todoList
var loadTodo = function() {
	var s = localStorage.todoList
	return JSON.parse(s)
}
/*

todoList = loadTodo()
for (var i = 0; i < todoList.length; i++) {
	var todo = todoList[i]
}
insertTodo(todo)
*/
var _main = function() {
	addPlan()
	bindEdit()
	bindDone()

}
_main()
