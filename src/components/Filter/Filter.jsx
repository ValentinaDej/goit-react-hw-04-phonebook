import PropTypes from 'prop-types';

import LabelInput from 'shared/LabelInput/LabelInput';
import styles from './Filter.module.css';

const Filter = ({ handleChange }) => {
  return (
    <div className={styles.ContactForm}>
      <LabelInput
        caption="Find contacts by name"
        type="text"
        name="filter"
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;

Filter.prototypes = {
  handleChange: PropTypes.func,
};
