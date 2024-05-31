import {useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Meal from './Meal';


const ImageComponent = ({ gifData }) => {
    // Assuming gifData is the base64 encoded GIF image data
    
    const createBase64String = (gifData) => {
        let binary = '';
        const bytes = new Uint8Array(gifData);
        const length = bytes.byteLength;
      
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
      
        return btoa(binary);
      };
      const base64String = createBase64String(gifData);
  
    return (
      <div>
        {gifData && (
          <img
            src={`data:image/png;base64,${base64String}`}
            className="rounded-lg object-cover h-full"
            alt="GIF Image"
          />
        )}
      </div>
    );
  };


const SingleUser = () => {
    

    let location = useLocation();
    const [totalMeals, setTotalMeals] = useState([]);
    const [recommendedMeal, setrecommendedMeal] = useState([]);
    const [progressImage, setProgressImages] = useState([]);

    console.log("location is",location)

    console.log("total meal is", totalMeals);
    console.log("Now updated recommended meal is", recommendedMeal);

    async function handleRecommendedDiet(){
        const response = await fetch("https://dietician-backend-iryh.onrender.com/users/addUserDiet",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email:location.state.userData.email,
            diet:recommendedMeal
          }) 
        })
        const jsonResponse = await response.json();
        if(jsonResponse.success){
            toast.success(jsonResponse.message);
        }else{
            toast.error("Got some error");
        }
    }

    function addIngredients(mealIndex, newIngredientObject) {
        console.log("addIngredients function is called and new recommendedMeal is", recommendedMeal);
        let newArr = [...recommendedMeal];
        newArr[mealIndex].ingredients.push(newIngredientObject);
        setrecommendedMeal(newArr);
    }

    function updateIngredientsData(mealIndex, ingredientIndex, newIngredientObject) {
        let newArr = [...recommendedMeal];
        newArr[mealIndex].ingredients[ingredientIndex] = newIngredientObject;
        setrecommendedMeal(newArr);

    }


    //const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        const selectedMeal = totalMeals.filter((meal) => meal.meal_name === e.target.value)

        setrecommendedMeal(recommendedMeal.concat(selectedMeal));
        console.log("recommended meals are", recommendedMeal);
    };

    const height = location.state.userData.height / 100
    const bmi = Math.round(location.state.userData.weight / (height * height))

    useEffect(() => {
        const fetchMealData = async () => {
            console.log("Diet type in single user is", location.state.userData.dietType)
            const response = await fetch(`http://localhost:3333/diet/getMeal?meal_type=${location.state.userData.dietType}`)
            const jsonResponse = await response.json();
            console.log("total meals are", jsonResponse);
            setTotalMeals(jsonResponse.data);
        }
        fetchMealData();
    }, [location.state.userData])

    useEffect(()=>{
        async function fetchImage(){
            try {
                const res = await fetch("http://localhost:3333/users/getUsersPic", {
                  method: "POST",
                  body: JSON.stringify({email: location.state.userData.email})
                });
          
                const resJson = await res.json();
                console.log("Res.json in the single user is", resJson);
          
                if (resJson.success) {
                  setProgressImages(resJson.data);
                  
                } else {
                  toast.error("got some problem", e);
                }
          
              } catch (e) {
                toast.error("Got some error", e)
              }
        }

        fetchImage();

    },[location.state.userData])

    return (
        <main className="mx-4 my-4 p-2 md:mx-8 lg:mx-16">
            <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg ">
                <div className="flex md:justify-end flex-wrap gap-y-4 mb-8">
                    <button type="button"
                        className="flex items-center px-4 py-1 mx-2  rounded border text-rose-600 border-rose-600"
                        onClick={() => { }}>
                        <i className="ai ai-calendar-fill text-2xl mr-2"></i>
                        Schedule meet
                    </button>
                    <button type="button"
                        className="flex items-center px-4 py-1 mx-2  rounded border text-emerald-600 border-emerald-600"
                        onClick={() => { }}>
                        <i className="ai ai-bell-fill  text-2xl mr-2"></i>
                        Send Notification
                    </button>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Profile</h2>
                </div>
                <div className="flex flex-wrap justify-center">
                    <img
                        src="https://source.unsplash.com/random/?man,face,dp"
                        className="h-28 w-28 rounded-full object-cover my-auto"
                        alt=""
                    />
                    <div className="mb-4 mt-8 px-12 flex flex-col  gap-0">
                        <span className="w-fit text-4xl">{`${location.state.userData.firstName + location.state.userData.lastName}`} <i className="ai ai-crown-fill text-amber-500"></i></span>
                        <span className="w-fit text-lg">{location.state.userData.email}</span>
                        <span className="w-fit text-lg">{location.state.userData.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="text-xl dark:text-slate-300">Details</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Height
                        </h4>
                        <p>{`${location.state.userData.height} cm`}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Weight
                        </h4>
                        <p>{`${location.state.userData.weight} kg`}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">Age</h4>
                        <p>{location.state.userData.age}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Gender
                        </h4>
                        <p>{location.state.userData.gender}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Fitness Goal
                        </h4>
                        <p>{location.state.userData.fitnessGoal}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Occupation
                        </h4>
                        <p>{location.state.userData.occupation}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Sleeping Time
                        </h4>
                        <p>10:00pm to 06:00am</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Timing of Workout
                        </h4>
                        <p>05:00pm to 06:00pm</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            No. of days in week
                        </h4>
                        <p>{location.state.userData.gymDaysPerWeek}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Any Medical Condition
                        </h4>
                        <p>{location.state.userData.healthIssues}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Any Injuries
                        </h4>
                        <p>{location.state.userData.injuries}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
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
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Status
                        </h4>
                        <p>Active</p>
                    </div>
                    <div className="rounded-md bg-gray-50 px-8 py-4 shadow dark:bg-slate-900">
                        <h4 className="text-sm text-slate-700 dark:text-slate-500">
                            Expires on
                        </h4>
                        <p>4th July, 2024</p>
                    </div>
                </div>
            </section>

            <section className="w-full rounded-lg mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative rounded bg-white p-16 text-center shadow-lg">
                        <h2 className=" font-serif text-2xl uppercase dark:text-slate-400">
                            BMI
                        </h2>
                        <span className="text-6xl text-lime-500">{bmi}</span>
                        <p className="mt-4 text-xs ">Normal</p>
                        <div className="group relative mx-auto flex w-32 justify-center">
                            <span className="text- rounded font-bold text-lime-500 shadow-sm">
                                ⓘ
                            </span>
                            <span className="absolute top-10 w-full scale-0 rounded bg-slate-100 p-2 px-4 text-left text-xs text-slate-900 shadow-lg transition-all group-hover:scale-100">
                                Skinny: {"<18.5"} <br /> Normal: 18.5 - 25 <br /> Obese: {">25"}{" "}
                            </span>
                        </div>
                    </div>
                    <div className="relative  rounded bg-white p-16 text-center shadow-lg  ">
                        <h2 className=" font-serif text-2xl uppercase dark:text-slate-400">
                            weight
                        </h2>
                        <span className="text-6xl text-lime-500">Graph</span>
                        <p className="mt-4 text-xs">here</p>
                    </div>
                </div>
            </section>

            <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Progress Pictures</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {progressImage.map((value)=>{
                        return <ImageComponent gifData={value.img.data.data}/> 
                    })}
                </div>
            </section>

            <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Diet Plan</h2>
                </div>


                {/* <div className="relative overflow-x-auto sm:rounded-lg mb-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <caption>
                            <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">Meal 1</h3>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50    ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Ingredients
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Protein
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fat
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Carbs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Calories
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Banana 1/2 or Handful of Berries"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={0}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={13}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={60}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Whey Protein 1/2 Scoop"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={12}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={0.7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1.2}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={60}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600   hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500   hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Almonds 10gm"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={2}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={3}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={62}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600   hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500   hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Walnuts 10gm"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1.5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1.5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={65}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600   hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500   hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="pt-2">
                                    <button className="bg-green-600 text-white rounded p-0.5 px-2 m-2">
                                        <i className="ai ai-plus-bold  text-xs"></i> Add More
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Total"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={16.5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={12.7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={18.7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={247}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>

                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <caption>
                            <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">Meal 2</h3>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50    ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Ingredients
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Protein
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fat
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Carbs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Calories
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Banana 1/2 or Handful of Berries"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={0}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={13}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={60}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Whey Protein 1/2 Scoop"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={12}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={0.7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1.2}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={60}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600   hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500   hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Almonds 10gm"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={2}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={3}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={62}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600   hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500   hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Walnuts 10gm"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1.5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={1.5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={65}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600   hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500   hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="pt-2">
                                    <button className="bg-green-600 text-white rounded p-0.5 px-2 m-2">
                                        <i className="ai ai-plus-bold  text-xs"></i> Add More
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Total"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={16.5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={12.7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={18.7}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>
                                <th className="px-6 py-4">
                                    <input disabled
                                        value={247}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </th>

                            </tr>
                        </tfoot>
                    </table>
                </div> */}



                {recommendedMeal.map((meal, index) => (<Meal ingredients={meal.ingredients} addIngredients={addIngredients} index={index} updateIngredientsData={updateIngredientsData} />))}
                


                <div className="sm:w-64">
                    <label htmlFor="meal" className="block text-sm font-medium text-gray-700">
                        Add meal
                    </label>
                    <select
                        id="meal"
                        name="meal"
                        //value={selectedOption}
                        onChange={handleSelectChange}
                        className="mt-1 bg-green-600 text-white block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="" default>Select the diet from below</option>
                        {
                            totalMeals.map((meal) => <option value={meal.meal_name}>{meal.meal_name}</option>)
                        }
                    </select>

                </div>

                {(recommendedMeal.length>0)?<button
                    className="bg-green-600 text-white rounded p-0.5 px-2 m-2"
                    onClick={handleRecommendedDiet}
                >   
                    Recommend Diet
                </button>: null}

            </section>

            <section className="w-full rounded-lg bg-white p-8 mb-10 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-xl dark:text-slate-300">Workout Plan</h2>
                </div>

                <div className="relative overflow-x-auto sm:rounded-lg mb-10">
                    <table className="w-full max-w-lg text-sm text-left rtl:text-right text-gray-500  ">
                        <caption className="">
                            <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">Routine</h3>
                        </caption>
                        <tbody className="">
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Monday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Chest & Triceps
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Tuesday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Legs
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Wednesday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Cardio
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Thursday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Back & Biceps
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Friday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Shoulders & Traps
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Saturday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Arms
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  ">
                                    Sunday
                                </th>
                                <td scope="col" className="px-6 py-2">
                                    Rest
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="relative overflow-x-auto sm:rounded-lg mb-10">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <caption>
                            <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">Monday - Chest & Triceps</h3>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Exercise
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sets
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reps
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rest
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    <input disabled
                                        value={"Warmup"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"PUSH UPS + TRICEPS PRESS DOWN"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={2}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"15-20"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"DB INCLINE PRESS"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={4}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"MACHINE PEC FLY"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={3}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"High Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"CABLE CROSS"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={5}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-12"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"30 sec"}
                                        className="outline-none p-1 w-16"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"DB TRICEP EXTENSION"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={4}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b     hover:bg-gray-50  ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    <input disabled
                                        value={"Regular Set"}
                                        className="outline-none p-1 w-32"
                                        type="text" name="" id="" />
                                </th>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"TRICEP PUSHDOWN"}
                                        className="outline-none p-1 w-auto"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={4}
                                        className="outline-none p-1 w-full"
                                        type="number" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"6-8"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4">
                                    <input disabled
                                        value={"1-2 min"}
                                        className="outline-none p-1 w-full"
                                        type="text" name="" id="" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">
                                        <i className="ai ai-note-pencil mx-1"></i>
                                    </a>
                                    <a href="#" className="font-medium text-rose-500 hover:underline">
                                        <i className="ai ai-trash-fill mx-1"></i>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td className="pt-2">
                                    <button className="bg-green-600 text-white rounded p-0.5 px-2 m-2">
                                        <i className="ai ai-plus-bold  text-xs"></i> Add More
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>



            </section>
        </main>
    )
}

export default SingleUser
