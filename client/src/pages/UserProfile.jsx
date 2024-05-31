import { Link } from "react-router-dom";
import IMAGES from "../assets";
import UserProgress from "./UserProgress";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
//import { useEffect } from "react";
//import { useState } from "react";

const UserProfile = () => {

  const token = localStorage.getItem("dietToken");
  const decode = jwtDecode(token);

  const { firstName, lastName, email, phoneNumber, age, weight, height, gender, fitnessGoal, occupation, gymDaysPerWeek, } = decode.userData;

  useEffect(()=> {
    async function getProfileData() {
      console.log("inside getprofiledata in userprofile", email)
      const response = await fetch("http://localhost:3333/users/getProfilePic", {
        method : "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
    }
    getProfileData();
  }, []);

  return (
    <div className="dark">
      <main className="relative flex w-full flex-col  gap-4 bg-gray-100 p-5 dark:bg-slate-900 lg:flex-row">
        <section className="left-0 top-20 h-fit w-full rounded-lg bg-white p-8 shadow-lg dark:bg-slate-950 lg:sticky lg:max-w-sm">
          <div className="mb-8">
            <h2 className="text-xl dark:text-slate-300">Profile</h2>
          </div>
          <div className="w-full ">
            {/* <div className="relative">
              <img
                src={IMAGES.image1}
                className="mx-auto max-h-32 max-w-32 rounded-full"
                alt=""
              />
              <input
                type="file"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div> */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <img
                  src={IMAGES.image1}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover cursor-pointer"
                  onClick={() => document.getElementById('fileInput').click()}
                />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                //onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="mb-4 mt-8 flex flex-col gap-2 px-4 font-medium dark:text-slate-200">
              <span className="w-fit">{firstName} {lastName}</span>
              <span className="w-fit">{email}</span>
              <span className="w-fit">{phoneNumber}</span>
              <Link className="text-lime-500">Edit</Link>
            </div>
          </div>
        </section>

        <section>
          <section className="w-full rounded-lg bg-white p-8 shadow-lg dark:bg-slate-950">
            <div className="mb-8">
              <h2 className="text-xl dark:text-slate-300">Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 dark:text-slate-200 md:grid-cols-3">
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Height
                </h4>
                <p>{height} cm</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Weight
                </h4>
                <p>{weight} kg</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">Age</h4>
                <p>{age}</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Gender
                </h4>
                <p>{gender}</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Fitness Goal
                </h4>
                <p>{fitnessGoal}</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Occupation
                </h4>
                <p>{occupation}</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Sleeping Time
                </h4>
                <p>10:00pm to 06:00am</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Timing of Workout
                </h4>
                <p>05:00pm to 06:00pm</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  No. of days in week
                </h4>
                <p>{gymDaysPerWeek}</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Any Medical Condition
                </h4>
                <p>No</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Any Injuries
                </h4>
                <p>No</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Vegetarian or Non Veg
                </h4>
                <p>Non Veg</p>
              </div>
            </div>
            <div className="my-8">
              <h2 className="text-xl dark:text-slate-300">Membership</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 dark:text-slate-200 md:grid-cols-2">
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Status
                </h4>
                <p>Active</p>
              </div>
              <div className="rounded-md bg-gray-100 px-8 py-4 shadow dark:bg-slate-900">
                <h4 className="text-sm text-slate-700 dark:text-slate-500">
                  Expires on
                </h4>
                <p>4th July, 2024</p>
              </div>
            </div>
          </section>

          <section>
            <UserProgress />
          </section>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
