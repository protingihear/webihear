"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    const [newsData, setNewsData] = useState([]);
    const [menuVisible, setMenuVisible] = useState({});

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/information');
                if (!response.ok) {
                    throw new Error('Failed to fetch news data');
                }

                const data = await response.json();
                setNewsData(data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNewsData();
    }, []);


    const toggleMenu = (index) => {
        setMenuVisible((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleEdit = (id) => {
        console.log(`Edit item with ID: ${id}`);
        // Tambahkan logika untuk navigasi atau fungsi edit
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/information/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete news");
            }

            setNewsData((prev) => prev.filter((news) => news.id !== id));
            console.log(`Deleted item with ID: ${id}`);
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-300 p-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-blue-900 flex items-center">
                        <i className="fas fa-ear-listen mr-2"></i> IHear
                    </Link>

                    <div className="flex space-x-4">
                        <Link href="/" className="text-blue-900 font-medium">Home</Link>
                        <Link href="/relations" className="text-blue-900 font-medium">Relations</Link>
                        <Link href="/lesson" className="text-blue-900 font-medium">Lesson</Link>
                    </div>

                    <div className="ml-auto">
                        <Link href="/profile">
                            <img
                                src="https://via.placeholder.com/40"
                                className="w-10 h-10 rounded-full border-2 border-white"
                                alt="Profile"
                            />
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto py-8">
                <div className="flex justify-end">
                    <Link href="/post_information" className="text-gray-500 text-xl">&bull;&bull;&bull;</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {newsData.length > 0 ? (
                        newsData.map((news, index) => (
                            <div key={index} className="relative bg-white rounded shadow p-4">
                                <img
                                    src={news.image ? `http://localhost:8000/storage/${news.image}` : "https://via.placeholder.com/300x150"}
                                    // alt="News"
                                    className="rounded w-full h-40 object-cover"
                                />
                                <p className="text-green-600 mt-2 text-sm">{news.source}</p>
                                <p className="text-gray-500 text-sm">
                                    {news.uploadDate} {news.uploadTime}
                                </p>
                                <h4 className="font-bold mt-2">{news.title}</h4>
                                <p className="text-gray-600 mt-2">{news.content}</p>

                                {/* Button titik */}
                                <button
                                    className="absolute top-2 right-2 text-gray-400 text-xl"
                                    onClick={() => toggleMenu(index)}
                                >
                                    &bull;&bull;&bull;
                                </button>

                                {/* Dropdown menu */}
                                {menuVisible[index] && (
                                    <div className="absolute top-8 right-2 bg-white border rounded shadow-md z-10">
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                                            onClick={() => handleEdit(news.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            onClick={() => handleDelete(news.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-3">Tidak ada data berita.</p>
                    )}
                </div>
            </main>
        </div>
    );
}