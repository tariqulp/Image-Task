import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const ImageGallery = () => {
    const [images, setImages] = useState([

        { id: 1, url: '/images/image-11.jpeg', isFeature: true },
        { id: 2, url: '/images/image-2.webp', isFeature: false },
        { id: 3, url: '/images/image-3.webp', isFeature: false },
        { id: 4, url: '/images/image-10.jpeg', isFeature: false },
        { id: 5, url: '/images/image-5.webp', isFeature: false },
        { id: 6, url: '/images/image-6.webp', isFeature: false },
        { id: 7, url: '/images/image-7.webp', isFeature: true },
        { id: 8, url: '/images/image-8.webp', isFeature: false },
        { id: 9, url: '/images/image-1.webp', isFeature: false },
        { id: 10, url: '/images/image-4.webp', isFeature: false },
        { id: 11, url: '/images/image-9.webp', isFeature: false },


    ]);
    // let images = [
    //     { id: 1, url: '/images/image-1.webp', isFeature: true },
    //     { id: 2, url: '/images/image-2.webp', isFeature: false },
    //     { id: 3, url: '/images/image-3.webp', isFeature: false },
    //     { id: 4, url: '/images/image-4.webp', isFeature: false },
    //     { id: 5, url: '/images/image-5.webp', isFeature: false },
    //     { id: 6, url: '/images/image-6.webp', isFeature: false },
    //     { id: 7, url: '/images/image-1.webp', isFeature: true },
    //     { id: 8, url: '/images/image-2.webp', isFeature: false },
    //     { id: 9, url: '/images/image-3.webp', isFeature: false },
    //     { id: 10, url: '/images/image-4.webp', isFeature: false },
    //     { id: 11, url: '/images/image-5.webp', isFeature: false },
    // ]

    const [selectedImages, setSelectedImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);

    const handleImageHover = (index) => {
        setHoveredImage(index);
    };

    const handleCheckboxChange = (id) => {
        // Toggle the selected state of the image
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(id)) {
                return prevSelectedImages.filter((imageId) => imageId !== id);
            } else {
                return [...prevSelectedImages, id];
            }
        });
    };


    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setImages(items);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='imgg'>
                {
                    (provided) => (
                        <div className="grid grid-cols-5 gap-4" {...provided.droppableProps} ref={provided.innerRef}>
                            {images.map((image, index) => (
                                <Draggable key={image.id} draggableId={image.id} index={images.indexOf(image)}>
                                    {
                                        (provided) => (
                                            <div
                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                key={images.indexOf(image)}
                                                className={`border border-gray-300 rounded-md ${images.indexOf(image) == 0 ? 'col-span-2' : ''} ${images.indexOf(image) == 0 ? 'row-span-2' : ''}`}
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
                                                        src={image.url}
                                                        alt={`Image ${index + 1}`}
                                                        className={`w-full h-full object-cover border-1 border-gray-100 ${selectedImages.includes(image.id) ? 'border-blue-500' : ''
                                                            }`}
                                                    />
                                                    {index === hoveredImage && <div className="image-overlay bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>}
                                                </div>


                                            </div>
                                        )
                                    }
                                </Draggable>

                            ))}
                            <label htmlFor="imageUpload" className="border-2 border-gray-300 rounded-md flex justify-center items-center cursor-pointer">
                                <div>
                                    <p>Add Photo</p>
                                </div>
                            </label>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                            // Handle file selection and upload logic here
                            />
                        </div>
                    )
                }
            </Droppable>

        </DragDropContext>
    );
};

export default ImageGallery;
