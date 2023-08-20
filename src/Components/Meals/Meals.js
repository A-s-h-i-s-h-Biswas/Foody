import AvailableMeals from "./AvailableMeals"
import styles from "./Meals.module.css";
const Meals=props=>{

    return (
        <div className={styles.meals_control}>
            <AvailableMeals/>
        </div>
    )
}
export default Meals;