import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleNameChenge = evt => {
    setInputValue(evt.target.value.toLowerCase());
  };

  const handleSubmitForm = evt => {
    evt.preventDefault();

    if (inputValue.trim() === '') {
      Notiflix.Notify.failure('please enter a name');
      return;
    }

    onSubmit(inputValue);

    setInputValue('');

    evt.target.reset();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmitForm}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChenge}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
