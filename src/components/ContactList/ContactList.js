import PropTypes from 'prop-types';
import css from './ContactList.module.css'

function ContactList({ contacts, onDelete }) {
     return (
    <ul className={css.list} >
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p >
            {name}: {number}
          </p>
          <button className={css.button_delete} type="button" onClick={() => onDelete(id)}>
                Delete
              </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;