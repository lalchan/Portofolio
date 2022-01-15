import React, { FC, ReactNode } from 'react'
import style from './main.module.css';
import { gameTypes } from '../../../../global/dataTypes/enums'

import Snake from './snake'

interface myProps {
	game: gameTypes
}

const  Game: FC<myProps> = ({game}: myProps)=> {
	const renderGame = (game: gameTypes):ReactNode =>{
		switch (game) {
			case gameTypes.SNAKE:
				return <Snake/>
			default:
				return<></>
		}
	}
	return (
		<div className={style.main}>
			<div className={style.game}>
				{renderGame(game)}
			</div>
		</div>

	);
}

export default Game;
