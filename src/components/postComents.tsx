import React, { useState } from "react";
import { useCommentsStore } from "../store/useCommentStore";

function PostComents() {
  const { createPost } = useCommentsStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    body: "",
    email: "",
  });

  const validateTitle = (value: string) => {
    if (!value.trim()) return "El nombre del usuario es obligatorio";
    return "";
  };

  const validateBody = (value: string) => {
    if (!value.trim()) return "El cuerpo es obligatorio";
    return "";
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "El correo electronico es obligatorio";
    if (!emailRegex.test(value)) return "Correo electronico inválido";
    return "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBody(value);
    setErrors((prev) => ({ ...prev, body: validateBody(value) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = validateTitle(title);
    const bodyError = validateBody(body);
    const emailError = validateEmail(email);

    setErrors({ title: titleError, body: bodyError, email: emailError });

    if (titleError || bodyError || emailError) return;

    createPost({ title, body, email });

    setTitle("");
    setBody("");
    setEmail("");
    setErrors({ title: "", body: "", email: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded-md shadow-md bg-[#404040] border-[#545454] hover:border-[#404040] transition duration-300 ease-in-out"
    >
      <label className="block mb-4">
        Nombre del autor:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full border px-2 py-1 rounded"
          placeholder="Título"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </label>

      <label className="block mb-4">
        Correo electrónico:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full border px-2 py-1 rounded"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </label>

      <label className="block mb-4">
        Cuerpo:
        <textarea
          value={body}
          onChange={handleBodyChange}
          className="w-full border px-2 py-1 rounded"
          placeholder="Contenido del post"
          rows={4}
        />
        {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
      </label>

      <button
        type="submit"
        className="bg-[#4f4f4f] border-[#5e5d5d] hover:bg-[#676767] transition duration-300 ease-in-out p-4 rounded-md text-white font-semibold w-full cursor-pointer"
      >
        Crear Comentario
      </button>
    </form>
  );
}

export default PostComents;
