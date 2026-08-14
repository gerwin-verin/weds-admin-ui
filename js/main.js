const url = "https://weds-new-api.vercel.app/api/users/";
const urlrsvp = "https://weds-new-api.vercel.app/api/rsvp/";

var listGuest = [];
var listRsvp = [];

$(document).ready(function () {
    redrawList();
});

async function redrawList() {
    listGuest = await fetchLoadGuest();
    listRsvp = await fetchLoadRsvp();

    console.log("List Guest: " + listGuest);
    console.log("List RSVP: " + listRsvp);

    var countPax = 0;
    var countName = 0;
    var countGereja = 0;
    var countGerejaPax = 0;
    var countGerejaResepsi = 0;
    var countGerejaResepsiPax = 0;
    
    countName = listGuest.length;
    for (var i = 0; i < listGuest.length; i++) {
        countPax += parseInt(listGuest[i].pax);
    }

    for (var j = 0; j < listRsvp.length; j++) {
        if (listRsvp[j].type == "Gereja") {
            countGereja++;
            countGerejaPax += parseInt(listRsvp[j].confirmedpax);
        } else if (listRsvp[j].type == "Gereja Resepsi") {
            countGerejaResepsi++;
            countGerejaResepsiPax += parseInt(listRsvp[j].confirmedpax);
        }
    }

    document.getElementById("txtJumlahTamu").textContent = countName + " Undangan | " + countPax + " (Pax) ";
    document.getElementById("txtTamuGereja").textContent = countGereja + " Undangan | " + countGerejaPax + " (Pax) ";
    document.getElementById("txtTamuGerejaResepsi").textContent = countGerejaResepsi + " Undangan | " + countGerejaResepsiPax + " (Pax) ";
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

function fetchLoadRsvp() {
  return loadRsvp()
    .then((data) => {
      listRsvp = data.res;
      console.log(listRsvp);
      return listRsvp;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

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

async function loadRsvp() {
  const options = {
    method: "GET",
    mode: "cors", // 1. Explicitly enable Cross-Origin Resource Sharing
    headers: {
      "Content-Type": "application/json",
      // 'Accept': 'application/json' (Optional: tells server what you want back)
    },
  };

  try {
    const response = await fetch(urlrsvp + "getListRsvp", options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("CORS or Network Error:", error);
  }
}
