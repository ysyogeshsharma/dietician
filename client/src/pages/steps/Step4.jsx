import { useState } from "react";
import { Slide } from "react-awesome-reveal";

function Step4({ handleChange }) {
  const [formData, setFormData] = useState({
    injuries: "",
    allergies: "",
    fitnessGoal: "",
    gymDaysPerWeek: "",
    workoutTime: "",
    supplements: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleChange(e); // Pass the event up to the parent component
  };

  return (
    <Slide>
      <div className=" min-w-fit rounded-lg bg-slate-200/50 px-10 py-10 backdrop-blur-sm">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Other Details
        </h2>
        <div className="mt-8 sm:w-[500px]">
          <div className="flex flex-wrap justify-center">
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Do you have any injuries?"
                name="injuries"
                value={formData.injuries}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Do you have any allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Fitness goal?"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="How many days gym per week?"
                name="gymDaysPerWeek"
                value={formData.gymDays}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="When do you workout?"
                name="workoutTime"
                value={formData.workoutTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full p-1.5 sm:w-1/2">
              <input
                className="h-10 w-full rounded-md border-gray-300 bg-slate-200 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                type="text"
                placeholder="Supplements you use or used"
                name="supplements"
                value={formData.supplements}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default Step4;
