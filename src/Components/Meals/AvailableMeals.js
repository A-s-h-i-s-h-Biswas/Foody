import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Container from "../UI/Container";
import { useEffect, useState } from "react";
import { db } from "../../firebase-store/firebase-config";
import { collection, getDocs } from "firebase/firestore";


const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [loading,setLoading]=useState(false)
  let loadingPara=<p style={{textAlign:"center" , color:"red"}}>Loading delicious meal items........</p>
  
  useEffect(() => {
    async function getAllMeals() {
      const Meals=[];
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "meals"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const item={id:doc.id, ...doc.data()};
        Meals.push(item);
      });
      setMeals(Meals);
      setLoading(false);
    }
    getAllMeals();
  }, []);
  
  return (
    <Container className={styles.meals_container}>
      {loading && loadingPara}
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          img={meal.img}
          price={meal.price}
          rating={meal.rating}
          description={meal.description}
        />
      ))}
    </Container>
  );
};

export default AvailableMeals;
