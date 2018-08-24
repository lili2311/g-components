import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default class DataFilter extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    initial: PropTypes.string,
    selectFrom: PropTypes.string, // for filtering by selection
    searchOver: PropTypes.arrayOf(PropTypes.string), // for filtering by typing (default)
    searchPlaceholder: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    set: PropTypes.func,
    isAllSelectable: PropTypes.bool, // only if filtering by selection
    isRadioSelectable: PropTypes.bool, // only if filtering by selection
  };

  static defaultProps = {
    className: null,
    initial: '',
    selectFrom: '',
    searchOver: [],
    searchPlaceholder: null,
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
      className,
      initial,
      selectFrom,
      searchOver,
      searchPlaceholder,
      data,
      isAllSelectable,
      isRadioSelectable,
    } = this.props;
    if (selectFrom && searchOver.length > 0) {
      throw new Error('Cannot set selectFrom as well as searchOver!');
    }
    if (selectFrom && initial && data.filter(row => row[selectFrom]) > 0) {
      throw new Error('Initial value not found in selectFrom options!');
    }
    if (selectFrom && searchPlaceholder) {
      throw new Error('Setting searchPlaceholder is meaningless when selectFrom set')
    }
    if (selectFrom === '' && isAllSelectable) {
      throw new Error('Setting isAllSelectable is meaningless without selectFrom!');
    }
    const { isLoaded, text } = this.state;
    if (!isLoaded) return null; // render nothing statically
    const namedClass = [className, 'g-data-filter', 'o-forms', 'o-forms--wide']
      .filter(x => x)
      .join(' ');
    if (selectFrom) {
      const options = Array.from(new Set(data.map(row => row[selectFrom])));
      if (isRadioSelectable) {
        return (
          <fieldset className={namedClass}>
            <div className="o-forms__group o-forms__group--inline-together">
              {isAllSelectable === false ? null : (
                <Fragment>
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
                </Fragment>
              )}
              {options.map(option => (
                <Fragment>
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
                </Fragment>
              ))}
            </div>
          </fieldset>
        );
      }
      return (
        <div className={namedClass}>
          {options.length === 0 ? null : (
            <select className="o-forms__select" value={text} onChange={this.setText}>
              {isAllSelectable === false ? null : (
                <option value="">
(All)
                </option>
              )}
              {options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      );
    }
    return (
      <div className={namedClass}>
        <input
          type="text"
          className="o-forms__text"
          value={text}
          placeholder={searchPlaceholder}
          onChange={this.setText}
        />
      </div>
    );
  }
}
