import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSigninPress = async () => {};
  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white"}>
        <View className={"w-full h-[250px] relative"}>
          <Image source={images.signUpCar} className={"z-0 w-full h-[250px]"} />
          <Text
            className={
              "text-2xl absolute bottom-5 left-5 font-JakartaSemiBold text-black"
            }
          >
            Welcome Back 👋
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Email"}
            placeholder={"Enter your Email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your Password"}
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title={"Sign In"}
            onPress={onSigninPress}
            bgVariant={"primary"}
            textVariant={"default"}
            className={"mt-5"}
          />
          <OAuth />
          <Link
            href={"/(auth)/sign-up"}
            className={"text-center text-lg mt-10 text-general-200"}
          >
            <Text>Don't have an account? </Text>
            <Text className={"text-primary-500"}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
