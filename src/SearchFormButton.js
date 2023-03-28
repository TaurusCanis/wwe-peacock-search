

export default function SearchFormButton(props) {
    const toggleInputDisplay = (e) => {
	e.preventDefault();
	props.setSearchParametersDisplay({ ...props.searchParametersDisplay, [props.name]: !props.searchParametersDisplay[props.name] });
    }

    return(
	<button className="toggleSearchParametersBtn" onClick={toggleInputDisplay}>{props.name}</button>
    );
}
