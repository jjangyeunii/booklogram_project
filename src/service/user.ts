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
    ...,
    "id":_id,
    following[]->{username,image},
    followers[]->{username,image},
    "bookmarks":bookmarks[]->id
  }`);
}

export async function searchUsers(keyword?: string) {
  const keywordQuery = keyword
    ? `&& (name match "*${keyword}*") || (username match "*${keyword}*")`
    : "";
  return client.fetch(`*[_type == "user" ${keywordQuery}]{
    "username": username,
    "name": name,
    "image": image,
    "following": count(following),
    "followers": count(followers),
  }`);
}
