import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import { SearchBar } from './searchBar/SearchBar';
import { Gallary } from './imageGallary/ImageGallery';
import { Button } from './LoadMoreBtn/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { fetchImages } from '../services/pixabay-Api';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setIsLoad(true);
    fetchImages(searchValue.trim(), page)
      .then(response => {
        if (response.totalHits === 0) {
          Notiflix.Notify.failure('Oops, nothing found for that name :(');
          return;
        }
        const responseHits = response.hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
          tags: hit.tags,
        }));

        setImages([...images, ...responseHits]);
        setShowBtn(page < Math.ceil(response.totalHits / 12));
      })
      .catch(error => console.log(error.massage))
      .finally(() => setIsLoad(false));
  }, [page, searchValue]);

  const handleSubmit = value => {
    if (value === searchValue) {
      return;
    }
    setSearchValue(value);
    setImages([]);
    setPage(1);
    setIsLoad(false);
    setModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  const handleClickMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = ({ target: { name, alt } }) => {
    setModalOpen(true);
    setModalImg(name);
    setModalAlt(alt);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isLoad && <Loader />}
      <Gallary arrayImage={images} onImgClick={handleImageClick} />
      {showBtn && <Button onClick={handleClickMore} />}
      {modalOpen && (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleCloseModal} />
      )}
    </>
  );
};
