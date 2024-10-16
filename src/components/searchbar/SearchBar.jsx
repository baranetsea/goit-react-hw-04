import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";

const notify = () => toast("The input field is empty ");

const SearchBar = ({ onHandleSubmit }) => {
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userInput = form.elements.text.value.trim("");
    if (userInput === "") {
      notify();
      return;
    }
    onHandleSubmit(form.elements.text.value);

    form.reset();
  };

  return (
    <>
      <header className={styles.header}>
        <form onSubmit={onFormSubmit}>
          <input
            className={styles.input}
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={styles.btn} type="submit">
            Search
          </button>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 1000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </form>
      </header>
    </>
  );
};

export default SearchBar;
