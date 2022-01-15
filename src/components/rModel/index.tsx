import React, { useState } from 'react';
import style from './main.module.css';
import Selector from './selector';
import Content from './content';
import { gameTypes } from '../../global/dataTypes/enums';
function RModel() {
	const [game, setGame] = useState(gameTypes.NONE)
	return (
		<div className={style.main}>
			<div className={style.selector}>
				<Selector setGame={setGame}/>
			</div>
			<div className={style.content}>
				<Content game = {game}/>
			</div>
		</div>

	);
}

export default RModel;
