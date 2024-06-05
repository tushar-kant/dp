import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../../config.jsx';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get(`${config.baseURL}/api/images/all`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
                // Handle error or notify the user
            }
        }
        fetchImages();
    }, []);

    return (
        <div style={galleryStyle}>
            <h2 style={headingStyle}>Image Gallery</h2>
            <div style={imageContainerStyle}>
                {images.map(image => (
                    <div key={image._id} style={imageWrapperStyle}>
                        <img src={`${config.baseURL}/api/images/${image._id}`} alt={image.filename} style={imageStyle} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles
const galleryStyle = {
    textAlign: 'center',
    padding: '20px',
};

const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
};

const imageContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
};

const imageWrapperStyle = {
    overflow: 'hidden',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.05)',
    },
};

export default ImageGallery;
