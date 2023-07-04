import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    if (contacts.find(contact => contact.number === number)) {
      return alert(`${number} is already in contacts`);
    }
    if (name.trim() === '' || number.trim() === '') {
      alert(`Enter the contact's name and number phone!`);
    }
    setContacts(prevState =>
      [newContact, ...prevState].sort((first, second) =>
        first.name.localeCompare(second.name)
      )
    );
    return true;
  };

  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = contacts.filter(element =>
    element.name.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 1 && <Filter value={filter} onChange={handleFilter} />}
      {contacts.length > 0 ? (
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      ) : (
        <p>Your phonebook is empty.</p>
      )}
    </Container>
  );
};

export default App;
