import dynamic from "next/dynamic";

const BarLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.BarLoader),
  {
    ssr: false,
  }
);
type Props = {
  color?: string;
};

export default function BarSpinner({ color = "gray" }: Props) {
  return <BarLoader color={color} />;
}
