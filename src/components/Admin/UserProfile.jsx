import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Button from "./Button";
import { MdOutlineCancel } from "react-icons/md";
import avatar from "./data/avatar2.jpg";

function UserProfile() {
  const { currentColor, userInfo } = useStateContext();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 drop-shadow-xl">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Profil Użytkownika
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(150,170,180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          src={avatar}
          className="rounded-full h-24 w-24"
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {userInfo.name} {userInfo.lastname}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Administrator
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {userInfo && userInfo.email}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Wyloguj się"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
}

export default UserProfile;
