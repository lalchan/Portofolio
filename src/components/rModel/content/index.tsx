import React, { FC } from 'react'
import style from './main.module.css';
import { gameTypes } from '../../../global/dataTypes/enums'

import Game from './games'

interface myProps {
	game: gameTypes
}

const  Content: FC<myProps> = ({game}: myProps)=> {
	return (
		<div className={style.main}>
			<div className={style.heading}>
			<h3>{game===gameTypes.NONE?"Please Select a Game": game}</h3>
			</div>
			{
				game != gameTypes.NONE 
				&& <div className={style.mainContent}>
					<Game game={game}></Game>
				</div>
			}
			
				
		</div>

	);
}

export default Content;
