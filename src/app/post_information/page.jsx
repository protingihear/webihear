"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InputInformation() {
    const [form, setForm] = useState({
        source: "",
        uploadDate: "",
        uploadTime: "",
        title: "",
        content: "",
    });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/information", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            const result = await response.json();
            console.log("Data submitted successfully:", result);

            router.push("/");
        } catch (error) {
            console.error("Error submitting data:", error);
        }
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
                                onClick={() => router.push("/")}
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