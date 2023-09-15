import { Dispatch, SetStateAction } from "react";

type Props = {
  toggled: boolean;
  onToggled: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function ToggleButton({
  toggled,
  onToggled,
  onIcon,
  offIcon,
}: Props) {
  return (
    <button onClick={() => onToggled(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}
