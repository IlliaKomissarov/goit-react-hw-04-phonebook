import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
// import ContactsDemo from './contactDemo.json';
import { Wrapper, Title, SubTitle } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);
  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('Phonebook'));
  //   if (items?.length) {
  //     setContacts(items);
  //   }
  // }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('Phonebook', JSON.stringify(contacts));
    } else {
      const items = JSON.parse(localStorage.getItem('Phonebook'));
      if (items?.length) {
        setContacts(items);
      }
      firstRender.current = false;
    }
  }, [contacts]);

  const addContact = data => {
    const { name, number } = data;
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts!`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const removeContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const getFilteredContacts = () => {
    //проверка на пустую строку
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue);
    });
    return filteredContacts;
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const filteredContacts = getFilteredContacts();
  return (
    <>
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
        <SubTitle>Contacts</SubTitle>
        <Filter handleFilter={handleFilter} />
        <ContactList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      </Wrapper>
    </>
  );
};
