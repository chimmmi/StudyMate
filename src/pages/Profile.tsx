import HomeLayout from "@/components/HomeLayout";
import HomeLogo from "@/components/HomeLogo";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";

import api from "@/utils/axiosInstance";
import Cookies from "js-cookie";

interface UserBannerProps {
  children: ReactNode;
}

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserData = async () => {
    try {
      console.log(Cookies.get("refreshToken"));
      const response = await api.get("/auth/me");
      console.log(response.data);
      const { firstName, lastName, username, university, course } =
        response.data;

      setFirstName(firstName);
      setLastName(lastName);
      setUsername(username);
      setUniversity(university);
      setCourse(course);
      setLoading(false);

      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <HomeLayout>
      <HomeLogo />
      <div className="flex flex-col items-center mt-10">
        <UserBanner>
          <UserPicture />
          <UserInfo
            firstName={firstName}
            lastName={lastName}
            username={username}
            university={university}
            course={course}
          />
          <Button className="absolute left-[45rem] top-[11rem] cursor-pointer">
            Edit Profile
          </Button>
        </UserBanner>
      </div>
    </HomeLayout>
  );
};

const UserBanner = ({ children }: UserBannerProps) => {
  return (
    <div className="relative w-full max-w-4xl max-h-4xl">
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
        <img
          src="/banner.jpg"
          alt="User banner"
          className="w-full h-[15rem] rounded-lg box_shadow opacity-60 object-cover"
        />
      </div>
      <div className="absolute inset-0 flex gap-12 items-center pl-10">
        {children}
      </div>
    </div>
  );
};

const UserPicture = () => {
  return (
    <img
      src="https://github.com/shadcn.png"
      alt="User avatar"
      className="w-28 h-28 rounded-full shadow-lg border-4 border-white"
    />
  );
};

const UserInfo = ({
  firstName,
  lastName,
  username,
  university,
  course,
}: {
  firstName: string;
  lastName: string;
  username: string;
  university: string;
  course: string;
}) => {
  return (
    <div className="mt-4 text-center text-white">
      <h1 className="text-2xl font-bold">
        {firstName} {lastName}
      </h1>
      <p className="text-gray-300">{username}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{university}</h3>
        <p className="text-gray-200 bg-[#673b45] box_shadow rounded-sm font-">
          {course}
        </p>
      </div>
    </div>
  );
};

export default Profile;
