/**
 * @file
 * UK constituency lookup component
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AutosuggestSearch from '../../autosuggest-search';
import {
  getConstituencyIdFromPostcode,
  findMatch,
  isValidPostcode,
  containsNumber,
} from './helpers.js';
import './styles.scss';

const ConstituencyLookup = ({
  className,
  title,
  subhead,
  constituencyList,
  candidateList,
  setOpenConstituency,
}) => {
  const formattedConstituencyList = [
    ...constituencyList.map(({ id, name }) => ({
      value: id,
      display: name,
      type: 'constituency',
    })),
    ...candidateList.map(({ id, constituencyName, partyName, candidateName }) => ({
      value: id,
      display: candidateName,
      displayConstituency: constituencyName,
      type: 'candidate',
    })),
  ];

  const RenderSuggestion = ({ display, type, displayConstituency }) => (
    <div className={`suggestion-entry suggestion-entry--${type}`}>
      {type === 'candidate' && <i className="candidate-icon" />}
      {display}
      {type === 'candidate' && <div className="candidate-constituency">{displayConstituency}</div>}
    </div>
  );
  const getSuggestionValue = ({ display, type, displayConstituency }) =>
    type === 'constituency' ? display : displayConstituency;

  const getSuggestions = (value, searchList) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const inputValueWords = inputValue.split(' ');

    // Match from the beginning of the string, after 3 characters
    return inputLength < 3
      ? []
      : searchList.filter(({ display }) => {
          const words = display.toLowerCase().split(' ');
          return words.some(word =>
            inputValueWords.some(
              inputValueWord =>
                word.toLowerCase().slice(0, inputValueWord.length) === inputValueWord,
            ),
          );
        });
  };

  const onSelectCallback = suggestion => {
    const { value } = suggestion;
    setOpenConstituency(value);
  };

  const onSubmitCallback = async searchValue => {
    const constituencyMatch = findMatch(formattedConstituencyList, searchValue);
    if (constituencyMatch) {
      const { value } = constituencyMatch;
      setOpenConstituency(value);
    } else {
      const constituencyId = await getConstituencyIdFromPostcode(searchValue);
      if (constituencyId !== '') {
        setOpenConstituency(constituencyId);
      } else {
        return { isError: true, errorMessage: 'Server error' };
      }
    }
    return { isError: false, errorMessage: '' };
  };

  const validateInput = input => {
    if (input === '' || (!findMatch(formattedConstituencyList, input) && !containsNumber(input))) {
      return { isError: true, errorMessage: 'No match found' };
    }
    if (containsNumber(input) && !isValidPostcode(input)) {
      return { isError: true, errorMessage: 'Invalid postcode' };
    }
    return { isError: false, errorMessage: '' };
  };

  return (
    <div className={className}>
      <AutosuggestSearch
        placeholder="Search"
        width={'100%'}
        searchList={formattedConstituencyList}
        onSelectCallback={onSelectCallback}
        onSubmitCallback={onSubmitCallback}
        validateInput={validateInput}
        getSuggestions={getSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={RenderSuggestion}
      />
    </div>
  );
};

ConstituencyLookup.displayName = 'GConstituencyLookup';

ConstituencyLookup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subhead: PropTypes.string,
  constituencyList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  candidateList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      constituencyName: PropTypes.string,
      partyName: PropTypes.string,
      candidateName: PropTypes.string,
    }),
  ),
  setOpenConstituency: PropTypes.func.isRequired,
};

ConstituencyLookup.defaultProps = {
  className: 'g-constituency-lookup',
};

export default ConstituencyLookup;
