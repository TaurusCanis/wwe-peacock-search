import { useState, useReducer } from "react";
import SearchFormButton from "./SearchFormButton";
import SearchFormInputContainer from "./SearchFormInputContainer"; 

export default function SearchForm() {
	const searchFields = [
		"date",
	    "city",
	    "venue",
	    "eventName",
	    'stipulations',
	    "participants",
	];

	const stateProperties = [
		"formFields",
		"searchInputsDisplay",
		"searchParameters",
	]

	const searchReducerInitialState = () => {
		const initialState = {};
		stateProperties.forEach(attribute => {
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
						break;
				}
			});
		})
		return initialState;
	}

	const addValue = (e, state) => {
		const attributeName = e.target.name.includes("Date") ? "date" : e.target.name;
		const copy = {...state}
		copy[attributeName].push(e.target.value)
		return copy
    }

	const clearFormInput = (e, state) => {
		return {
			...state,
			[e.target.name]: "",
		}
	};

	const removeValue = (state, field, value) => {
		const copy = {...state};
		copy[field] = copy[field].filter(item => item !== value);
		return copy;
	}
		
const searchReducer = (state, action) => {
	switch(action.type) {
	    case 'updateFormField':
			return {
				...state,
				formFields: {
					...state.formFields,
					[action.field]: action.value,
				}
			}

	    case 'updateInputsDisplay':
			return {
				...state,
				searchInputsDisplay: {
					...state.searchInputsDisplay,
					[action.field]: action.value,
				}
			}

	    case 'addSearchParameter': 
			if (action.e.key === 'Enter' || action.e.type === 'change') {
				const updatedValue = addValue(action.e, state.searchParameters);
				const clearedForm = clearFormInput(action.e, state.formFields);
				return {
					...state,
					formFields: clearedForm,
					searchParameters: updatedValue,
				};
			}
			else {
				return state
			}
		
		case 'removeSearchParameter':
			const updatedValue = removeValue(state.searchParameters, action.field, action.value);
			return {
				...state,
				searchParameters: updatedValue,
			}

		default:
			return
	}
    };

    const [state, dispatch] = useReducer(searchReducer, {}, searchReducerInitialState);
	const [dateType, setDateType] = useState("on");  

    const handleFormChange = (e) => {
		dispatch({
			type: 'updateFormField',
			field: e.target.name,
			value: e.target.value,
		});
    };
 
    return (
	<>
	<h1>WWE Peacock Search</h1>
	<h2>Retrieve Peacock VOD links for all WWE PPV and PLE since 1985</h2>
	<h3>Search by any combination of Date, City, Venue, Event Name, Match Stipulation, and Performers</h3>
	<h3>For example, say you were looking for the Hell in a Cell match with Rikishi. You know the stipulation and a participant, so click both of those buttons below, and text input fields will appear. Enter "Hell in a Cell" in the stipulations field and "Rikishi" in the performers field. Hit enter on your keyboard after typing each term or click the "Add" button. You will see the search terms appear below, and the text inputs will clear. You can add more peformers (say, Kurt Angle, for example) or other search parameters if necessary. If you make a mistake or want to remove a search term, simply click the "x" next to the term. Since Rikishi only participated in one Hell in a Cell match, we will only receive one result. If instead we had searched for "The Undertaker" we would have received a list of each Hell in a Cell match that The Undertaker participated in.</h3>
	<form>
	    <div id="searchParametersBtnContainer">
			{
				searchFields.map(key => (
					<SearchFormButton
						key={key}
						name={key}
						searchParametersDisplay={state.searchInputsDisplay['date']} 
						dispatch={dispatch} 
					/>
				))
			}
	    </div>
  	    <div className={state.searchInputsDisplay['date'] ? "show" : "hide"} id="formBlockDate">
	        <div>
	            <span onClick={() => setDateType("on")}>On</span><span onClick={() => setDateType("between")}>Between</span>
		</div>
	        <input onChange={(e) => {handleFormChange(e); addValue(e);}} type="date" id="startDate" name="startDate" />
		{ dateType === 'between' &&
		    <>
			<span>and</span>
		    	<input onChange={handleFormChange} type="date" id="endDate" name="endDate" />
		    </>
		}
		<span onClick={() => dispatch({ type: 'updateInputsDisplay', field: "date", value: false })}>x</span>
	    </div>
		<div id="searchFormsContainer">
			{
				searchFields.filter(x => x !== 'date').map(key => (
					<SearchFormInputContainer 
						key={key}
						name={key}
						value={state.formFields[key]} 
						dispatch={dispatch}
						searchParametersDisplay={state.searchInputsDisplay[key]} 
					/>
				))
			}
		</div>
	    <button>Search</button>
	</form>
        <section>
	    { 
		Object.keys(state.searchParameters).map(attribute => (
		    <div>
			{ state.searchParameters[attribute].length > 0 && state.searchParameters[attribute].map(val => (
			    <div onClick={() => dispatch({ type: 'removeSearchParameter', field: attribute, value: val })}>{val}</div>
		    	))}
		    </div>
		))
	    }
	</section>
	</>	
    );
}
