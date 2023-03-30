import { processName } from "./helpers";
import AddButton from "./AddButton";
import { useRef } from "react";

export default function SearchFormInputContainer(props) {
	const displayName = processName(props.name);
	const inputRef = useRef();

    return (
	<div className={props.searchParametersDisplay ? "show" : "hide"}>
	    <input 
			onChange={(e) => props.dispatch({
				type: 'updateFormField',
				field: e.target.name,
				value: e.target.value,
			})}
			onKeyDown={(e) => {
				if (e.key === 'Enter') props.dispatch({ type: 'addSearchParameter', e: e });
			}}
			type="text" 
			value={props.value} 
			id={props.name} 
			name={props.name} 
			placeholder={displayName} 
			ref={inputRef}
		/>
		<AddButton 
			dispatch={props.dispatch} 
			value={props.value}
			inputRef={inputRef.current}
		/>
	</div>
    );
}
