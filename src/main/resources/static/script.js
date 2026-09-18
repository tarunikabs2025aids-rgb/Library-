const API_URL = "/library";


// ===============================
// ADD LIBRARY
// ===============================
function addLibrary() {

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const journals = document.getElementById("journals").value;

    if (name === "" || location === "" || phoneNumber === "" || journals === "") {
        alert("Please fill all fields");
        return;
    }

    const library = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        journals: journals
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(library)
    })
        .then(response => response.json())
        .then(data => {

            alert("Library added successfully!");

            document.getElementById("name").value = "";
            document.getElementById("location").value = "";
            document.getElementById("phoneNumber").value = "";
            document.getElementById("journals").value = "";

            getLibraries();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to add library");
        });
}


// ===============================
// GET ALL LIBRARIES
// ===============================
function getLibraries() {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            const tableBody =
                document.getElementById("libraryTableBody");

            tableBody.innerHTML = "";

            data.forEach(library => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${library.id}</td>
                    <td>${library.name}</td>
                    <td>${library.location}</td>
                    <td>${library.phoneNumber}</td>
                    <td>${library.journals}</td>

                    <td>
                        <button onclick="updateLibrary(${library.id})">
                            Update
                        </button>

                        <button onclick="deleteLibrary(${library.id})">
                            Delete
                        </button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}


// ===============================
// UPDATE LIBRARY
// ===============================
function updateLibrary(id) {

    const name = prompt("Enter new library name:");

    if (name === null) {
        return;
    }

    const location = prompt("Enter new location:");

    if (location === null) {
        return;
    }

    const phoneNumber = prompt("Enter new phone number:");

    if (phoneNumber === null) {
        return;
    }

    const journals = prompt("Enter new journals:");

    if (journals === null) {
        return;
    }

    const library = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        journals: journals
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(library)
    })
        .then(response => response.json())
        .then(data => {

            alert("Library updated successfully!");

            getLibraries();
        })
        .catch(error => {

            console.error("Error:", error);

            alert("Failed to update library");
        });
}


// ===============================
// DELETE LIBRARY
// ===============================
function deleteLibrary(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this library?");

    if (!confirmDelete) {
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
        .then(response => response.text())
        .then(data => {

            alert(data);

            getLibraries();
        })
        .catch(error => {

            console.error("Error:", error);

            alert("Failed to delete library");
        });
}


// ===============================
// LOAD DATA WHEN PAGE OPENS
// ===============================
window.onload = function () {
    getLibraries();
};