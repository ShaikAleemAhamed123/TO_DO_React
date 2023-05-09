import React from 'react';

function Filters(props) {
    return (
        <div>


            <input id="completed" type="checkbox" onChange={props.filterHandler} />
            <lable htmlFor="completed">Completed (If Checked Only shows Completed Items)</lable>

            <hr />

        </div>
    );
}

export default Filters;