import { useState } from "react";
import SearchFormButton from "./SearchFormButton";
import SearchFormInputContainer from "./SearchFormInputContainer"; 

export default function SearchForm() {
    const [formFields, setFormFields] = useState({
	startDate: "",
	endDate: "",
	city: "",
	venue: "",
	eventName: "",
	stipulations: "",
	participants: ""
    });
    const [dateType, setDateType] = useState("on");  
    const [searchParameters, setSearchParameters] = useState({
	date: [],
	city: [],
	venue: [],
	eventName: [],
	stipulations: [],
	participants: []
    });

    const [searchParametersDisplay, setSearchParametersDisplay] = useState({
	date: false,
	city: false,
	venue: false,
	eventName: false,
	stipluations: false,
	participants: false
    });
 
    const clearFormInput = (e) => {
	setFormFields({
	    ...formFields,
	    [e.target.name]: ""
	});
    }

    const addValue = (e) => {
	if (e.key === 'Enter' || e.type === 'change') {
	    const attributeName = e.target.name.includes("Date") ? "date" : e.target.name;
	    setSearchParameters(data => {
		const copy = {...searchParameters}
		copy[attributeName].push(e.target.value)
		return copy
	    });	    	
	    clearFormInput(e);
	}
    }
    
    const removeValue = (attribute, val) => {
	setSearchParameters(data => {
	    const copy = {...searchParameters}
	    copy[attribute] = copy[attribute].filter(item => item != val)
	    return copy
	});
    }

    const handleFormChange = (e) => {
	setFormFields({
	    ...formFields,
	    [e.target.name]: e.target.value
	});
    }
 
    return (
	<>
	<form>
	    <div id="searchParametersBtnContainer">
		<SearchFormButton name="date" searchParametersDisplay={searchParametersDisplay} setSearchParametersDisplay={setSearchParametersDisplay} />
		
		<SearchFormButton name="city" searchParametersDisplay={searchParametersDisplay} setSearchParametersDisplay={setSearchParametersDisplay} />
		
		<SearchFormButton name="venue" searchParametersDisplay={searchParametersDisplay} setSearchParametersDisplay={setSearchParametersDisplay} />
	    	
		<SearchFormButton name="event-name" searchParametersDisplay={searchParametersDisplay} setSearchParametersDisplay={setSearchParametersDisplay} />
		
		<SearchFormButton name="stipulations" searchParametersDisplay={searchParametersDisplay} setSearchParametersDisplay={setSearchParametersDisplay} />
		
		<SearchFormButton name="participants" searchParametersDisplay={searchParametersDisplay} setSearchParametersDisplay={setSearchParametersDisplay} />
	    </div>
  	    <div className={searchParametersDisplay['date'] ? "show" : "hide"} id="formBlockDate">
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
	    </div>
	    <SearchFormInputContainer name="city" value={formFields['city']} addValue={addValue} handleFormChange={handleFormChange} searchParametersDisplay={searchParametersDisplay} />
	    <SearchFormInputContainer name="venue" value={formFields['venue']} addValue={addValue} handleFormChange={handleFormChange} searchParametersDisplay={searchParametersDisplay} />
	    <SearchFormInputContainer name="event-name" value={formFields['eventName']} addValue={addValue} handleFormChange={handleFormChange} searchParametersDisplay={searchParametersDisplay} />
	    <SearchFormInputContainer name="stipulations" value={formFields['stipulations']} addValue={addValue} handleFormChange={handleFormChange} searchParametersDisplay={searchParametersDisplay} />
	    <SearchFormInputContainer name="participants" value={formFields['participants']} addValue={addValue} handleFormChange={handleFormChange} searchParametersDisplay={searchParametersDisplay} />
	    <button>Search</button>
	</form>
        <section>
	    { 
		Object.keys(searchParameters).map(attribute => (
		    <div>
			{ searchParameters[attribute].length > 0 && searchParameters[attribute].map(val => (
			    <div onClick={() => removeValue(attribute, val)}>{val}</div>
		    	))}
		    </div>
		))
	    }
	</section>
	</>	
    );
}
