import { FullPost, Simplepost } from "@/model/post";
import useSWR from "swr";

type Props = {
  post: Simplepost;
};

export default function PostDetail({ post }: Props) {
  const {
    id,
    username,
    userImage,
    booktitle,
    bookshort,
    image,
    likes,
    createdAt,
  } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  const bookauthor = data?.bookauthor;
  const bookreview = data?.bookreview;

  return <div></div>;
}
