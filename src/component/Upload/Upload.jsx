import axios from 'axios';
import React, { useState } from 'react';

const Upload = ({ setImages }) => {
    const [file, setFile] = useState(null);
    // console.log(setImages);

    const handleFileChange = (e) => {
        // Handle file input changes here
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Send the file to the server immediately
        uploadFile(selectedFile);
    };

    const uploadFile = async (selectedFile) => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            let res = await axios.post('http://localhost:5000/upload', formData);
            if (res.status === 201) {
                console.log('Success');
                fetch('http://localhost:5000/images')
                    .then(response => response.json())
                    .then(data => setImages(data))
                    .catch(error => console.error(error));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='border-2 border-gray-300 rounded-md flex justify-center items-center'>
            <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
            />
            <label htmlFor="file" className="relative border-0 border-gray-300 rounded-md p-2 cursor-pointer">
                <span className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"></span>
                Add Image
            </label>
        </div>
    );
};

export default Upload;