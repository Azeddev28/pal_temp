import { useEffect, useState } from 'react';

const SearchBar = ({ options, name, setValue, register }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        if (window) {
            const filteredSuggestions = options.filter((option) =>
                option.label
                    .toLowerCase()
                    .startsWith(
                        (query.label ? query.label : query).toLowerCase()
                    )
            );
            setSuggestions(filteredSuggestions);
        }
    }, [query, options]);

    // Handle user selection or submit
    const handleSelect = (selectedOption) => {
        setQuery(selectedOption);
        setSuggestions([]); // Clear suggestions on selection
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Handle search using the final query value here
    };
    const optionMatched = query && suggestions.length > 0;
    useEffect(() => {
        if (optionMatched) {
            let val;
            suggestions.map((suggestion) => {
                if (
                    suggestion.label.toLowerCase() ===
                    (query.label ? query.label : query).toLowerCase()
                )
                    val = suggestion.value;
            });
            setValue(name, val);
        }
    }, [optionMatched]);
    return (
        <form onSubmit={handleSubmit}>
            <div className="search-bar">
                <input
                    {...register(name)}
                    type="text"
                    value={query.label ? query.label : query}
                    onChange={(e) => {
                        setValue(name, e.target.value);
                        setQuery(e.target.value);
                    }}
                    placeholder="Select your company"
                    className={`border-2 border-solid ${
                        optionMatched ? 'rounded-t-lg' : 'rounded-lg'
                    } border-theme-border w-full p-2 lg:p-4`}
                />
                {optionMatched && (
                    <div className="border-2 border-solid !border-t-0 rounded-b-lg border-theme-border w-full p-2 lg:p-4">
                        <ul className="suggestions">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.value}
                                    onClick={() => handleSelect(suggestion)}
                                >
                                    {suggestion.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
