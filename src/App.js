import { Fragment ,useState,useEffect} from "react";
import  "./index.css";
import Header from "./Components/Layout/Header";
import BannerCode from "./Components/Layout/BannerCode";
import Meals from "./Components/Meals/Meals";

function App() {
  const [isLoading, setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
    const timer=setTimeout(()=>{
      setLoading(false);
    },1000);
    return ()=>{clearTimeout(timer)};
  },[]);
  return (
    <Fragment>
      {isLoading && <section className="div"></section>}
      <Header/>
      <BannerCode/>
      <Meals/>
    </Fragment>
  );
}

export default App;
