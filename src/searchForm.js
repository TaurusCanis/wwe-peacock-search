import { useState } from "react";
import SearchFormButton from "./SearchFormButton";
import SearchFormInputContainer from "./SearchFormInputContainer"; 

export default function SearchForm(props, children) {
	const [dateType, setDateType] = useState("on");  
	const handleDateChange = (e) => {
		props.dispatch({
			type: 'updateFormField',
			field: e.target.name,
			value: e.target.value,
		});
		props.dispatch({ type: 'addSearchParameter', e: e })
	}
 
    return (
		<form>
			<div id="searchParametersBtnContainer">
				{
					/* filter function needs to be removed when date is implemented */
					props.searchFields.filter(field => field !== 'date').map(key => (
						<SearchFormButton
							key={key}
							name={key}
							searchParametersDisplay={props.state.searchInputsDisplay['date']} 
							dispatch={props.dispatch} 
							state={props.state}
						/>
					))
				}
			</div>
			<div id="searchFormsContainer">
				{/*
					Date is a little tricky to implement. Will hold off for now.
					<DateInput 
						state={state} 
						dispatch={dispatch}
						dateType={dateType} 
						setDateType={setDateType} 
						handleDateChange={handleDateChange}
					/>
				*/}
				{
					props.searchFields.filter(x => x !== 'date').map(key => (
						<SearchFormInputContainer 
							key={key}
							name={key}
							value={props.state.formFields[key]} 
							dispatch={props.dispatch}
							state={props.state}
							searchParametersDisplay={props.state.searchInputsDisplay[key]} 
						/>
					))
				}
			</div>
			<button className="primary" onClick={(e) => { 
				e.preventDefault();
				props.dispatch({ type: 'submitQuery' })
			}}>
				Search
			</button>
		</form>
    );
}
