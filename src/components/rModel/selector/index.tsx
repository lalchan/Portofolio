
import { FC } from 'react';
import style from './main.module.css';
import { gameTypes } from '../.../../../../global/dataTypes/enums'
interface myProps{
	setGame: Function
}
interface Selector {
	label: string,
	game: gameTypes
}
const selectors: Selector[]=[
	{
		label: "Snake",
		game: gameTypes.SNAKE
	}
]
const Selector:FC<myProps> =({setGame}: myProps) =>{
	return (
		<div className={style.main}>
			<div className={style.heading}>
				<h2 onClick={() => setGame(gameTypes.NONE)}>
					Select One
				</h2>
				{selectors.map((selector, index) =>
					<div key={index} onClick={() => setGame(selector.game)}>
						{selector.label}
					</div>
				)}
			</div>
			
		</div>

	);
}

export default Selector;
