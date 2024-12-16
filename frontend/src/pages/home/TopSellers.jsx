import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "business", "books", "marketing", "horror", "fiction", "adventure"];

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
    const { data = {}, error, isLoading } = useFetchAllBooksQuery();
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        console.log("Selected Category:", selectedCategory);

        let books = data.books || []; // Access the books array within the data object
        let filtered = [];
        if (Array.isArray(books)) {
            filtered = selectedCategory === "Choose a genre"
                ? books
                : books.filter(book => {
                    const bookCategory = book.category ? book.category.trim().toLowerCase() : "";
                    const selectedCategoryTrimmed = selectedCategory.trim().toLowerCase();
                    console.log("Book Title:", book.title, "Book Category:", bookCategory, "Selected Category:", selectedCategoryTrimmed);
                    return bookCategory === selectedCategoryTrimmed;
                });
        } else {
            console.error("Books data is not an array:", books);
        }
        console.log("Filtered Books after filtering:", filtered);
        setFilteredBooks(filtered);
    }, [selectedCategory, data]);

    console.log("Fetched Books:", data.books);
    console.log("Filtered Books:", filteredBooks);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading books: {error.message}</p>;

    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
            <div className="mb-8 flex items-center">
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                    value={selectedCategory}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {Array.isArray(filteredBooks) && filteredBooks.map((book, index) => (
                    <SwiperSlide key={index}>
                        <BookCard book={book} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSellers;
