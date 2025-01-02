import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Permalink from '../services/permalink';

class TextBoxOptionInput extends React.PureComponent {
  render() {
    const {
      isDisabled,
      labelText,
      optionName,
      optionValue,
      setOptionValue,
    } = this.props;

    /*const App = () => {
      const [, setOptionValue] = useState('test');

      const handleChange = event => {
        setOptionValue(optionName,event.target.value);
      }
    }*/

    return (
      <>
        <td className="label-text">{labelText}</td>
        <td className="option-container">
          <div className="textbox-container">
            <input
              type ="text"
              value={optionValue}
              //defaultValue= { setOptionValue(optionName,"Default") }
              onChange= {
                (event) => {
                  setOptionValue(optionName,event.target.value);
                }
              }
              disabled={isDisabled}
            />
          </div>
        </td>
      </>
    );
  }
}

TextBoxOptionInput.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  optionName: PropTypes.string.isRequired,
  optionValue: PropTypes.string,
  setOptionValue: PropTypes.func.isRequired,
};

export default TextBoxOptionInput;
