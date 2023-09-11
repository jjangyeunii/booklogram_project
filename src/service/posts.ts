import { Simplepost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostprojection = `
    "id":_id,
    "bookshort": bookshort,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "bookshort": comments[0].comment,
    "likes": likes[]->username,
    "comments": count(comments),
    "createdAt":_createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "bookpost" && author->username == "${username}"
    || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostprojection}}`
    )
    .then((posts) =>
      posts.map((post: Simplepost) => ({ ...post, image: urlFor(post.image) }))
    );
}
