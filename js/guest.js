const url = "https://weds-new-api.vercel.app/api/users/";

var listGuest = [];

$(document).ready(function async() {
  redrawList();
});

function redrawList() {
  fetchLoadGuest().then((listGuest) => {
    var newRowContent = "";
    document.getElementById("rows-data").innerHTML = "";
    for (var i = 0; i < listGuest.length; i++) {
      newRowContent += "<tr>";
      newRowContent += "<td>" + listGuest[i].name + "</td>";
      newRowContent += "<td>" + listGuest[i].address + "</td>";
      newRowContent += "<td>" + listGuest[i].pax + "</td>";
      newRowContent += "<td>" + listGuest[i].nohp + "</td>";
      newRowContent +=
        "<td>" +
        '<span class="badge bg-success">' +
        listGuest[i].type +
        "</span>" +
        "</td>";
      newRowContent +=
        "<td>" +
        '<a href="' +
        listGuest[i].link +
        '">' +
        listGuest[i].link +
        "</a>" +
        "</td>";
      newRowContent +=
        "<td>" +
        "<button onclick=\"onShare('" +
        i +
        '\')" class="btn icon btn-primary" data-bs-toggle="modal" data-bs-target="#shareForm"><i class="bi bi-share"></i></button>' +
        "<button onclick=\"onUpdate('" +
        listGuest[i].id +
        '\')" class="btn icon btn-primary"><i class="bi bi-pencil"></i></button>' +
        "<button onclick=\"onDelete('" +
        listGuest[i].id +
        '\')" class="btn icon btn-danger"><i class="bi bi-x"></i></button>' +
        "</td>";
      newRowContent += "<tr>";
    }
    document.getElementById("rows-data").innerHTML = newRowContent;
  });
}

function onShare(idx) {
  document.getElementById("toShare").value = listGuest[idx].nohp;
  document.getElementById("messageShare").value = listGuest[idx].link;
}

$("#btnShareMessage").on("click", function () {
  var phonenumber = $("#toShare").val();
  var msg = $("#messageShare").val();
  window.open("https://wa.me/"+phonenumber+"?text="+msg+"");
})

function onUpdate(id) {
  window.location.href = "addguest.html?id="+id; 
}

function onDelete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      fetchDeleteGuest(id)
        .then((data) => {
          if (data.success) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            redrawList();
          } else {
            console.error("Error: ", err);
          }
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }
  });
}

function fetchLoadGuest() {
  return loadGuest()
    .then((data) => {
      listGuest = data.res;
      return listGuest;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function fetchDeleteGuest(data) {
  return deleteGuest(data)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

/* CRUD */
// API
async function loadGuest() {
  const options = {
    method: "GET",
    mode: "cors", // 1. Explicitly enable Cross-Origin Resource Sharing
    headers: {
      "Content-Type": "application/json",
      // 'Accept': 'application/json' (Optional: tells server what you want back)
    },
  };

  try {
    const response = await fetch(url + "getListGuest", options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("CORS or Network Error:", error);
  }
}

async function deleteGuest(id) {
  const options = {
    method: "POST",
    mode: "cors", // 1. Explicitly enable Cross-Origin Resource Sharing
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url + "deleteGuest/" + id, options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("CORS or Network Error:", error);
  }
}

$("#btnReset").on("click", function () {
  // document.getElementById('uploadfile').reset();
  document.getElementById("uploadfile").value = "";
});

$("#btnReset2").on("click", function () {
  // document.getElementById('uploadfile').reset();
  document.getElementById("uploadfile").value = "";
});

$("#btnUploadSubmit").on("click", function () {
  document.getElementById("uploadfile").value = "";
  try {
    var data = [];
    for (var i = 0; i < submitData.length; i++) {
      data.push({
        name: submitData[i]["Nama"],
        address: submitData[i]["Alamat"],
        nohp: submitData[i]["No HP"],
        pax: submitData[i]["Pax"],
        type: submitData[i]["Status Undangan"],
      });
    }

    var countData = data.length;
    var countSubmit = 0;
    for (var j = 0; j < data.length; j++) {
      fetchInsertGuest(data[j])
        .then((data) => {
          countSubmit++;
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }

    if (countData == countSubmit) {
      Swal.fire("Added!", "Your data has been added.", "success");
    }

    redrawList();
  } catch (err) {
    console.error("Error: ", err);
  }
});

/* Upload File */
var submitData = "";
document.getElementById("uploadfile").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const wb = XLSX.read(data, { type: "array" });
    const sheetname = wb.SheetNames[0];
    const wsheet = wb.Sheets[sheetname];
    const jsonData = XLSX.utils.sheet_to_json(wsheet);

    console.log("Read from file : " + jsonData);

    submitData = jsonData;
  };

  reader.readAsArrayBuffer(file);
});

function fetchInsertGuest(data) {
  return insertGuest(data)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

async function insertGuest(data) {
  const options = {
    method: "POST",
    mode: "cors", // 1. Explicitly enable Cross-Origin Resource Sharing
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
