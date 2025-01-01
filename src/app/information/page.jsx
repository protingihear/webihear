"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    const [newsData, setNewsData] = useState([]);

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
                            <div key={index} className="bg-white rounded shadow p-4">
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