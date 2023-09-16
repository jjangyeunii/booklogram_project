import { client } from "./sanity";

type OAuthUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  image?: string | null;
};

export async function addUser({ id, username, name, email, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    name,
    email,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(`*[_type == "user" && username == "${username}"][0]{
    "id":_id,
    username,
    name,
    email,
    image,
    following[]->{username,image},
    followers[]->{username,image},
    "bookmarks":bookmarks[]->id
  }`);
}

export async function searchUsers(keyword?: string) {
  const keywordQuery = keyword
    ? `&& (name match "${keyword}*") || (username match "${keyword}*")`
    : "";
  return client.fetch(`*[_type == "user" ${keywordQuery}]{
    ...,
    "following": count(following),
    "followers": count(followers),
  }`);
}

export async function getUserProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      username,
      name,
      image,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "bookpost" && author->username == "${username}"])
    }`
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}
