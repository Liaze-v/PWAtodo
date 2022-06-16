const getDataFromBackend = async () => {
  const rest = await fetch("http://localhost:8000/users");
  const data = await rest.json();

  return data;
};

const container = document.getElementById("container");
const container2 = document.getElementById("container2");
// const openFormButton = document.getElementById("newUserButton");
// const closeFormButton = document.getElementById("closeFormButton");
// const addUserFormContainer = document.getElementById("addUserFormContainer");

// openFormButton.addEventListener("click", () => {
//   addUserFormContainer.style.display = "flex";
// });

// closeFormButton.addEventListener("click", () => {
//   addUserFormContainer.style.display = "none";
// });
//date today
const dayOfWeekDigit = new Date().getDay();
const dayList = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
// Add data to HTML
const addData = async () => {
  const data = await getDataFromBackend();

  data.forEach((value) => {
    if(value.jour==dayList[dayOfWeekDigit]){
    const div = document.createElement("div");
    div.classList.add("userContainer");
    div.innerHTML = `
        <img src="${value.image}" alt="">
        <h3>${value.name}</h3>
        <p>${value.jour}</p>
    `;

    container.append(div);
    }
  });
  data.forEach((value) => {
  const div = document.createElement("div");
  div.classList.add("userContainer");
    div.innerHTML = `
        <img src="${value.image}" alt="">
        <h3>${value.name}</h3>
        <p>${value.jour}</p>
    `;
    container2.append(div);
  });
};

addData();
