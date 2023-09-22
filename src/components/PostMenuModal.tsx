type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function PostMenuModal({ onClose, children }: Props) {
  return (
    <section
      className={`fixed top-0 left-0 w-full h-full z-50`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </section>
  );
}
