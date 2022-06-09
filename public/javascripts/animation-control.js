(function () {
  window.addEventListener('load', event => {
    // Add animation to todoLisst
    const todoList = document.querySelectorAll('.todo-list .animated')
    todoList.forEach(todo => {
      // remove animation tags when animation ends
      todo.addEventListener('animationend', event => {
        todo.classList.remove('animated', 'bounceInUp')
      })
    })
  })
})()