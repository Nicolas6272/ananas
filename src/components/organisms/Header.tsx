import {
  Avatar,
  AvatarFallbackText,
  Heading,
  View,
} from "@gluestack-ui/themed";
import { Bird } from "lucide-react-native";
import { FC } from "react";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#8B5CF6",
        paddingTop: 50,
        height: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
      }}>
      <Bird size={32} color="white" />
      <Heading fontSize="$lg" color="white" fontWeight="$bold">
        {title}
      </Heading>
      <Avatar size="sm" backgroundColor="#272625">
        <AvatarFallbackText>Jane doe</AvatarFallbackText>
      </Avatar>
    </View>
  );
};

export default Header;
