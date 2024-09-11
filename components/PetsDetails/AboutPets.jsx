import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "./../../constants/Colors";

export default function AboutPets({ pets }) {
  const [readMore, setReadMore] = useState(true);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={{ fontFamily: "outfit_medium", fontSize: 18 }}>
        About {pets?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : undefined}
        style={{ fontFamily: "outfit", fontSize: 14 }}
      >
        {pets?.about}
      </Text>
      <TouchableOpacity onPress={handleReadMore}>
        <Text
          style={{
            fontFamily: "outfit_medium",
            fontSize: 14,
            color: Colors.SECONDARY,
          }}
        >
          {readMore ? "Read More" : "Show Less"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
