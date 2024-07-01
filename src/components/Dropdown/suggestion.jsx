import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const SearchBar = ({ options, setValue, value, handleChange }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [optionSelected, setOptionSelected] = useState(false);
    const { suggestionListVisibility } = useSelector((state) => state.auth);
    useEffect(() => {
        if (window) {
            const filteredSuggestions = options?.filter((option) =>
                option?.label
                    ?.toLowerCase()
                    ?.startsWith(
                        (query.label ? query.label : query).toLowerCase()
                    )
            );
            setSuggestions(filteredSuggestions);
        }
    }, [query, options]);

    // useEffect for setting suggestion list empty

    useEffect(() => {
        setSuggestions([]);
    }, [suggestionListVisibility]);
    const handleSelect = (selectedOption) => {
        setValue('company', selectedOption);
        setQuery(selectedOption);
        setOptionSelected(true);
        setSuggestions([]);
    };
    const optionMatched = !optionSelected && query && suggestions?.length > 0;

    return (
        <div className="search-bar">
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    handleChange(e);
                    setQuery(e.target.value);
                    setOptionSelected(false);
                }}
                placeholder="Select your company"
                className={`border-2 border-solid ${
                    optionMatched ? 'rounded-t-lg' : 'rounded-lg'
                } border-theme-border w-full p-2 lg:p-4`}
            />
            {optionMatched && (
                <div className="border-2 border-solid !border-t-0 rounded-b-lg border-theme-border w-full p-2 lg:p-4 cursor-pointer">
                    <ul className="suggestions">
                        {suggestions?.map((suggestion) => (
                            <li
                                key={suggestion?.value}
                                onClick={() => handleSelect(suggestion?.label)}
                            >
                                {suggestion?.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
