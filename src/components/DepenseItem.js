import React from "react";
import {TiDelete} from 'react-icons/ti';

function DepenseItem(props){

    return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			{props.name}
			<div>
            <span className='badge bg-primary'>${props.amount}</span>
				<TiDelete size='1.5em' />
			</div>
		</li>
	);
};
export default DepenseItem;