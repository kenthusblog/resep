import { Link } from "react-router-dom";
import { useRecipes } from "../context/recipes-context";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactComponent as Empty } from "../assets/images/empty.svg";

export default function SaveRecipes() {
  const { saveRecipes, handleRemoveItem, removeNetify } = useRecipes();
  return (
    <>
      <Navbar />
      <div className="min-h-screen container mx-auto px-5 mt-32">
        <div className="text-2xl font-bold mt-5 mb-5 text-gray-800">
          Resep Yang Kamu Simpan
        </div>
        {saveRecipes.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {saveRecipes.map((recipe, index) => {
              return (
                <div key={index} className="h-auto card border-zinc-50 shadow">
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
          <div className=" flex flex-col items-center">
            <Empty style={{ height: "450px", width: "300px" }} />
            <div className="py-5 font-semibold capitalize">
              Tidak ada resep yang disimpan
            </div>
            <div className="mb-5 capitalize">
              untuk menyimpan resep, klik tombol merah pada tampilan resep
              masakan
            </div>
            <Link to="/recipes">
              <button className="px-3 py-2 font-bold text-lg rounded-md bg-browen-800 text-white inline">
                Cari Resep <i className="fa fa-chevron-right"></i>
              </button>
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
