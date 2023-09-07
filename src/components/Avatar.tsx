type Props = {
  size: string;
  image?: string | null;
};

export default function Avatar({ size, image }: Props) {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className={`${size} rounded-full`}
        src={image ?? undefined}
        alt={`user profile`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
