let form = document.getElementById("taskForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let data = {

        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value

    };

    fetch("http://127.0.0.1:8000/tasks/add/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    .then(response => response.json())

    .then(result => {

        console.log(result);

        alert("Task Added Successfully");

        form.reset();

        getTasks();

    });

});

function getTasks() {

    fetch("http://127.0.0.1:8000/tasks/")

    .then(response => response.json())

    .then(result => {

        console.log(result);

        let output = "";

        result.forEach(task => {

            output += `
            <div class="card">

                <h3>${task.title}</h3>

                <p><b>Description:</b> ${task.description}</p>

                <p><b>Priority:</b> ${task.priority}</p>

                <p><b>Status:</b> ${task.status}</p>

                <button onclick="updateTask('${task._id}')">Update</button>

                <button onclick="deleteTask('${task._id}')">Delete</button>

            </div>
            `;

        });

        document.getElementById("taskList").innerHTML = output;

    });

}

function updateTask(id) {

    let title = prompt("Enter Task Title");
    let description = prompt("Enter Description");
    let priority = prompt("Enter Priority (High/Medium/Low)");
    let status = prompt("Enter Status (Pending/Completed)");

    let data = {

        title: title,
        description: description,
        priority: priority,
        status: status

    };

    fetch(`http://127.0.0.1:8000/tasks/update/${id}/`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

    .then(response => response.json())

    .then(result => {

        console.log(result);

        alert("Task Updated Successfully");

        getTasks();

    });

}

function deleteTask(id) {

    fetch(`http://127.0.0.1:8000/tasks/delete/${id}/`, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(result => {

        console.log(result);

        alert("Task Deleted Successfully");

        getTasks();

    });

}

getTasks();