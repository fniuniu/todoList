
console.log('start');



var textInput = document.querySelector('#main-text-input')
var addButton = document.querySelector('#main-button-add')
var todoCell = document.querySelector('.todo-cell')
//大坑 后添加啊的元素在这里提取没用，要在用到的函数里声明
//var canEdit = document.querySelector('.canEdit')


//添加事件
var addPlan = function() {
	addButton.addEventListener('click', function(){
		var value = textInput.value
		var t = tem(value)
		todoCell.insertAdjacentHTML('afterBegin', t)
	})

}
// 增加的html
var tem = function(value) {
	var d = new Date()
	var date = (d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日')
	t = `
		<div class='todo-cell'>
			<time>${date}</time>
			<p class="canEdit">${value}</p>
			<button class='todo-done'>完成</button>
			<button class='todo-delete'>删除</button>
			<button class="todo-edit">编辑</button>
		</div>
		`

	return t
}


//可编辑
var bindEdit = function() {
	todoCell.addEventListener('click', function(event) {
		var self = event.target
		console.log('self', self);
		if(self.classList.contains('todo-edit')) {
			var canEdit = document.querySelector('.canEdit')
			//console.log('canEdit', canEdit)
			canEdit.setAttribute('contenteditable', 'true')
			//失焦后不可编辑
			canEdit.onblur = function() {
				console.log('失焦');
				canEdit.setAttribute('contenteditable', 'false')
			}
		}
	})
}


//添加删除
var bindDone = function() {
	todoCell.addEventListener('click', function(event) {
		var target = event.target
		var todoDiv = target.parentElement
		if(target.classList.contains('todo-done')) {
			toggle(todoDiv, 'done')
		}else if(target.classList.contains('todo-delete')){
			todoDiv.remove()
		}
	})
}


var toggle = function(element, className) {
	if(element.classList.contains(className)) {
		element.classList.remove(className)
	}else {
		element.classList.add(className)
	}
}

var _main = function() {
	addPlan()
	bindEdit()
	bindDone()
}

_main()
