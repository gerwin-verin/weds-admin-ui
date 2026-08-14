const Swal2 = Swal.mixin({
  customClass: {
    input: "form-control",
  },
});

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// jQuery(document).ready(function ($) {
//   $("#btnLogin").click(function () {
//     var username = $("#txtUsername").val();
//     var password = $("#txtPassword").val();

//     if (username == "") {
//     //   Swal2.fire({
//     //     icon: "warning",
//     //     title: "Username harus diisi!",
//     //   }).then((result) => {
//     //     if (result.isConfirmed) {
//     //       // Code here runs ONLY after clicking OK
//     //       console.log("User clicked OK");
//     //       return;
//     //     }
//     //   });
//     }

//     if (password == "") {
//     //   Swal2.fire({
//     //     icon: "warning",
//     //     title: "Password harus diisi!",
//     //   }).then((result) => {
//     //     if (result.isConfirmed) {
//     //       // Code here runs ONLY after clicking OK
//     //       console.log("User clicked OK");
//     //       return;
//     //     }
//     //   });
//     }

//     if (username == "admin" && password == "admin") {
//     //   Toast.fire({
//     //     icon: "success",
//     //     title: "Signed in successfully",
//     //   });
//     window.location.replace("pages/extra-component-sweetalert.html");

//     //   window.location.href = "../extra-component-sweetalert.html";
//     } else {
//       Swal2.fire({
//         icon: "error",
//         title: "Username dan password salah!",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Code here runs ONLY after clicking OK
//           console.log("User clicked OK");
//           return;
//         }
//       });
//     }
//   });
// });

$(document).ready(function () {
  $("#btnLogin").on("click", function () {
    var username = $("#txtUsername").val();
    var password = $("#txtPassword").val();

    if (username == "admin" && password == "admin") {
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      window.location.href = "main.html";
    }
  });
});
