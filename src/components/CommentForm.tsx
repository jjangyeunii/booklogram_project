import React, { FormEvent, useState } from "react";
import { BiSmile } from "react-icons/bi";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form
      className="w-full flex items-center justify-between px-2 border-t border-neutral-400"
      onClick={handleSubmit}
    >
      <BiSmile size={35} />
      <input
        className="w-full p-3 mx-2 text-lg border-none outline-none"
        type="text"
        placeholder="Add a bookcomment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold text-lg ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        Post
      </button>
    </form>
  );
}
