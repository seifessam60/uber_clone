import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef } from "react";

export default function Onboarding() {
  const swiperRef = useRef<Swiper>(null);
  return (
    <SafeAreaView className={"flex items-center justify-between bg-white"}>
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className={"flex justify-end items-end w-full p-5"}
      >
        <Text className={"text-black text-md font-JakartaBold"}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        className={"w-[32px] h-[4px] mx-1 bg-[]"}
      ></Swiper>
    </SafeAreaView>
  );
}
