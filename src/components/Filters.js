import React from 'react';

function Filters(props) {
    return (
        <div>


            <input id="completed" type="checkbox" onChange={props.filterHandler} />
            <lable htmlFor="completed">Completed (If Checked, Only shows Completed tasks.)</lable>

            <hr />

        </div>
    );
}

export default Filters;