import React, { useEffect, useState } from 'react';
import Upload from '../Upload/Upload';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    const [isUploaded, setIsUploaded] = useState(false);

    useEffect(() => {
        console.log(isUploaded)
        fetch('http://localhost:5000/images')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error(error));
        setIsUploaded(false);
    }, []);
    const [selectedImages, setSelectedImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);

    const handleImageHover = (index) => {
        setHoveredImage(index);
    };

    const handleCheckboxChange = (id) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(id)) {
                return prevSelectedImages.filter((imageId) => imageId !== id);
            } else {
                return [...prevSelectedImages, id];
            }
        });
    };

    const handleDelete = () => {
        // Handle image deletion logic here
        // You can use the selectedImages array to identify and delete the selected images
        console.log('Deleting selected images:', selectedImages);

        // Clear the selectedImages state after deletion
        setSelectedImages([]);
    };

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                {selectedImages.length > 0 ? (
                    <div className="flex items-center justify-between w-full">
                        <span className="mr-2 font-bold underline">{selectedImages.length} Files selected</span>
                        <button className="font-bold text-red-600 rounded underline" onClick={handleDelete}>
                            Delete files
                        </button>
                    </div>
                ) : (
                    <span className="font-bold">Gallery</span>
                )}
            </div>
            <div className="grid grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={`border border-gray-300 rounded-md ${index === 0 ? 'col-span-2' : ''} ${index === 0 ? 'row-span-2' : ''
                            }`}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => handleImageHover(index)}
                        onMouseLeave={() => handleImageHover(null)}
                    >
                        <input
                            className="absolute z-10 top-4 left-4 w-6 h-6"
                            type="checkbox"
                            checked={selectedImages.includes(image.id)}
                            onChange={() => handleCheckboxChange(image.id)}
                        />
                        <div className="image-container">
                            <img
                                src={`http://localhost:5000${image.url}`}
                                alt={`Image ${index + 1}`}
                                className={`w-full h-full object-cover border-1 border-gray-100 ${selectedImages.includes(image.id) ? 'border-blue-500' : ''
                                    }`}
                            />
                            {index === hoveredImage && (
                                <div className="image-overlay bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                            )}
                        </div>
                    </div>
                ))}
                <Upload setImages={setImages} />
            </div>
        </div>
    );
};

export default ImageGallery;