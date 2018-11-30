import React from 'react';
import PropType from 'prop-types';
import classname from 'classnames';

const TextInputGroup = ({
    label,
    name,
    value,
    placeholder,
    type,
    onChange,
    error
}) => {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input type={type} name={name}
        className={classname('form-control form-control-lg', {
            'is-invalid': error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.propType = {
    name: PropType.string.isRequired,
    placeholder: PropType.string.isRequired,
    value: PropType.string.isRequired,
    label: PropType.string.isRequired,
    type: PropType.string.isRequired,
    onChange: PropType.string.isRequired,
    error: PropType.string.isRequired
}

TextInputGroup.defaultProps = {
    type: 'text'
}


export default TextInputGroup;