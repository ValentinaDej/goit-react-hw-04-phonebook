import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'shared/Button/Button';
import LabelInput from 'shared/LabelInput/LabelInput';
import styles from './ContactFofm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setState({ name: '', number: '' });
  };

  const { name, number } = state;

  return (
    <form className={styles.сontactForm} onSubmit={handleSubmit}>
      <LabelInput
        caption="Name"
        value={name}
        onChange={handleChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required="required"
      />
      <LabelInput
        caption="Number"
        value={number}
        onChange={handleChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required="required"
      />
      <Button title="Add contact" type="submit" />
    </form>
  );
};

export default ContactForm;

ContactForm.prototypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
