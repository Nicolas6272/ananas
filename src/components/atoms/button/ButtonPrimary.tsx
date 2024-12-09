import { Button, ButtonText } from "@gluestack-ui/themed";
import React, { type FC } from "react";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <Button className={className} onPress={onClick}>
      <ButtonText className="text-white">{children}</ButtonText>
    </Button>
  );
};

export default ButtonPrimary;
