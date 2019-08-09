/**
 * @file
 * Autocomplete search component
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import './styles.scss';

// Default get suggestions method
const getSuggestions = (value, searchList) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  // Match from the beginning of the string
  return inputLength === 0
    ? []
    : searchList.filter(({ value }) => value.slice(0, inputLength) === inputValue);
};

// Default component/function to render suggestion
const RenderSuggestion = ({ display }) => (
  <div>
    {display}
  </div>
);

// Default mapping from suggestion to value
const getSuggestionValue = ({ display }) => display;

const AutocompleteSearch = ({
  className,
  searchList,
  getSuggestions,
  getSuggestionValue,
  renderSuggestion,
  onSelectCallback,
  placeholder,
}) => {
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, updateSuggestions] = useState([]);

  // Update suggestions based on search value
  const onSuggestionsFetchRequested = ({ value }) => {
    updateSuggestions(getSuggestions(value, searchList));
  };

  // Clear suggestions
  const onSuggestionsClearRequested = () => {
    updateSuggestions([]);
  };

  // Run callback
  const onSuggestionSelected = (event, { suggestion, suggestionValue }) => {
    if (onSelectCallback) onSelectCallback(suggestion, suggestionValue);
    setSearchValue(suggestionValue);
    inputRef.current.input.blur();
  };

  // Update search value state
  const onChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <form className={`${className}__form`}>
      <Autosuggest
        ref={inputRef}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        focusInputOnSuggestionClick={false}
        inputProps={{
          placeholder: placeholder || '',
          value: searchValue,
          onChange,
        }}
      />
    </form>
  );
};

AutocompleteSearch.displayName = 'GAutocompleteSearch';

AutocompleteSearch.propTypes = {
  className: PropTypes.string,
  searchList: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  getSuggestions: PropTypes.func,
  getSuggestionValue: PropTypes.func,
  renderSuggestion: PropTypes.func,
  onSelectCallback: PropTypes.func,
  placeholder: PropTypes.string,
};

AutocompleteSearch.defaultProps = {
  className: 'g-autocomplete-search',
  getSuggestions,
  renderSuggestion: RenderSuggestion,
  getSuggestionValue,
};

export default AutocompleteSearch;
