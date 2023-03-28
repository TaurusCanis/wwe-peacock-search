

export default function SearchFormInputContainer(props) {
    const processName = (n) => {
	const splitName = n.split("-");
	return `${splitName[0]}${splitName[1][0].toUpperCase()}${splitName[1].slice(1)}`
    }

    const name = props.name.includes("-") ? processName(props.name) : props.name;
	
    return (
	<div className={props.searchParametersDisplay[props.name] ? "show" : "hide"}>
	    <input onChange={props.handleFormChange} onKeyPress={props.addValue} type="text" value={props.value} id={name} name={name} placeholder={name} />
	</div>
    );
}
