import React, { useState, useEffect } from "react";

export default function CommunityPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/posts", {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    // Asegúrate de decodificar las imágenes correctamente aquí
                    const updatedPosts = data.map(post => {
                        let imagesArray = [];
                        if (post.images && typeof post.images === "string") {
                            try {
                                // Intentar parsear las imágenes en un array JSON
                                imagesArray = JSON.parse(post.images);
                                // Reemplazar cualquier barra invertida por barras normales
                                imagesArray = imagesArray.map(image => image.replace(/\\/g, '/'));
                            } catch (error) {
                                console.error("Error al parsear las imágenes:", error);
                            }
                        }
                        return {
                            ...post,
                            images: imagesArray,
                        };
                    });
                    setPosts(updatedPosts);
                } else {
                    console.error("Error al obtener las publicaciones");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchPosts();
    }, []);

    if (!posts.length) {
        return <p>No hay publicaciones disponibles.</p>;
    }

    return (
        <>
            {posts.map((post, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-8">
                    {/* Encabezado del Post */}
                    <div className="flex items-center mb-4">
                        <img
                            src={post.profile_image.startsWith('/images/')
                                ? post.profile_image
                                : `http://127.0.0.1:8000${post.profile_image}`}
                            alt={`${post.username} avatar`}
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                            <h3 className="font-bold text-lg">{post.username}</h3>
                            <p className="text-gray-500">{post.date} - {post.game}</p>
                            <p className="text-gray-500">{post.email}</p>
                        </div>
                    </div>

                    {/* Contenido del Post */}
                    <p className="text-gray-800 mb-4">{post.content}</p>

                    {/* Imágenes del Post */}
                    {post.images && post.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {post.images.map((img, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={img.startsWith("/storage/") || img.startsWith("/images/")
                                        ? `http://127.0.0.1:8000${img}`
                                        : img}
                                    alt={`Imagen ${imgIndex + 1}`}
                                    className="rounded-lg"
                                />
                            ))}
                        </div>
                    )}

                    {/* Imágenes Comunitarias (Estáticas) */}
                    {post.community_images && post.community_images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {post.community_images.map((img, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={img}
                                    alt={`Community Imagen ${imgIndex + 1}`}
                                    className="rounded-lg"
                                />
                            ))}
                        </div>
                    )}

                    {/* Tags del Post */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mb-4">
                            {post.tags.map((tag, tagIndex) => (
                                <span
                                    key={tagIndex}
                                    className="inline-block bg-blue-500 text-white py-1 px-3 rounded-full text-xs mr-2"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Acciones del Post */}
                    <div className="flex items-center space-x-6 text-gray-600 text-sm">
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                            <span>👍</span>
                            <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                            <span>💬</span>
                            <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                            <span>🔄</span>
                            <span>{post.shares}</span>
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
