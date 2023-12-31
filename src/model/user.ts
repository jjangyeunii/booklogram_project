export type AuthUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;

export type DetailUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchResultUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchResultUser & {
  posts: number;
};
