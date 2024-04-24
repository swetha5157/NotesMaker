import { useContext } from "react";
// import { RouterContext } from "react-router";
import { useNavigate } from "react-router-dom"


const useHistory = () => {
    const history = useNavigate();
  return history.history;
};

export default useHistory;