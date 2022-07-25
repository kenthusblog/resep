import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import { detailRecipe } from "../api/index";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { PropagateLoader } from "react-spinners";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecipes } from "../context/recipes-context";

export default function DetailRecipes() {
  let { params } = useRouteMatch();
  const [recipes, setRecipes] = useState(null);
  const [ingredient, setIngredient] = useState([]);
  const [step, setStep] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setLoading(true);
    detailRecipe(params?.key)
      .then((res) => {
        let { title, thumb, desc, servings, times, dificulty } =
          res.data.results;
        setRecipes({ title, thumb, desc, portion: servings, times, dificulty, key: params.key });
        setIngredient(res.data.results.ingredient);
        setStep(res.data.results.step);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [params]);

  // handle save recipe
  const { handleSave, notify, handleRemoveItem, removeNetify, alreadySave } = useRecipes();

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center text-4xl mt-64 mb-64">
          <PropagateLoader
            className="mx-auto"
            color="black"
            margin={5}
            size={25}
          />
        </div>
      ) : (
        <div className="container mx-auto px-5 mt-32">
          <div className="text-xl lg:text-3xl font-semibold w-full">
            {recipes.title}

            {!alreadySave(params?.key) ? (
              <div className="flex justify-self-stretch">
                <button
                  className="px-3 py-2 font-bold text-sm rounded-md bg-browen-800 text-white inline"
                  onClick={() => {
                    handleSave(recipes);
                    // handleSave(params);
                    notify();
                  }}
                >
                  Simpan Resep <i className="fa fa-bookmark"></i>
                </button>
              </div>
            ) : (
              <div className="flex justify-self-stretch">
                <button
                  className="px-3 py-2 font-bold text-sm rounded-md bg-browen-800 text-white inline"
                  onClick={() => {
                    handleRemoveItem(recipes.key);
                    removeNetify();
                  }}
                >
                  Hapus Resep <i className="fa fa-trash text-sm"></i>
                </button>
              </div>
            )}
          </div>

          <img
            src={recipes.thumb}
            className="mt-4 mb-5 rounded-md shadow-lg "
            alt={`${recipes.title}`}
          />

          <div className="w-full mb-5">{recipes.desc}</div>

          <div className="flex flex-col-reverse lg:flex-row justify-between mb-5">
            <div className="flex flex-col">
              <div>
                <div className="text-2xl font-semibold mb-2">Bahan - Bahan</div>
                {ingredient.map((item, index) => {
                  return (
                    <div key={index} className="pl-3 text-xl font-light">
                      {item}
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="text-2xl font-semibold mb-2 mt-5">
                  Cara Masak
                </div>
                {step.map((item, index) => {
                  return (
                    <div key={index} className="pl-3 text-xl font-light w-full">
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="flex flex-row justify-between lg:flex-col items-center text-center 
                    px-5 py-6 
                    mb-5
                    h-auto lg:h-64
                    shadow-lg bg-gray-100"
            >
              <div className="flex flex-col lg:mb-4">
                <p className="text-sm text-gray-500">
                  <i className="fa fa-clock"></i>
                </p>
                <p className="font-semibold">{recipes.times}</p>
              </div>
              <div className="flex flex-col lg:mb-4">
                <p className="text-sm text-gray-500">
                  <i className="fa fa-utensils"></i>
                </p>
                <p className="font-semibold">{recipes.servings}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">
                  <i className="fa fa-clipboard-list"></i>
                </p>
                <p className="font-semibold">{recipes.dificulty}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
}
