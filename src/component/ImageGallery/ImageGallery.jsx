import React, { useEffect, useState } from 'react';
import Upload from '../Upload/Upload';
import axios from 'axios';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);
    useEffect(() => {
        fetchImages()
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(id)) {
                return prevSelectedImages.filter((imageId) => imageId !== id);
            } else {
                return [...prevSelectedImages, id];
            }
        });
    };

    const handleDragStart = (e, index, id) => {
        e.dataTransfer.setData('imageId', id);
        e.dataTransfer.setData('imageIndex', index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setHoveredImage(index);
    };

    const handleDrop = (e, targetImageId) => {
        e.preventDefault();
        const sourceImageId = e.dataTransfer.getData('imageId');
        const sourceImageIndex = e.dataTransfer.getData('imageIndex');

        // Swap images in your images array
        const updatedImages = [...images];
        const temp = updatedImages[sourceImageIndex];
        updatedImages[sourceImageIndex] = updatedImages[targetImageId];
        updatedImages[targetImageId] = temp;

        setImages(updatedImages);
        setHoveredImage(null);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post('https://image-task-baeckend.vercel.app/deleteImages', { selectedImages });

            if (response.status === 200) {
                console.log('Images deleted successfully');
                await fetchImages(); // Assuming fetchImages is an asynchronous function
                setSelectedImages([]); // Assuming setSelectedImages is a state updater function
            } else {
                console.error('Failed to delete images');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await axios.get('https://image-task-baeckend.vercel.app/images');

            if (response.status === 200) {
                setImages(response.data);
                setIsUploaded(false);
            } else {
                console.error('Failed to fetch images');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                        draggable
                        onDragStart={(e) => handleDragStart(e, index, image.id)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <input
                            className="absolute z-10 top-4 left-4 w-6 h-6"
                            type="checkbox"
                            checked={selectedImages.includes(image)}
                            onChange={() => handleCheckboxChange(image)}
                        />
                        <div className="image-container">
                            <img
                                src={`https://image-task-baeckend.vercel.app/${image.url}`}
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