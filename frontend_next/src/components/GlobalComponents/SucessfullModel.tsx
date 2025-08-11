import Swal from "sweetalert2";

function SucessfulModel() {
  return Swal.fire({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success",
  });
}

export default SucessfulModel;
