import React, { useState } from "react";

// Definimos el tipo Post
type Post = {
  id: number;
  username: string;
  email: string;
  profile_image: string;
  date: string;
  game: string;
  content: string;
  images: File[];
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
};

export default function CommunitySidebar() {
  const [activeForm, setActiveForm] = useState("text");
  const [newPost, setNewPost] = useState({
    username: "",
    email: "",
    profile_image: null as File | null,
    date: new Date().toLocaleDateString(),
    game: "Genshin Impact",
    content: "",
    images: [] as File[],
    tags: "",
    likes: 0,
    comments: 0,
    shares: 0,
  });

  // Función para manejar los cambios de archivo
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPost({ ...newPost, images: Array.from(e.target.files) });
    }
  };

  // Función para manejar el avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPost({ ...newPost, profile_image: e.target.files[0] });
    }
  };

  // Función para crear una publicación
  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("username", newPost.username);
      formData.append("email", newPost.email);
      formData.append("content", newPost.content);
      formData.append("game", newPost.game);
      formData.append("tags", JSON.stringify(newPost.tags.split(",").map((tag) => tag.trim())));

      // Agregar avatar si existe
      if (newPost.profile_image) {
        formData.append("profile_image", newPost.profile_image);
      }

      // Agregar imágenes si existen
      newPost.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Publicación creada exitosamente");
        setNewPost({
          username: "",
          email: "",
          profile_image: null,
          date: new Date().toLocaleDateString(),
          game: "Genshin Impact",
          content: "",
          images: [],
          tags: "",
          likes: 0,
          comments: 0,
          shares: 0,
        });
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        alert("Hubo un problema al crear la publicación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <aside className="bg-gray-100 p-6 rounded-lg shadow-md space-y-6 w-80">
      <div className="space-y-3">
        {/* Botones de tipo de publicación */}
        <button
          onClick={() => setActiveForm("text")}
          className={`w-full p-3 rounded-lg ${
            activeForm === "text" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
          } hover:bg-blue-700 hover:text-white transition-all`}
        >
          Texto
        </button>
        <button
          onClick={() => setActiveForm("images")}
          className={`w-full p-3 rounded-lg ${
            activeForm === "images" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
          } hover:bg-blue-700 hover:text-white transition-all`}
        >
          Imágenes
        </button>
        <button
          onClick={() => setActiveForm("video")}
          className={`w-full p-3 rounded-lg ${
            activeForm === "video" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
          } hover:bg-blue-700 hover:text-white transition-all`}
        >
          Videos
        </button>
      </div>

      <div className="bg-gray-300 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Publicar {activeForm === "text" ? "mensaje" : activeForm === "images" ? "creación" : "video"}
        </h3>

        {/* Formulario Común */}
        <input
          type="text"
          value={newPost.username}
          onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
          placeholder="Introduce tu nombre de usuario (obligatorio)"
          className="w-full p-2 mb-3 border rounded-lg"
        />
        <input
          type="email"
          value={newPost.email}
          onChange={(e) => setNewPost({ ...newPost, email: e.target.value })}
          placeholder="Introduce tu correo electrónico (obligatorio)"
          className="w-full p-2 mb-3 border rounded-lg"
        />
        {/* Avatar */}
        <h3 className="text-lg font-bold mb-2 text-gray-700">Avatar</h3>
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full mb-3" />

        {activeForm === "text" && (
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Introduce el contenido del post"
            className="w-full p-2 mb-3 border rounded-lg"
          />
        )}
        {activeForm === "images" && (
          <>
            <h3 className="text-lg font-bold mb-2 text-gray-700">Imágenes</h3>
            <input
              type="text"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Introduce la descripción"
              className="w-full p-2 mb-3 border rounded-lg"
            />
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full mb-3" />
          </>
        )}
        {activeForm === "video" && (
          <>
            <h3 className="text-lg font-bold mb-2 text-gray-700">Videos</h3>
            <input
              type="text"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Introduce la descripción"
              className="w-full p-2 mb-3 border rounded-lg"
            />
            <input
              type="url"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Introduce el enlace del video (YouTube o TikTok)"
              className="w-full p-2 mb-3 border rounded-lg"
            />
          </>
        )}
        {/* Tags */}
        <input
          type="text"
          value={newPost.tags}
          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
          placeholder="Introduce tags (opcional, separado por comas)"
          className="w-full p-2 mb-3 border rounded-lg"
        />

        {/* Botón para Publicar */}
        <button
          onClick={createPost}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Publicar
        </button>
      </div>
    </aside>
  );
}
