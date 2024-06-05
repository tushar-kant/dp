import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../../config.jsx';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            await axios.post(`${config.baseURL}/api/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    return (
        <div>
            <hr /><br />
            <h2 className='text-center'>Upload Image</h2><hr /><br />
            <input type="file" name="image" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUpload;
