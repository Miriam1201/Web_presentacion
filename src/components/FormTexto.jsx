import React, { useState } from "react";

export default function FormTexto() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold mb-4">Publicar mensaje</h2>
            <input
                type="text"
                placeholder="Introduce un título (obligatorio)"
                maxLength={200}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md border border-gray-700"
            />
            <textarea
                placeholder="Introduce el texto"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md border border-gray-700"
            ></textarea>
        </div>
    );
}
