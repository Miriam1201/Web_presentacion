import React, { useState } from "react";

export default function FormImagenes() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold mb-4">Publicar creación</h2>
            <input
                type="text"
                placeholder="Introduce un título (obligatorio)"
                maxLength={200}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md border border-gray-700"
            />
            <textarea
                placeholder="Introduce la descripción"
                maxLength={1000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md border border-gray-700"
            ></textarea>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="text-white"
            />
        </div>
    );
}
