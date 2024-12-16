import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    console.error('Failed to fetch book', response);
                    throw new Error('Failed to fetch book');
                }
                const data = await response.json();
                console.log('Fetched book data:', data);
                setBook(data.book);  // Ensure the correct part of the data is being set
            } catch (error) {
                console.error('Error fetching book:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        console.log('Book state updated:', book);
    }, [book]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError || !book) return <div>Error loading book info</div>;

    console.log('Rendering book data:', { title: book?.title, author: book?.author });

    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book?.title || 'No Title Available'}</h1>
            <div>
                <img
                    src={getImgUrl(book?.coverImage)}
                    alt={book?.title || 'Book Cover'}
                    className="mb-8"
                    onError={(e) => { e.target.src = 'path/to/default-image.jpg'; }} // Fallback image
                />
                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book?.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {book?.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'Unknown Date'}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category || 'Uncategorized'}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {book?.description || 'No description available.'}</p>
                </div>
                <button
                    onClick={() => handleAddToCart(book)}
                    className="btn-primary px-6 space-x-1 flex items-center gap-1"
                >
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default SingleBook;
