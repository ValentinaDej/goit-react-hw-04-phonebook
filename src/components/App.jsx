import { useState } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const checkUniqueData = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLocaleLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (checkUniqueData(name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });
    return true;
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normmalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(normmalizedFilter);
    });

    return result;
  };

  const filteredContacts = getFilteredContacts();
  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter handleChange={handleFilter} />
        <ContactList
          onDeleteClick={deleteContact}
          contacts={filteredContacts}
        />
      </Section>
    </>
  );
};
