import React, { useState } from "react";

export default function FormVideos() {
    const [videoUrl, setVideoUrl] = useState("");

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold mb-4">Publicar video</h2>
            <input
                type="text"
                placeholder="Inserta un enlace de video de YouTube o TikTok"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md border border-gray-700"
            />
        </div>
    );
}
