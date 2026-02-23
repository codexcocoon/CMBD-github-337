const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const showTask = document.querySelector("#showTask");
const errMsg = document.querySelector("#err");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const task = formData.get("task");
  if (!task) {
    errMsg.textContent = "Please provide your name";
  } else {
    // local storage set item
    if (localStorage.getItem("todo")) {
      const preData = localStorage.getItem("todo");
      const arr = JSON.parse(preData);
      const newTask = {
        task: task,
        isComplete: false,
      };
      arr.push(newTask);
      localStorage.setItem("todo", JSON.stringify(arr));
    } else {
      const newTask = [
        {
          task: task,
          isComplete: false,
        },
      ];
      localStorage.setItem("todo", JSON.stringify(newTask));
    }
    addTask(task);
    taskForm.reset();
  }
});
const addTask = (task, isComplete = false) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = task;
  p.classList.add("font-normal");
  const div = document.createElement("div");
  isDisabled = isComplete ? "disabled" : "";
  isComplete ? p.classList.add("line-through", "text-gray-500") : "";
  div.innerHTML = `
            <button onClick="this.setAttribute('disabled', true);
            this.parentElement.previousElementSibling.classList.add('line-through');
            this.parentElement.previousElementSibling.classList.add('text-gray-500');
            completed(this)" ${isDisabled}
                class="border aspect-square rounded cursor-pointer bg-green-600 hover:bg-green-400 text-white px-1 font-light disabled:bg-gray-500"><i
                    class="fa-solid fa-check"></i></button>
            <button onClick="deleteTask(this);this.parentElement.parentElement.remove();"
                class="border aspect-square rounded cursor-pointer bg-red-800 hover:bg-red-600 text-white px-1 font-light"><i
                    class="fa-solid fa-trash"></i></button>
    `;
  li.appendChild(p);
  li.appendChild(div);
  showTask.appendChild(li);
};

const completed = (e) => {
  const selectedTask = Array.from(
    e.parentElement.parentElement.parentElement.children,
  ).indexOf(e.parentElement.parentElement);
  //   console.log(selectedTask);
  const preData = localStorage.getItem("todo");
  const arr = JSON.parse(preData);
  arr[selectedTask].isComplete = true;
  localStorage.setItem("todo", JSON.stringify(arr));
};
const deleteTask = (e) => {
  const selectedTask = Array.from(
    e.parentElement.parentElement.parentElement.children,
  ).indexOf(e.parentElement.parentElement);
  //   console.log(selectedTask);
  const preData = localStorage.getItem("todo");
  const arr = JSON.parse(preData);
  arr.splice(selectedTask, 1);
  localStorage.setItem("todo", JSON.stringify(arr));
};

const showTaskFromJSON = () => {
  const preData = localStorage.getItem("todo");
  const arr = JSON.parse(preData);
  arr.forEach((tasks) => {
    addTask(tasks.task, tasks.isComplete);
  });
};
showTaskFromJSON();
