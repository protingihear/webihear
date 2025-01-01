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
    const [image, setImage] = useState(null); // State untuk menyimpan file gambar
    const [preview, setPreview] = useState(""); // State untuk preview gambar
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Membuat URL preview
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            // Tambahkan data form
            for (const key in form) {
                formData.append(key, form[key]);
            }

            // Tambahkan file gambar jika ada
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch("http://localhost:8000/api/information", {
                method: "POST",
                body: formData, // Tidak perlu header Content-Type, FormData akan menanganinya
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            const result = await response.json();
            console.log("Data submitted successfully:", result);

            router.push("/information");
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

                        <div className="mb-4">
                            <label htmlFor="image" className="block font-medium mb-2">
                                Gambar
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="border rounded w-full p-2"
                                onChange={handleImageChange}
                            />
                            {preview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-64 h-64 object-cover border border-gray-300"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                                onClick={() => router.push("/information")}
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