import toast, { Toaster } from "react-hot-toast";

const SucessFullMessage = () => {
  const notify = () =>
    toast.success("Login Sucessfully", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon

      // Change colors of success/error/loading icon

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },

      // Additional Configuration
      removeDelay: 1000,
    });
  return (
    <div>
      <Toaster />
    </div>
  );
};

export default SucessFullMessage;
