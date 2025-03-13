import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [usernameTaken, setUsernameTaken] = useState("");
  const [fillAllFields, setFillAllFields] = useState("");

  const handleSelectChange = (value: string) => {
    setUniversity(value); // Update the university state with the selected value
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      course,
      university,
    };

    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return; // Prevent form submission
      }
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      setUsernameTaken(error.response?.data?.message || "An error occurred");
      
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <img
          src="public/logo.svg"
          alt="logo"
          width={65}
          height={50}
          className="absolute top-[7.8%] left-[66%] lg:left-[55.5%] lg:top-[7.8%]"
        />

        <h1 className="text_shadow text-[#FFF5E5] text-center relative text-[3rem] font-extrabold pt-[6rem]">
          StudyMate.com
        </h1>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-2 w-[40rem] relative gap-10 pt-[3rem] text-[#FFF5E5]"
        >
          <Input
            type="text"
            placeholder="First Name..."
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name..."
            onChange={(e) => setLastName(e.target.value)}
          />

          {usernameTaken && (
            <span className="absolute left-[2%] top-[25%] text-red-400">
              Username already taken
            </span>
          )}

          <Input
            type="text"
            placeholder="Username..."
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameTaken(""); // Clear error when user starts typing
            }}
          />
          <Input
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />

          {password && confirmPassword && password !== confirmPassword && (
            <span className="absolute right-[12%] top-[45%] text-red-400">
              Passwords do not match
            </span>
          )}

          <Input
            type="password"
            placeholder="Confirm password..."
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Course..."
            onChange={(e) => setCourse(e.target.value)}
          />
          <Select
            name="university"
            value={university}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="w-[20rem] cursor-pointer">
              <SelectValue placeholder="University & College..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>University & College...</SelectLabel>
                <SelectItem value="uwa">
                  The University of Western Australia
                </SelectItem>
                <SelectItem value="curtin">Curtin University</SelectItem>
                <SelectItem value="Murdoch">Murdoch University</SelectItem>
                <SelectItem value="ecu">Edith Cowan University</SelectItem>
                <SelectItem value="stanley">Stanley College</SelectItem>
                <SelectItem value="tafe">TAFE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="col-span-2 justify-self-center box_shadow bg-[#6170A9] hover:bg-slate-600 transition-all duration-300 ease-in-out cursor-pointer w-[10rem] text-[16px]"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
}
