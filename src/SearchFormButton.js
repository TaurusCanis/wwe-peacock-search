import { processName } from "./helpers";

export default function SearchFormButton(props) {
    const name = props.name.includes("-") ? processName(props.name) : props.name;

    const toggleInputDisplay = (e) => {
        e.preventDefault();
        // props.setSearchParametersDisplay({ ...props.searchParametersDisplay, [props.name]: true });
        props.dispatch({
            type: 'updateInputsDisplay',
            field: name,
            value: true,
        });
    }

    return(
	    <button 
            className="toggleSearchParametersBtn" 
            onClick={toggleInputDisplay}
        >
            {name}
        </button>
    );
}
