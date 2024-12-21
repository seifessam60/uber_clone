import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: "Verification failed",
        state: "failed",
      });
    }
  };

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
            Create Your Account Now
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Name"}
            placeholder={"Enter your Name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title={"Sign Up"}
            onPress={onSignUpPress}
            bgVariant={"primary"}
            textVariant={"default"}
            className={"mt-5"}
          />
          <OAuth />
          <Link
            href={"/(auth)/sign-in"}
            className={"text-center text-lg mt-10 text-general-200"}
          >
            <Text>Already have an account? </Text>
            <Text className={"text-primary-500"}>Log in</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
            <Text className={"text-2xl font-JakartaSemiBold mb-2"}>
              Verification
            </Text>
            <Text className={"font-Jakarta mb-5"}>
              We've Sent a Verification Code to
            </Text>
            <InputField
              label={"code"}
              placeholder={"12345"}
              icon={icons.lock}
              value={verification.code}
              keyboardType={"numeric"}
              onChangeText={(code) =>
                setVerification({ ...verification, code: code })
              }
            />
            {verification.error && (
              <Text className={"text-red-500 text-sm mt-1"}>
                {verification.error}
              </Text>
            )}
            <CustomButton
              title={"Verify Email"}
              onPress={onVerifyPress}
              className={"mt-5 bg-success-500"}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
            <Image
              source={images.check}
              className={"w-[110px] h-[110px] mx-auto my-5"}
            />
            <Text className={"text-3xl font-JakartaBold text-center"}>
              Verified
            </Text>
            <Text
              className={
                "text-center font-Jakarta mt-2 text-gray-400 text-base"
              }
            >
              You Have Successfully Verified Your Account
            </Text>
            <CustomButton
              title={"Go To Home"}
              className={"mt-5"}
              onPress={() => {
                router.push("/(root)/(tabs)/home");
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
