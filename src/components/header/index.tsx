import style from './main.module.css';
import {modelType, links} from '../../global/dataTypes/enums';
import { useAppDispatch } from '../../global/redux/hooks'
import { changeModel } from '../../global/redux/reducer';

interface HeaderComp{
	label: string,
	modelLink: modelType,
	refLink: links
}

const HeaderComps: HeaderComp[] = [
	{
		label: "About Me",
		modelLink: modelType.NONE,
		refLink: links.ABOUT_ME
	},
	{
		label: "Contact",
		modelLink: modelType.NONE,
		refLink: links.CONTACT
	},
	{
		label: "Games",
		modelLink: modelType.GAME,
		refLink: links.NONE
	}
]


function Header() {
	const dispatch = useAppDispatch()
	const resolveRender = (link:links, model: modelType):any =>{
		if(link!=links.NONE){
			console.log(`Redirect To ${link}`)
			return 
		}
		if(model!=modelType.NONE){
			console.log(`Open Model for ${model}`)
			dispatch(
				changeModel( modelType.GAME)
			)
			return
		}
		console.log("Failed Case")
	}
	return (
		<div className={style.main}>
			<h1 className={style.home} onClick={() =>resolveRender(links.HOME, modelType.NONE)} >AL</h1>
			{HeaderComps.map((data, index) => 
				<div key={index} className={style.headerComp} onClick={() =>resolveRender(data.refLink, data.modelLink)}>
					<h3>{data.label}</h3>
				</div>	
			)}
		</div>
	);
}

export default Header;
