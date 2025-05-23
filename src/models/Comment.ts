interface CommentType {
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}
interface CommentTypeWithImage extends CommentType {
  image: string;
}

export type { CommentType, CommentTypeWithImage };
