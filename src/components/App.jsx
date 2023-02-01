import { Component } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.checkUniqueData(name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }

    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };

  checkUniqueData(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;

    const result = contacts.find(({ name }) => {
      return name.toLocaleLowerCase() === normalizedName;
    });

    return Boolean(result);
  }

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== contactId);
      return { contacts: newContacts };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normmalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(normmalizedFilter);
    });

    return result;
  }

  render() {
    const { addContact, handleFilter, deleteContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter handleChange={handleFilter} />
          <ContactList onDeleteClick={deleteContact} contacts={contacts} />
        </Section>
      </>
    );
  }
}
