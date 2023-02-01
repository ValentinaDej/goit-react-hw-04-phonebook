import { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'shared/Button/Button';
import LabelInput from 'shared/LabelInput/LabelInput';
import styles from './ContactFofm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const result = onSubmit({ ...this.state });

    if (result) {
      this.reset();
    }
  };

  reset() {
    this.setState({
      name: '',
      number: '',
    });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    const { handleSubmit, handleChange } = this;
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
  }
}

export default ContactForm;

ContactForm.prototypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
