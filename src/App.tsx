import React from 'react';
import style from './App.module.css';
import { useAppSelector } from './global/redux/hooks'
import {modelType} from './global/dataTypes/enums'
//#region custom components
import Header from './components/header';
import RModel from './components/rModel';
//#endregion


function App() {
	const model = useAppSelector(state => state.model.value);
	return (
		<div className={style.App}>
			<div className={style.AppHeader}>
				<Header/>
				{
					(model!=modelType.NONE) && <RModel/>
				}
			</div>
		</div>
	);
}

export default App;
