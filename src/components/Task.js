import React from 'react';

function Task(props) {
    const { name, id, checked, onCheck } = props;

    const labelStyle = checked ? { textDecoration: 'line-through' } : {};

    return (
        <div>

            <input checked={checked} onChange={onCheck} type="checkbox" value="" />
            <label style={labelStyle} className="taskLabel" htmlFor={id} >{name}</label>



        </div>

    );
}

export default Task;
