import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default class DataFilter extends React.PureComponent {
  static propTypes = {
    initial: PropTypes.string,
    selectFrom: PropTypes.string, // for filtering by selection
    searchOver: PropTypes.arrayOf(PropTypes.string), // for filtering by typing (default)
    data: PropTypes.arrayOf(PropTypes.object),
    set: PropTypes.func,
    isAllSelectable: PropTypes.bool, // only if filtering by selection
    isRadioSelectable: PropTypes.bool, // only if filtering by selection
  };

  static defaultProps = {
    initial: '',
    selectFrom: '',
    searchOver: [],
    data: [],
    set: () => {},
    isAllSelectable: false,
    isRadioSelectable: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      text:
        props.initial
        || (props.selectFrom
          && !props.isAllSelectable
          && props.data[0]
          && props.data[0][props.selectFrom])
        || '',
    };
    if (props.selectFrom && props.searchOver.length > 0) {
      throw new Error('Cannot set selectFrom as well as searchOver!');
    }
    if (props.selectFrom && props.initial && props.data.filter(row => row[props.selectFrom]) > 0) {
      throw new Error('Initial value not found in selectFrom options!');
    }
    if (props.isAllSelectable && props.selectFrom === '') {
      throw new Error('Setting isAllSelectable is meaningless without selectFrom!');
    }
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  setText = (event) => {
    event.stopPropagation();
    this.setState({ text: event.target.value });
  };

  update = () => {
    const {
      selectFrom, searchOver, data, set,
    } = this.props;
    const { text } = this.state;
    const textNormalised = text
      .trim()
      .toLowerCase()
      .replace(/^[a-z0-9 ]/, '');
    if (textNormalised === '') {
      set(data);
    } else if (selectFrom) {
      const dataFiltered = data.filter(row => row[selectFrom] === text);
      set(dataFiltered);
    } else {
      const keywords = textNormalised.split(/ +/).filter(x => x);
      const dataFiltered = data.filter((row) => {
        const columns = searchOver.length > 0 ? searchOver : Object.keys(row);
        return keywords.every(keyword => columns.some((column) => {
          if (!row[column]) return false;
          return row[column]
            .toString()
            .toLowerCase()
            .includes(keyword);
        }));
      });
      set(dataFiltered);
    }
  };

  render() {
    const {
      selectFrom, data, isAllSelectable, isRadioSelectable,
    } = this.props;
    const { isLoaded, text } = this.state;
    if (!isLoaded) return null; // render nothing statically
    if (selectFrom) {
      const options = Array.from(new Set(data.map(row => row[selectFrom])));
      if (isRadioSelectable) {
        return (
          <fieldset className="g-data-filter o-forms o-forms--wide">
            <div className="o-forms__group o-forms__group--inline-together">
              {isAllSelectable === false ? null : (
                <React.Fragment>
                  <input
                    type="radio"
                    className="o-forms__radio-button"
                    value=""
                    checked={text === ''}
                    onChange={this.setText}
                    id="g-data-filter-all"
                  />
                  <label htmlFor="g-data-filter-all" className="o-forms__label">
                    (All)
                  </label>
                </React.Fragment>
              )}
              {options.map(option => (
                <React.Fragment>
                  <input
                    type="radio"
                    className="o-forms__radio-button"
                    value={option}
                    checked={text === option}
                    onChange={this.setText}
                    id={`g-data-filter-${option}`}
                  />
                  <label htmlFor={`g-data-filter-${option}`} className="o-forms__label">
                    {option}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>
        );
      }
      return (
        <div className="g-data-filter o-forms o-forms--wide">
          {options.length === 0 ? null : (
            <select className="o-forms__select" value={text} onChange={this.setText}>
              {isAllSelectable === false ? null : (
                <option value="">
(All)
                </option>
              )}
              {options.map(option => (
                <option value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      );
    }
    return (
      <div className="g-data-filter o-forms o-forms--wide">
        <input type="text" className="o-forms__text" value={text} onChange={this.setText} />
      </div>
    );
  }
}
