import { useState } from "react";

const MealIngredientRow = ({ ingredient, updateIngredientsData, ingredientArrIndex, mealIndex }) => {
    

    const [ingredientState, setIngredientState] = useState(ingredient);
    const [showSaveButton, setShowSaveButton] = useState(false);
    console.log("ingredientState in the MealIngredientrow", ingredientState);

    function handleOnChange(e){
        setShowSaveButton(true);
        setIngredientState({...ingredientState, [e.target.name]: e.target.value});
    }

    function handleSaveChanges(){
        updateIngredientsData(mealIndex, ingredientArrIndex, ingredientState);
        setShowSaveButton(false);
    }
    return (
        <tr className="bg-white border-b hover:bg-gray-50  ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                <input
                    value={ingredientState.ingredient_name || ""}
                    className="outline-none p-1 w-auto"
                    type="text" name="ingredient_name" id=""
                    placeholder="Enter Ingredients name"
                    onChange={handleOnChange}
                />
            </th>
            <td className="px-6 py-4">
                <input
                    value={ingredientState.protein || ""}
                    className="outline-none p-1 w-full"
                    type="number" name="protein" id=""
                    placeholder="protein content"
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4">
                <input
                    value={ingredientState.fat || ""}
                    className="outline-none p-1 w-full"
                    type="number" name="fat" id=""
                    placeholder="fat content"
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4">
                <input
                    value={ingredientState.carbs || ""}
                    className="outline-none p-1 w-full"
                    type="number" name="carbs" id=""
                    placeholder="carbs content"
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4">
                <input
                    value={ingredientState.calories || ""}
                    className="outline-none p-1 w-full"
                    type="number" name="calories" id=""
                    placeholder="calories content"
                    onChange={handleOnChange}
                />
            </td>
            <td className="px-6 py-4 text-right">
                {showSaveButton && <button 
                className="font-medium text-blue-600 hover:underline"
                onClick={handleSaveChanges}
                >
                    <i className="ai ai-note-pencil mx-1"></i>
                </button>}
                <button  className="font-medium text-rose-500 hover:underline">
                    <i className="ai ai-trash-fill mx-1"></i>
                </button>
            </td>
        </tr>
    )
}


export default MealIngredientRow;