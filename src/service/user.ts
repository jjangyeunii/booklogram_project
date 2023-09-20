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
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
    "id":_id,
    username,
    name,
    email,
    image,
    following[]->{username,image},
    followers[]->{username,image},
    "bookmarks":bookmarks[]->_id
  }`
  );
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

export async function addBookmark(userID: string, postID: string) {
  return client
    .patch(userID)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postID,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userID: string, postID: string) {
  return client
    .patch(userID)
    .unset([`bookmarks[_ref=="${postID}"]`])
    .commit();
}

export async function follow(userID: string, targetID: string) {
  return client //
    .transaction()
    .patch(userID, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetID, _type: "reference" }])
    )
    .patch(targetID, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: userID, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unFollow(userID: string, targetID: string) {
  return client //
    .transaction()
    .patch(userID, (user) => user.unset([`following[_ref=="${targetID}"]`]))
    .patch(targetID, (user) => user.unset([`followers[_ref=="${userID}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
