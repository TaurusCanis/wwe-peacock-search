import SearchForm from "./SearchForm";
import { searchReducer } from "./reducer";
import { useReducer } from "react";
import SearchParameterDisplay from "./SearchParameterDisplay";
import Modal from "./Modal";
import SearchResults from "./SearchResults";

export default function SearchPage() {
    const searchFields = [
		"date",
	    "city",
	    "venue",
	    "event-name",
	    'stipulations',
	    "participants",
	];

	const stateProperties = [
		"formFields",
		"searchInputsDisplay",
		"searchParameters",
        "searchResults",
	]

	const searchReducerInitialState = () => {
		const initialState = {};
		stateProperties.filter(p => p !== "searchResults").forEach(attribute => {
			initialState[attribute] = {};
			searchFields.forEach(field => {
				switch(attribute) {
					case 'formFields':
						if (field === 'date') {
							initialState[attribute]["startDate"] = "";
							initialState[attribute]["endDate"] = "";
						}
						else initialState[attribute][field] = "";
						break;
					case 'searchInputsDisplay':
						initialState[attribute][field] = false;
						break;
					case 'searchParameters':
						initialState[attribute][field] = [];
						break;
					default:
						initialState[attribute][field] = null;
						break;
				}
			});
		});
        initialState['searchResults'] = [];
		return initialState;
	}
		
    const [state, dispatch] = useReducer(searchReducer, {}, searchReducerInitialState);

    return (
        <>
            <h1>WWE Peacock Search</h1>
            <h2>Retrieve Peacock VOD links for all WWE PPV and PLE since 1985</h2>
            <h3>Search by any combination of {/*Date,*/} City, Venue, Event Name, Match Stipulation, and Performers</h3>
            <Modal />
            <SearchForm state={state} dispatch={dispatch} searchFields={searchFields} />
            <SearchParameterDisplay state={state} dispatch={dispatch} />
            <SearchResults state={state}/>
        </>
        
    );
}