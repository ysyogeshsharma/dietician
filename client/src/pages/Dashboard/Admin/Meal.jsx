import MealIngredientRow from "./MealIngredientRow";
import { useState } from "react";


const Meal = ({ ingredients, index, addIngredients, updateIngredientsData }) => {

    // const [ingredientsState, setIngredientsState] = useState(ingredients);
    // console.log("ingredientsState is",ingredientsState)

    function handleAddMore() {
        console.log("HandleAddMore is running")
        //setIngredientsState([...ingredientsState, {}])
        addIngredients(index, {
            ingredient_name: "",
            protein: 0,
            fat: 0,
            carbs: 0,
            calories: 0
        })
    }


    return (
        <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                <caption>
                    <h3 className="mb-4 text-lg text-emerald-600 dark:text-slate-300">Meal 1</h3>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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

                    {/* <MealIngredientRow/>
                            <MealIngredientRow/> */}

                    {ingredients.map((ingredient, ingedientIndex) => <MealIngredientRow ingredient={ingredient} mealIndex={index} ingredientArrIndex={ingedientIndex} updateIngredientsData={updateIngredientsData} />)}

                    <tr>
                        <td className="pt-2">
                            <button
                                className="bg-green-600 text-white rounded p-0.5 px-2 m-2"
                                onClick={handleAddMore}
                            >
                                <i className="ai ai-plus-bold  text-xs"></i> Add More
                            </button>
                        </td>
                    </tr>

                </tbody>
                <tfoot>
                    <tr className="bg-white border-b hover:bg-gray-50  ">
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
    )
}


export default Meal;