import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import NavBar from "../components/navbar";
import SearchForm from "../components/SearchForm";
import Footer from "../components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRecipes } from "../context/recipes-context";
import imageSearch from "../assets/images/hero-search.jpg";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Recipes() {
  const { recipes, status, handleSave, notify, handleRemoveItem, removeNetify, alreadySave } = useRecipes();

  return (
    <>
      <div className="min-h-screen w-full">
        <NavBar />
        <div
          className="w-full h-112 bg-cover mt-16 bg-center bg-gray-200"
          style={{
            backgroundImage: `url('${imageSearch}')`,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-3xl font-semibold capitalize mt-32"></div>
            <div className="mt-4 w-full">
              <SearchForm />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-5 mt-5 mb-5 text-gray-800">
          <div className="text-2xl font-semibold mb-5">
            Rekomendasi resep hari ini{" "}
          </div>
          {status === statusList.success ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              {recipes.slice(0, 12).map((recipe, index) => {
                return (
                  <div
                    key={index}
                    className="h-auto card border-zinc-50 shadow-lg"
                  >
                    {!alreadySave(recipe?.key) ? (
                      <div className="justify-self-end">
                        <button
                          className="px-3 py-2 text-sm text-white font-bold bg-browen-800 rounded-md self-center shadow-2xl mb-2"
                          onClick={() => {
                            handleSave(recipe);
                            notify();
                          }}
                        >
                          Simpan Resep <i className="fa fa-bookmark text-sm"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="justify-self-end">
                        <button
                          className="px-3 py-2 text-sm text-white font-bold bg-browen-800 rounded-md self-center shadow-2xl mb-2"
                          onClick={() => {
                            handleRemoveItem(recipe.key);
                            removeNetify();
                          }}
                        >
                          Hapus Resep <i className="fa fa-trash text-sm"></i>
                        </button>
                      </div>
                    )}

                    <Link
                      to={`detail-recipes/${recipe.key}`}
                      thumb={recipe.thumb}
                    >
                      <img
                        className="h-50 w-full object-cover rounded-md"
                        src={recipe.thumb}
                        alt={recipe.key}
                      />
                      <div className="text-center w-full pt-4 font-semibold">
                        {recipe.title}
                      </div>
                      <div className="divide-y divide-gray-400">
                        <div className="text-center py-2"></div>
                        <div className="text-center py-2"></div>
                      </div>
                      <div className="flex flex-row justify-between items-center text-center px-5 mb-4  font-semibold">
                        <div className="flex flex-col">
                          <div className="text-sm text-gray-500">
                            <i className="fa fa-clock"></i>
                          </div>
                          <div>{recipe.times}</div>
                        </div>
                        <div className="flex flex-col mx-3">
                          <div className="text-sm text-gray-500">
                            <i className="fa fa-utensils"></i>
                          </div>
                          <div>{recipe.portion}</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm text-gray-500">
                            <i className="fa fa-clipboard-list"></i>
                          </div>
                          <div>{recipe.dificulty}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-4xl text-center mt-12 mb-12">
              <BeatLoader color="black" margin={5} size={25} />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
