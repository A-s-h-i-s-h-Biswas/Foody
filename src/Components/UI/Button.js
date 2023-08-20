import styles from "./Button.module.css";

const Button=props=>{

    return (
        <div  className={props.className}>
            <button className={`${styles.button} ${props.className}`} type="submit" onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

export default Button;