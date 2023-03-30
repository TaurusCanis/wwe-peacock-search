

export default function SearchResults(props) {
    return (
        <div>
            {
                props.state.searchResults.length > 0 && props.state.searchResults.map(res => (
                   <div>{res.title}</div> 
                ))
            }
        </div>
    );
}