import { Comment, Simplepost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostprojection = `
    "id":_id,
    booktitle,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "bookshort": comments[0].comment,
    "likes": likes[]->username,
    "comments": count(comments),
    "createdAt": _createdAt,
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "bookpost" && author->username == "${username}"
    || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostprojection}}`
    )
    .then((posts) =>
      posts.map((post: Simplepost) => ({
        ...post,
        likes: post.likes ?? [],
        image: urlFor(post.image),
      }))
    );
}

export async function getPostById(id: string) {
  return client
    .fetch(
      `*[_type == "bookpost" && _id == "${id}"][0]{
      "id":_id,
      booktitle,
      bookauthor,
      bookreview,
      "bookshort": comments[0].comment,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{comment, "username": author->username, "image": author->image},
      "createdAt":_createdAt,
    }`
    )
    .then((post) => ({
      ...post,
      image: urlFor(post.image),
    }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "bookpost" && author->username == "${username}"] | order(_createdAt desc){${simplePostprojection}}`
    )
    .then((posts) =>
      posts.map((post: Simplepost) => ({
        ...post,
        likes: post.likes ?? [],
        image: urlFor(post.image),
      }))
    );
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "bookpost" && "${username}" in likes[]->username] | order(_createdAt desc){${simplePostprojection}}`
    )
    .then((posts) =>
      posts.map((post: Simplepost) => ({
        ...post,
        likes: post.likes ?? [],
        image: urlFor(post.image),
      }))
    );
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "bookpost" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref] | order(_createdAt desc){${simplePostprojection}}`
    )
    .then((posts) =>
      posts.map((post: Simplepost) => ({
        ...post,
        likes: post.likes ?? [],
        image: urlFor(post.image),
      }))
    );
}

export async function likePost(postID: string, userID: string) {
  return client
    .patch(postID)
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userID,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postID: string, userID: string) {
  return client
    .patch(postID)
    .unset([`likes[_ref=="${userID}"]`])
    .commit();
}

export async function addComment(
  postID: string,
  userID: string,
  comment: Comment
) {
  return client
    .patch(postID)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: {
          _ref: userID,
          _type: "reference",
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
