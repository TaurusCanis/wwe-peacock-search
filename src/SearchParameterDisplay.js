import RemoveButton from "./RemoveButton";

export default function SearchParameterDisplay(props) {
    return (
        <section>
            { 
            Object.keys(props.state.searchParameters).map(attribute => (
                <div>
                { props.state.searchParameters[attribute].length > 0 && props.state.searchParameters[attribute].map(val => (
                    <div>
                        <span>{val}</span>
                        <span onClick={() => props.dispatch({ type: 'removeSearchParameter', field: attribute, value: val })}>{"\u24E7"}</span>
                    </div>
                    ))}
                </div>
            ))
            }
        </section>
    );
}