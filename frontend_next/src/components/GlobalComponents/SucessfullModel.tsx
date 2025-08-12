import Swal from "sweetalert2";

export const SucessfulModel = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "OK",
  });
};
