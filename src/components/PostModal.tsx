import { CgCloseO } from "react-icons/cg";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-9 right-9 text-neutral-300 hover:text-white"
        onClick={() => onClose()}
      >
        <CgCloseO size={35} />
      </button>
      <div className="bg-white w-4/5 h-5/6 max-w-7xl">{children}</div>
    </section>
  );
}
