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
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = task;
    p.classList.add("font-normal");
    const div = document.createElement("div");
    div.innerHTML = `
            <button onClick="this.setAttribute('disabled', true);
            this.parentElement.previousElementSibling.classList.add('line-through');
            this.parentElement.previousElementSibling.classList.add('text-gray-500');"
                class="border aspect-square rounded cursor-pointer bg-green-600 hover:bg-green-400 text-white px-1 font-light disabled:bg-gray-500"><i
                    class="fa-solid fa-check"></i></button>
            <button
                class="border aspect-square rounded cursor-pointer bg-red-400 hover:bg-red-600 text-white px-1 font-light"><i
                    class="fa-solid fa-x"></i></button>
            <button onClick="this.parentElement.parentElement.remove();"
                class="border aspect-square rounded cursor-pointer bg-red-800 hover:bg-red-600 text-white px-1 font-light"><i
                    class="fa-solid fa-trash"></i></button>
    `;
    li.appendChild(p);
    li.appendChild(div);
    showTask.appendChild(li);
  }
});
localStorage.setItem("tasks", '{"msg":"sir"}');