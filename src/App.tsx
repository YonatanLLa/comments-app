import { useEffect } from "react";
import { useCommentsStore } from "./store/CommentsContext";
import type { CommentTypeWithImage } from "./models/Comment";
import PostComents from "./components/postComents";

function App() {
  const { data, fetchData } = useCommentsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="max-w-4xl p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-zinc-400 pt-6">
        Lista de Comentarios
      </h1>
      <div className="p-6 lg:grid lg:grid-cols-2 gap-6 flex flex-col-reverse">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Comentarios
          </h2>
          <ul className="space-y-4">
            {data.map((comentario: CommentTypeWithImage) => (
              <li
                key={comentario.id}
                className="flex items-start gap-4 bg-[#404040] shadow-md rounded-lg p-4 border border-[#545454] hover:border-[#404040] transition duration-300 ease-in-out"
              >
                <img
                  src={comentario.image}
                  alt={comentario.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">
                    {comentario.name}
                  </h2>
                  <p className="text-sm text-gray-300 mb-2">
                    {comentario.email}
                  </p>
                  <p className="text-white">{comentario.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Crear nuevo post
          </h2>
          <PostComents />
        </div>
      </div>
    </div>
  );
}

export default App;
