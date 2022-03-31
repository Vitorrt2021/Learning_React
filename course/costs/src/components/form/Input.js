import styles from "./Input.module.css";

function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        id={name}
        onChange={handleOnChange}
        value={value}
        name={name}
        placeholder={placeholder}
      ></input>
    </div>
  );
}

export default Input;
