import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-300 p-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/">
                        <a className="text-xl font-bold text-blue-900 flex items-center">
                            <i className="fas fa-ear-listen mr-2"></i> IHear
                        </a>
                    </Link>

                    <div className="flex space-x-4">
                        <Link href="/">
                            <a className="text-blue-900 font-medium">Home</a>
                        </Link>
                        <Link href="/relations">
                            <a className="text-blue-900 font-medium">Relations</a>
                        </Link>
                        <Link href="/lesson">
                            <a className="text-blue-900 font-medium">Lesson</a>
                        </Link>
                    </div>

                    <div className="ml-auto">
                        <Link href="/profile">
                            <a>
                                <img
                                    src="https://via.placeholder.com/40"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                    alt="Profile"
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto py-8">
                <div className="flex justify-end">
                    <Link href="/input-information">
                        <a className="text-gray-500 text-xl">&bull;&bull;&bull;</a>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white rounded shadow p-4">
                        <img
                            src="https://via.placeholder.com/300x150"
                            alt="News"
                            className="rounded w-full h-40 object-cover"
                        />
                        <p className="text-green-600 mt-2 text-sm">detikJatim</p>
                        <p className="text-gray-500 text-sm">Senin, 11 Nov 2024 19.30 WIB</p>
                        <h4 className="font-bold mt-2">Telkomsel Hadirkan Layanan Untuk Teman Tuli di GraPARI</h4>
                        <div className="relative mt-2">
                            <button className="text-gray-500">&bull;&bull;&bull;</button>
                            <ul className="absolute hidden group-hover:block bg-white shadow rounded">
                                <li>
                                    <Link href="/edit-information">
                                        <a className="block px-4 py-2 hover:bg-gray-100">Edit</a>
                                    </Link>
                                </li>
                                <li>
                                    <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function InputInformation() {
    const [form, setForm] = useState({
        source: '',
        uploadDate: '',
        uploadTime: '',
        title: '',
        content: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const newsData = JSON.parse(localStorage.getItem('newsData')) || [];
        newsData.push(form);
        localStorage.setItem('newsData', JSON.stringify(newsData));
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-8">
                <h2 className="text-xl font-bold mb-4">Tambah Berita</h2>
                <div className="bg-white p-4 shadow rounded">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="source" className="block font-medium mb-2">
                                Sumber
                            </label>
                            <input
                                type="text"
                                id="source"
                                name="source"
                                className="border rounded w-full p-2"
                                placeholder="Masukkan sumber"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="uploadDate" className="block font-medium mb-2">
                                Tanggal Upload
                            </label>
                            <input
                                type="date"
                                id="uploadDate"
                                name="uploadDate"
                                className="border rounded w-full p-2"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="uploadTime" className="block font-medium mb-2">
                                Waktu Upload
                            </label>
                            <input
                                type="time"
                                id="uploadTime"
                                name="uploadTime"
                                className="border rounded w-full p-2"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="title" className="block font-medium mb-2">
                                Judul
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="border rounded w-full p-2"
                                placeholder="Masukkan judul"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="content" className="block font-medium mb-2">
                                Isi
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                className="border rounded w-full p-2"
                                rows="4"
                                placeholder="Masukkan isi berita"
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                                onClick={() => router.push('/')}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={handleSubmit}
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
