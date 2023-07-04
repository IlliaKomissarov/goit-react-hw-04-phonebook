import PropTypes from 'prop-types';
import css from './Filter.module.css'

function Filter({ value, onChange }) {
  return (
     <label className={css.label} htmlFor="search" >
      Find contacts by name
      <input className={css.input}
       name="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </label> 
   )

}


Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};


export default Filter;