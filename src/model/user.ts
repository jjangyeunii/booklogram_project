export type AuthUser = {
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

export type ProfileUser = {
  username: string;
  name: string;
  image?: string;
  following: number;
  followers: number;
};
