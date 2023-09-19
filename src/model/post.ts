export type Comment = {
  comment: string;
  username: string;
  image: string | undefined;
};

export type Simplepost = Omit<
  FullPost,
  "bookauthor" | "bookreview" | "comments"
> & { comments: number };

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  booktitle: string;
  bookauthor: string;
  bookreview: string;
  bookshort: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};
