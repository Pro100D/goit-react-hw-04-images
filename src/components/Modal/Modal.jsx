import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ src, alt, handleClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      handleClose();
    }
  };

  const handleClickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return (
    <div className="Overlay" onClick={handleClickOnBackdrop}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
