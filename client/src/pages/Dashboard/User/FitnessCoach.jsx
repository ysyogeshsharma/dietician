import { Link } from "react-router-dom"
import Meals from "./Meals"

const Sidebar = () => {
    return (
        <section className="sticky top-0 left-0">
            <div className="flex flex-row flex-wrap lg:sticky lg:top-0 lg:left-0 lg:content-start lg:min-h-svh lg:w-[250px] lg:max-w-80 font-mono text-center lg:rounded-r-lg p-6 lg:p-10 dark:bg-slate-950">
                <Link className="flex justify-center items-center my-3 lg:my-6 mx-auto px-4 py-2 w-32 lg:w-full h-fit rounded dark:bg-sky-500 dark:text-slate-900">
                    <i className="ai ai-bowl-food-fill mr-2 text-xl"></i>
                    Diet Plan
                </Link>
                <Link className="flex justify-center items-center my-3 lg:my-6 mx-auto px-4 py-2 w-32 lg:w-full h-fit rounded dark:bg-slate-900 dark:text-slate-300">
                    <i className="ai ai-barbell-light mr-2 text-xl"></i>
                    Workout
                </Link>
                <Link className="flex justify-center items-center my-3 lg:my-6 mx-auto px-4 py-2 w-32 lg:w-full h-fit rounded dark:bg-slate-900 dark:text-slate-300">
                    <i className="ai ai-pill-fill mr-2 text-xl"></i>
                    Supplements
                </Link>
                <Link className="flex justify-center items-center my-3 lg:my-6 mx-auto px-4 py-2 w-32 lg:w-full h-fit rounded dark:bg-slate-900 dark:text-slate-300">
                    <i className="ai ai-bag-fill mr-2 text-xl"></i>
                    Groceries
                </Link>
                <Link className="flex justify-center items-center my-3 lg:my-6 mx-auto px-4 py-2 w-32 lg:w-full h-fit rounded dark:bg-slate-900 dark:text-slate-300">
                    <i className="ai ai-info-fill mr-2 text-xl"></i>
                    Instructions
                </Link>
            </div>
        </section>
    )
}

const FitnessCoach = () => {
    return (
        <main className="dark relative">
            <div className="flex flex-col lg:flex-row flex-wrap dark:bg-slate-900">
                <Sidebar />
                <Meals />
            </div>

        </main>
    )
}

export default FitnessCoach
