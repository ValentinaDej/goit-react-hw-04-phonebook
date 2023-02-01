import PropTypes from 'prop-types';

import Button from 'shared/Button/Button';

import styles from './ContactItem.module.css';

const ContactItem = ({ id, name, number, onDeleteClick }) => {
  return (
    <li className={styles.listItem}>
      {name}: {number}
      <Button
        title="Delete"
        type="button"
        onClick={() => {
          onDeleteClick(id);
        }}
      />
    </li>
  );
};

export default ContactItem;

ContactItem.prototypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
