import React, { FC, useEffect, useState } from 'react'
import style from './main.module.css';
import {
	SnakeCellColors as CellColors,
	SnakeDirections as Direction,
	SnakeGameState as GameStates
} from '../../../../../global/dataTypes/enums'

import Cell from './microComponents/Cell';
import { time } from 'console';


interface Position {
	x: number, //x is row
	y: number //y is column
}
const row = 10;
const col = 10;

const Snake: FC = () => {
	const [gameState, setGameState] = useState<GameStates>(GameStates.INIT);
	const [gameTime, setGameTime] = useState<number>(0)
	const [grid, setGrid] = useState<CellColors[][]>()
	const [direction, setDirection] = useState<Direction>()
	const [lastDirection, setLastDirection] = useState<Direction>()
	const[timeOut, setTimeOut] = useState<NodeJS.Timer>();

	const [fruit, setFruit] = useState<Position>(
		{
			x: Math.floor(Math.random() * (row - 1)) + 1,
			y: Math.floor(Math.random() * col)
		}
	)

	const [snake, setSnake] = useState<Position[]>([
		{
			x: 0, y: 4
		}, {
			x: 0, y: 3
		}, {
			x: 0, y: 2
		}
	])
	const generateNewFruit = (snake: Position[]) => {
		const calcNewCordinates = (): Position => {
			let x = Math.floor(Math.random() * row);
			let y = Math.floor(Math.random() * col);
			return { x, y }
		}
		let position = calcNewCordinates()
		while (snake.some(cell => cell.x === position.x && cell.y === position.y)) {
			position = calcNewCordinates()
		}
		setFruit(position);
	}
	const updateGrid = () => {
		const tempGrid: CellColors[][] = []
		for (let rIndex = 0; rIndex < row; rIndex++) {
			tempGrid[rIndex] = [];
			for (let cIndex = 0; cIndex < col; cIndex++) {
				tempGrid[rIndex][cIndex] = CellColors.available;
				if (fruit.x === rIndex && fruit.y === cIndex) {
					tempGrid[rIndex][cIndex] = CellColors.fruit;
				}
			}
		}
		snake.forEach(snakeLink => {
			tempGrid[snakeLink.x][snakeLink.y] = CellColors.snake
		});
		setGrid(tempGrid)
	}
	const getNewState = () => {
		console.log(direction)
		if (!grid) {
			setGameState(GameStates.INIT)
			return;
		}
		const moveSnakeForward = () => {
			const oldSnakeHead = snake[0];
			const tempSnake = snake;
			let delta: number[];
			switch (direction) {
				case Direction.L:
					delta = [-1, 0]
					break;
				case Direction.U:
					delta = [0, 1]
					break;
				case Direction.R:
					delta = [1, 0]
					break;
				case Direction.D:
					delta = [0, -1]
					break;
				default:
					delta = [0, 0]
					break;
			}
			// check for delta change
			if ((delta[0] + delta[1]) === 0) {
				setGameState(GameStates.INIT)
				return;
			}
			//check for 180 turns
			if (oldSnakeHead.x + delta[0] === snake[1].x && oldSnakeHead.y + delta[1] === snake[1].y) {
				console.log("180");
				switch (direction) {
					case Direction.L:
						setDirection(Direction.R)
						break;
					case Direction.U:
						setDirection(Direction.D)
						break;
					case Direction.R:
						setDirection(Direction.L)
						break;
					case Direction.D:
						setDirection(Direction.U)
						break;
				}
				return
			}
			//check for death
			if (!grid[oldSnakeHead.x + delta[0]] || !grid[oldSnakeHead.x + delta[0]][oldSnakeHead.y + delta[1]] || grid[oldSnakeHead.x + delta[0]][oldSnakeHead.y + delta[1]] === CellColors.snake) {
				setGameState(GameStates.DEAD)
				return
			}
			const newSnakeHead: Position = {
				x: oldSnakeHead.x + delta[0],
				y: oldSnakeHead.y + delta[1]
			}
			tempSnake.splice(0, 0, newSnakeHead);
			if (newSnakeHead.x != fruit.x || newSnakeHead.y != fruit.y) {
				tempSnake.pop()
			} else {
				generateNewFruit(tempSnake)
			}
			setSnake(tempSnake);
		}
		moveSnakeForward()
		setGameState(GameStates.UPDATE);
		setGameTime(time => time + 1)
	}
	// initialize grid on first render
	useEffect(() => {
		const tempGrid: CellColors[][] = []
		for (let rIndex = 0; rIndex < row; rIndex++) {
			tempGrid[rIndex] = [];
			for (let cIndex = 0; cIndex < col; cIndex++) {
				tempGrid[rIndex][cIndex] = CellColors.available;
				if (fruit.x === rIndex && fruit.y === cIndex) {
					tempGrid[rIndex][cIndex] = CellColors.fruit;
				}
			}
		}
		snake.forEach(snakeLink => {
			tempGrid[snakeLink.x][snakeLink.y] = CellColors.snake
		});
		setGrid(tempGrid)
	}, [])
	//keyPress check
	useEffect(() => {
		const handleArrowKey = (event: any) => {
			switch (event.keyCode) {
				case 37:
					event.preventDefault();
					setDirection(Direction.D)
					break;
				case 38:
					setDirection(Direction.R);
					event.preventDefault();
					break;
				case 39:
					setDirection(Direction.U);
					event.preventDefault();
					break;
				case 40:
					setDirection(Direction.L);
					event.preventDefault();
					break;
				default:
					break;
			}

		};
		window.addEventListener('keydown', handleArrowKey);
		return () => {
			window.removeEventListener('keydown', handleArrowKey);
		};
	}, []);
	//this will act as the lifecycle update function
	useEffect(() => {
		if (!direction) {
			return
		}
		if(direction!=lastDirection){
			updateGrid()
			setLastDirection(direction)
			if (timeOut) {
				clearInterval(timeOut);
			}
			let some: NodeJS.Timer= setInterval(() => {
				getNewState()
			}, 1000);
			setTimeOut(some)
		}
		if (gameState === GameStates.UPDATE) {
			updateGrid()
		}
		if (gameState === GameStates.DEAD) {
			console.log("Game Over!!")
			if (timeOut) {
				clearInterval(timeOut);
			}

		}
	}, [direction, gameState, gameTime])

	return (
		<div className={style.main}>
			<div className={style.render}>
				{
					grid &&
					grid.map((row, rIndex) =>
						<div key={rIndex} className={style.row}>
							{
								row.map((col, cIndex) =>
									<div key={cIndex} className={style.col}>
										<Cell color={col} />
									</div>
								)
							}
						</div>
					)
				}
			</div>
		</div>

	);
}

export default Snake;
