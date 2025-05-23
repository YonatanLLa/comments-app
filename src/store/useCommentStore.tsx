import { create } from "zustand";
import type { CommentType, CommentTypeWithImage } from "../models/Comment.ts";
import { images } from "../utils/images.ts";

interface CommentsState {
  data: CommentTypeWithImage[];
  fetchData: () => Promise<void>;
  createPost: (post: {
    title: string;
    body: string;
    email: string;
  }) => Promise<void>;
}

export const useCommentsStore = create<CommentsState>((set) => ({
  data: [],

  fetchData: async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=10"
      );
      const data: CommentType[] = await response.json();
      const dataWithImage: CommentTypeWithImage[] = data.map(
        (comment, index) => ({
          ...comment,
          image: images[index % images.length],
        })
      );
      set({ data: dataWithImage });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },

  createPost: async (post) => {
    try {
      const userId = Math.floor(Math.random() * 1000) + 1;
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            userId,
            title: post.title,
            body: post.body,
            email: post.email,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await response.json();
      console.log("Post creado:", json);

      const nuevoComentario: CommentTypeWithImage = {
        postId: json.userId,
        id: json.id || Date.now(),
        name: post.title,
        email: post.email,
        body: post.body,
        image: images[Math.floor(Math.random() * images.length)],
      };

      set((state) => ({ data: [nuevoComentario, ...state.data] }));
    } catch (error) {
      console.error("Error creando post:", error);
    }
  },
}));
