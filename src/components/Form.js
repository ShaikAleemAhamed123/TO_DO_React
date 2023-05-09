import React from 'react';

function Form(props) {
    function handleSubmit(e) {
        e.preventDefault();
        const entered_value = e.target.taskName.value;
        if (entered_value === "") return alert("Please enter a task");
        props.onAddTask(entered_value);
        e.target.taskName.value = "";
    }
    return (
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-auto">
                <input type="text" name="taskName" className="form-control" placeholder="Enter Task" />
            </div>

            <div className="col-auto">
                <button type="submit" value="Submit" className="btn btn-primary mb-3">Add Task</button>
            </div>
        </form>

    );
}

export default Form;