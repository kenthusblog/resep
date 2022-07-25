import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { getRecipes } from "../api/index";

export const recipesContext = createContext();

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export const useRecipes = () => {
  return useContext(recipesContext);
};

export const RecipesContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState(statusList.idle);
  const [saveRecipes, setSaveRecipes] = useState(
    localStorage.getItem("recipes")
      ? JSON.parse(localStorage.getItem("recipes"))
      : []
  );

  useEffect(() => {
    (async () => {
      try {
        setStatus(statusList.process);

        let response = await getRecipes();
        setRecipes(response.data.results);

        setStatus(statusList.success);
      } catch (error) {
        console.error(error.message);
        setStatus(statusList.error);
      }
    })();
  }, []);

  useEffect(() => {
    if (saveRecipes) {
      localStorage.setItem("recipes", JSON.stringify(saveRecipes));
    }
  }, [saveRecipes]);

  const handleSave = (recipe) => {
    setSaveRecipes([...saveRecipes, recipe]);
  };

  const alreadySave = (key) => {
    if (saveRecipes.find((item) => item.key === key)) {
      return true
    } else {
      return false
    }
  }

  const handleRemoveItem = (key) => {
    setSaveRecipes((recipes) => {
      return recipes.filter((item) => item.key !== key);
    });
  };

  // toastify
  const notify = () => {
    toast(" ✅ Resep disimpan", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const removeNetify = () => {
    toast("⚠️ Resep dihapus", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <recipesContext.Provider
      value={{
        recipes,
        status,
        handleSave,
        saveRecipes,
        handleRemoveItem,
        notify,
        removeNetify,
        alreadySave,
      }}
    >
      {children}
    </recipesContext.Provider>
  );
};
