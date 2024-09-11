import { View } from "react-native";
import React from "react";

import PestSubInfoCard from "./PestSubInfoCard";

export default function PetsSubInfo({ pets }) {
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <PestSubInfoCard
          icon={require("./../../assets/images/calendar.png")}
          title={"Age"}
          value={pets?.age + " years"}
        />
        <PestSubInfoCard
          icon={require("./../../assets/images/bone.png")}
          title={"Breed"}
          value={pets?.breed}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <PestSubInfoCard
          icon={require("./../../assets/images/sex.png")}
          title={"Sex"}
          value={pets?.sex}
        />
        <PestSubInfoCard
          icon={require("./../../assets/images/weight.png")}
          title={"Weight"}
          value={pets?.weight + "Kg"}
        />
      </View>
    </View>
  );
}
