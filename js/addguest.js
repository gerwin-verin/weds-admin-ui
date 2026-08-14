var url = "https://weds-new-api.vercel.app/api/users/";
var action = "";
var id = null;
$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  id = urlParams.get("id");

  if (id == null) {
    action = "add";
  } else {
    action = "edit";
  }

  if (action == "edit") {
    fetchGetGuest(id).then((data) => {
      console.log(data);
      $("#txtGuest").val(data.res.name);
      $("#txtAddress").val(data.res.address);
      $("#txtContact").val(data.res.nohp);
      $("#txtPax").val(data.res.pax);

      if (data.res.type == "Gereja") {
        $("#txtGereja").prop("checked", true);
      } else if (data.res.type == "Gereja Resepsi") {
        $("#txtGerejaResepsi").prop("checked", true);
      }
    });
  }

});

$("#btnSubmit").on("click", function () {
  var txtGuest = $("#txtGuest").val();
  var txtAddress = $("#txtAddress").val();
  var txtContact = $("#txtContact").val();
  var txtPax = $("#txtPax").val();
  var typeInvitation = "";
  if ($("#txtGereja").prop("checked")) {
    typeInvitation = "Gereja";
  } else if ($("#txtGerejaResepsi").prop("checked")) {
    typeInvitation = "Gereja Resepsi";
  }

  if (action == "add") {
    var data = {
      action: "add",
      data: {
        name: txtGuest,
        address: txtAddress,
        nohp: txtContact,
        pax: txtPax,
        type: typeInvitation,
      },
    };
  } else if (action == "edit") {
    var data = {
      action: "edit",
      data: {
        id: id,
        name: txtGuest,
        address: txtAddress,
        nohp: txtContact,
        pax: txtPax,
        type: typeInvitation,
      },
    };
  }

  console.log(data);

  if (data.action == "add") {
    fetchInsertGuest(data.data).then((data) => {
      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: data.msg,
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.msg,
          icon: "error"
        });
      }
    }).catch((err) => {
      console.error("Error: ", err);
    });
  } else if (data.action == "edit") {
    fetchUpdateGuest(data.data).then((data) => {
      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: data.msg,
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.msg,
          icon: "error"
        });
      }
    }).catch((err) => {
      console.error("Error: ", err);
    });
  }
});

/** Fetching */
function fetchInsertGuest(data) {
  return insertGuest(data).then((data) => {
    return data;
  }).catch((error) => {
    console.error("Error: ", error);
  });
}

function fetchUpdateGuest(data) {
  return updateGuest(data).then((data) => {
    return data;
  }).catch((error) => {
    console.error("Error: ", error);
  });
}

function fetchGetGuest(id) {
  return getGuest(id).then((data) => {
    return data;
  }).catch((error) => {
    console.error("Error: ", error);
  });
}

/** CRUD */
async function insertGuest(data) {
  const options = {
    method: "POST",
    mode: "cors", // 1. Explicitly enable Cross-Origin Resource Sharing
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url + "insertGuest", options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("CORS or Network Error:", error);
  }
}

async function updateGuest(data) {
  const options = {
    method: "POST",
    mode: "cors", // 1. Explicitly enable Cross-Origin Resource Sharing
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url + "updateGuest", options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("CORS or Network Error:", error);
  }
}

urlguest