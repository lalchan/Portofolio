import React, { FC } from 'react';
import style from './main.module.css';
import {SnakeCellColors as CellColors} from '../../../../../../global/dataTypes/enums'

interface myProps {
	color: CellColors
}

const  Cell: FC<myProps> = ({color}: myProps)  => {
	return (
		<div className={style[color]}>
		</div>

	);
}

export default Cell;
