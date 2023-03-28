import { processName } from "./helpers";

export default function SearchFormInputContainer(props) {
    const name = props.name.includes("-") ? processName(props.name) : props.name;
	
    return (
	<div className={props.searchParametersDisplay ? "show" : "hide"}>
	    <input 
			onChange={(e) => props.dispatch({
				type: 'updateFormField',
				field: e.target.name,
				value: e.target.value,
			})}
			// onKeyDown={props.addValue} 
			onKeyDown={(e) => props.dispatch({ type: 'addSearchParameter', e: e })}
			type="text" 
			value={props.value} 
			id={name} 
			name={name} 
			placeholder={name} 
		/>
		<span 
			onClick={() => props.dispatch({ type: 'updateInputsDisplay', field: name, value: false })}
		>
			X
		</span>
	</div>
    );
}
