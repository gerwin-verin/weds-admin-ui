const url = "https://weds-new-api.vercel.app/api/rsvp/";
const urlguest = "https://weds-new-api.vercel.app/api/users/";

var listRsvp = [];

$(document).ready(function async() {
  redrawList();
});

function redrawList() {
  var table = $("#table2").DataTable();

  table.clear().draw();
  fetchLoadRsvp().then(async (listRsvp) =>  {
    for (var i = 0; i < listRsvp.length; i++) {
      var details = await fetchGetGuest(listRsvp[i].documentId);
      console.log("Detail RSVP : " + details);
      console.log("List RSVP : " + listRsvp[i]);

      table.row.add([
        listRsvp[i].name,
        details.res.address,
        details.res.nohp,
        details.res.pax,
        listRsvp[i].confirmedpax,
        '<span class="badge bg-success">' +
        listRsvp[i].type +
        "</span>"
      ]).draw(false);
    }
  });
}

function fetchLoadRsvp() {
  return loadRsvp()
    .then((data) => {
      listRsvp = data.res;
      return listRsvp;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function fetchGetGuest(id) {
  return getGuest(id)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

/* CRUD */
// API
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
    const response = await fetch(url + "getListRsvp", options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("CORS or Network Error:", error);
  }
}

async function getGuest(id) {
  const options = {
    method: "POST",
    mode: "cors", // 1. Explicitly enable Cross-Origin Resource Sharing
    headers: {
      "Content-Type": "application/json",
      // 'Accept': 'application/json' (Optional: tells server what you want back)
    },
  };

  try {
    const response = await fetch(urlguest + "getGuest/" + id, options);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("CORS or Network Error:", error);
  }
}
