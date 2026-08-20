function addTask(){
    let task = document.getElementById("taskInput").value;
    if(task.trim() === ""){
        alert("Please enter a task!");
        return;
    }
    let li = document.createElement("li");
    li.innerText = task;
    let deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete";
deleteBtn.onclick = function(event){
    event.stopPropagation();
    li.remove();
};
li.appendChild(deleteBtn);
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
     li.appendChild(editBtn);
    editBtn.onclick = function(event) {
    event.stopPropagation();
    let newTask = prompt("Edit task:", task);
    if (newTask !== null && newTask.trim() !== "") {
        li.firstChild.textContent = newTask;
        localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
    }
};
    li.onclick = function() {
    li.classList.toggle("completed");
        updateCompletedCount();
};
    document.getElementById("taskList").appendChild(li);
    updateTaskCount();
    localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
    document.getElementById("taskInput").value = "";
}
window.onload = function() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        document.getElementById("taskList").innerHTML = savedTasks;
        let tasks = document.querySelectorAll("#taskList li");
        tasks.forEach(function(li) {
            li.onclick = function() {
                li.classList.toggle("completed");
                updateCompletedCount();
                localStorage.setItem(
                    "tasks",
                    document.getElementById("taskList").innerHTML
                );
            };
            let deleteBtn = li.querySelector("button");
            deleteBtn.onclick = function(event) {
                event.stopPropagation();
                li.remove();
                updateTaskCount();
                localStorage.setItem(
                    "tasks",
                    document.getElementById("taskList").innerHTML
                );
            };
        });
    }
    updateTaskCount();
updateCompletedCount();
};
updateTaskCount();
document.getElementById("taskInput").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addTask();
    }
});
function clearTasks(){
    let confirmClear = confirm("Are you sure you want to clear all tasks?");
    if(!confirmClear){
    return;
}
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
    updateTaskCount();
    updateCompletedCount();
}
function updateTaskCount(){
    let count = document.getElementById("taskList").children.length;
    document.getElementById("taskCount").innerText = "Tasks: " + count;
}
function updateCompletedCount(){
    let completed = document.querySelectorAll("#taskList li.completed").length;
    document.getElementById("completedCount").innerText = "Completed: " + completed;
}
updateCompletedCount();
document.getElementById("searchInput").addEventListener("input", function() {
    let searchText = this.value.toLowerCase();
    let tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(function(task) {
        let taskText = task.firstChild.textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
});
function toggleDarkMode(){
    document.body.classList.toggle("dark");
    let darkModeBtn = document.getElementById("darkModeBtn");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("darkMode", "on");
        darkModeBtn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("darkMode", "off");
        darkModeBtn.innerText = "🌙 Dark Mode";
    }
}
    let savedDarkMode = localStorage.getItem("darkMode");
if(savedDarkMode === "on"){
    document.body.classList.add("dark");
}
function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(function(task) {
        let isCompleted = task.classList.contains("completed");

        if (type === "all") {
            task.style.display = "";
        } 
        else if (type === "pending") {
            task.style.display = isCompleted ? "none" : "";
        } 
        else if (type === "completed") {
            task.style.display = isCompleted ? "" : "none";
        }
    });
}

