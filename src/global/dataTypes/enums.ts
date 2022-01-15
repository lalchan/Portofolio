export enum modelType {
	NONE= "none",
	GAME= "game",
}
export enum links {
	NONE= '',
	HOME= '/',
	ABOUT_ME="/about",
	CONTACT ="/contact"
} 
export enum gameTypes {
	SNAKE="Snake",
	NONE="None"
}
export enum SnakeCellColors {
	available= "grey",
	snake = "black",
	fruit = "red"
}
export enum SnakeDirections {
	U="up",
	D="down",
	L="left",
	R="right"
}
export enum SnakeGameState {
	INIT = "start",
	UPDATE ="going",
	DEAD ="stop"
}