import { Link } from "react-router-dom";
import { useRef } from "react";

import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BeatLoader } from "react-spinners";
import { useRecipes } from "../context/recipes-context";

import ImageHero2 from "../assets/images/hero-chef-2.svg";

export default function Home() {
  const { recipes, status, handleSave, notify } = useRecipes();
  const refRecipes = useRef();
  return (
    <>
      <Navbar />
      <Hero refRecipes={refRecipes} />
      <div className="container mx-auto px-5 mt-12 ">
        <div className="title-section ">
          <p className="text-gray-800" ref={refRecipes}>
            Resep Ayo Masak
          </p>
        </div>
        <div className="flex flex-col mb-5">
          {status === "success" ? (
            <div className="w-full grid lg:grid-cols-3 gap-4">
              {recipes.slice(0, 3).map((recipe, index) => {
                return (
                  <div
                    key={index}
                    className="h-auto card border-zinc-50 shadow "
                  >
                    <div className="justify-self-auto">
                      <button
                        style={{ zIndex: "10" }}
                        className={`px-3 py-2 text-sm text-white font-bold bg-browen-800 rounded-md self-center shadow-2xl mb-2
                                    `}
                        onClick={() => {
                          handleSave(recipe);
                          notify();
                        }}
                      >
                        Simpan Resep <i className="fa fa-bookmark text-sm"></i>
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
            <div className="text-4xl text-center mt-12 mb-12">
              <BeatLoader color="black" margin={5} size={25} />
            </div>
          )}
          <div className="w-full mx-3">
            <div className="h-40 text-center flex justify-center">
              <button className="px-3 py-2 text-lg text-white font-bold bg-browen-800 rounded-md self-center shadow-2xl">
                <Link to="/recipes">
                  Lihat Menu Lainya <i className="fa fa-chevron-right"></i>{" "}
                </Link>
              </button>
            </div>
          </div>
        </div>
        {/* section */}

        <div className="title-section ">Keunggulan Ayo Masak </div>

        <div className="container mx-auto text-center">
          <img
            src={ImageHero2}
            alt="Ayo masak chef"
            className="h-40 w-full text-center rounded-md"
            style={{ height: "500px", width: "100%" }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-32">
          <div className="card h-64 text-center">
            <div className="text-2xl font-bold mb-3">
              Lengkap <i className="fa fa-circle-check"></i>
            </div>
            <p className="capitalize">
              Kami Menyedikan Lebih Dari Ribuan Resep Makanan, lengkap mulai
              dari takaran bahan - bahan yang dibutuhkan untuk tiap makanan dan
              langkah - langkah cara Memasaknya
            </p>
          </div>
          <div className="card h-64 text-center">
            <div className="text-2xl font-bold mb-3">
              Mudah <i className="fa fa-circle-check"></i>
            </div>
            <p className="capitalize">
              Mudah bagi anda yang belum bisa masak sebelumnya dapat mencoba
              karna terdapat level atau tingkat kesulitan dalam tiap resep
              tersebut, bagi anda yang pemula bisa mengikuti level yang mudah
              terlebih dahulu
            </p>
          </div>
          <div className="card h-64 text-center">
            <div className="text-2xl font-bold mb-3">
              Simpan Resep <i className="fa fa-circle-check"></i>
            </div>
            <p className="capitalize">
              Fitur ini menyimpan resep yang anda sukai ke dalam daftar favorite
              menu. dengan mengklik atau menekan icon merah diatas gambar menu
              makanan, anda bisa mencoba resep tersebut dikemudian hari
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}
