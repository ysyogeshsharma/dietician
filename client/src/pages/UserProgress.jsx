import { decodeJwt } from "../middelwares";
import { toast } from "react-toastify";

const UserProgress = () => {

  const token = localStorage.getItem("dietToken");
  const decoded = token ? decodeJwt(token) : null;

  console.log("decoded jwt in the userprogress component", decoded)

  async function handleUpload(e) {
    console.log("Inside handle upload file and value is", e);
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      formData.append('email', JSON.stringify(decoded.email));

      const res = await fetch("http://localhost:3333/users/uploadpic", {
        method: "POST",
        body: formData
      });

      const resJson = await res.json();

      if (resJson.success) {
        toast.message("Successfully uploaded image");
      } else {
        toast.error("got some problem", e);
      }

    } catch (e) {
      toast.error("Got some error", e)
    }
  }

  return (
    <>
      <main className="w-full bg-gray-100 p-4 dark:bg-slate-900">
        <h1 className="text-sky-500 text-3xl rounded-md text-center p-5 mb-4 bg-slate-950">User Progress</h1>
        <div className="flex flex-wrap">
          <div className="py-8 w-full rounded bg-white text-center shadow dark:bg-slate-950 md:w-2/4">
            <h2 className="font-serif text-2xl uppercase dark:text-slate-400">
              BMI
            </h2>
            <span className="text-5xl text-sky-500">19.9</span>
            <p className="mt-4 text-xs dark:text-slate-300">Normal</p>
            {/* <p className="dark:text-slate-400 text-base"><strong>{"<"}16 :</strong> Severe Thinness</p> */}
            <div className="group relative mx-auto w-32 justify-center">
              <span className="text- rounded font-bold text-sky-500 shadow-sm">
                ⓘ
              </span>
              <span className="absolute top-10 w-full scale-0 rounded bg-slate-900 p-2 px-4 text-left text-xs text-slate-400 shadow-lg transition-all group-hover:scale-100">
                Skinny: {"<18.5"} <br /> Normal: 18.5 - 25 <br /> Obese: {">25"}{" "}
              </span>
            </div>
          </div>

          <div className="py-8 w-full rounded bg-white text-center shadow dark:bg-slate-950 md:w-2/4">
            <h2 className=" font-serif text-2xl uppercase dark:text-slate-400">
              weight
            </h2>
            <span className="text-5xl text-sky-500">Graph</span>
            <p className="mt-4 text-xs dark:text-slate-300">here</p>
          </div>


          <div className="py-8 w-full rounded bg-white text-center shadow dark:bg-slate-950 md:w-2/4">
            <h2 className=" mb-6 font-serif text-xl uppercase dark:text-slate-400">
              Update Weight
            </h2>
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder=".kg"
              step={0.1}
              className="w-1/4 rounded bg-gray-100 px-3 py-3 text-center text-xl dark:bg-slate-900 dark:text-slate-400"
            />
            <button className="mx-auto mt-4 block rounded-full border border-sky-500 p-3 text-xs text-sky-500 dark:hover:bg-slate-900">
              Click to Update
            </button>
          </div>

          <div className="py-8 w-full rounded bg-white p-10 text-center shadow dark:bg-slate-950 md:w-2/4">
            <label className="my-4 block cursor-pointer rounded-lg border-2 border-dashed border-sky-500 py-10">
              <span className="mx-auto rounded-full bg-sky-500 px-4 py-1 text-center font-mono text-4xl font-bold  text-slate-900">
                +
              </span>
              <input
                type="file"
                className="invisible hidden w-full"
                onChange={handleUpload}
              />
            </label>
            <p className="mt-4 text-xs dark:text-slate-300">
              Upload your progress picture
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProgress;