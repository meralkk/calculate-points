const txtNameEl = document.querySelector("#textInput");
const txtPointEl = document.querySelector("#textPoint");
const btnAdd = document.querySelector("#addButton");
const bodyListEl = document.querySelector("#bodyList");
const averageEl = document.querySelector("#average");

// For edit options
let currentName = "";
let currentPoint = "";

// Define IDs for Icons
const penToSquareId = "editIcon";
const trashId = "trashIcon";
const checkId = "checkIcon";
const cancelId = "xmarkIcon";

btnAdd.addEventListener("click", () => {
  // VALIDATION
  if (txtNameEl.value.length === 0) {
    alert("Please fill the name field!");
    txtPointEl.value = "";
    txtPointEl.focus();
    return;
  }
  if (!isNaN(txtNameEl.value)) {
    alert("Please type a valid name!");
    txtPointEl.value = "";
    txtPointEl.focus();
    return;
  }
  if (
    txtPointEl.value.length === 0 ||
    isNaN(txtPointEl.value) ||
    parseInt(txtPointEl.value) < 0 ||
    parseInt(txtPointEl.value) > 100
  ) {
    alert("Please type a valid number!");
    txtPointEl.value = "";
    txtPointEl.focus();
    return;
  }

  // ADD ROW WHEN CLICKING THE ADD BUTTON
  const newTr = document.createElement("tr");
  const rowNumber = bodyListEl.children.length + 1;
  newTr.innerHTML = `
      <th scope="row">${rowNumber}</th>
      <td contenteditable="false">${txtNameEl.value}</td>
      <td contenteditable="false">${txtPointEl.value}</td>
      <td>
      <i id="${penToSquareId}" class="fa-solid fa-pen-to-square"></i> &nbsp;
      <i id="${trashId}" class="fa-solid fa-trash"></i>&nbsp;
      <i id="${checkId}" class="fa-solid fa-square-check fa-lg d-none"></i>&nbsp;
      <i id="${cancelId}" class="fa-solid fa-square-xmark fa-lg d-none"></i>
      </td>
    `;
  txtNameEl.value = "";
  txtPointEl.value = "";
  txtNameEl.focus();

  // DELETE ROW WHEN CLICKING THE TRASH BUTTON
  bodyListEl.appendChild(newTr);
  const currentName = newTr.querySelector("td:nth-child(2)").innerText;
  const currentPoint = newTr.querySelector("td:nth-child(3)").innerText;

  const deleteButton = newTr.querySelector(`#${trashId}`);
  deleteButton.addEventListener("click", () => {
    const result = confirm(
      currentName + " adlı kişiyi silmek istediğinize emin misiniz?"
    );
    if (result) {
      // ok
      newTr.remove();
      calculateAverage();
    }
  });

  // EDIT VALUES WHEN CLICKING THE EDIT BUTTON
  const editButton = newTr.querySelector(`#${penToSquareId}`);
  const checkIcon = newTr.querySelector(`#${checkId}`);
  const cancelIcon = newTr.querySelector(`#${cancelId}`);

  editButton.addEventListener("click", () => {
    const nameCell = newTr.querySelector("td:nth-child(2)");
    const pointCell = newTr.querySelector("td:nth-child(3)");
    nameCell.contentEditable = true;
    pointCell.contentEditable = true;
    nameCell.focus();

    editButton.style.display = "none";
    deleteButton.style.display = "none";
    checkIcon.classList.remove("d-none");
    cancelIcon.classList.remove("d-none");

    // Update currentName and currentPoint
    currentName = nameCell.innerText;
    currentPoint = pointCell.innerText;
  });

  //CHECK ICON CLICK
  checkIcon.addEventListener("click", () => {
    editButton.style.display = "inline";
    deleteButton.style.display = "inline";
    checkIcon.classList.add("d-none");
    cancelIcon.classList.add("d-none");

    // Disable editing
    const nameCell = newTr.querySelector("td:nth-child(2)");
    const pointCell = newTr.querySelector("td:nth-child(3)");
    nameCell.contentEditable = false;
    pointCell.contentEditable = false;
    calculateAverage();
  });

  // cancel

  cancelIcon.addEventListener("click", () => {
    const nameCell = newTr.querySelector("td:nth-child(2)");
    const pointCell = newTr.querySelector("td:nth-child(3)");
    nameCell.innerText = currentName;
    pointCell.innerText = currentPoint;
    editButton.style.display = "inline";
    deleteButton.style.display = "inline";
    checkIcon.classList.add("d-none");
    cancelIcon.classList.add("d-none");
    // Disable editing

    nameCell.contentEditable = false;
    pointCell.contentEditable = false;
  });

  // AVERAGE POINT
  const calculateAverage = () => {
    let totalPoints = 0;
    const rows = bodyListEl.querySelectorAll("tr");

    rows.forEach((row) => {
      const pointCell = row.querySelector("td:nth-child(3)");
      const point = parseInt(pointCell.innerText);

      if (!isNaN(point)) {
        totalPoints += point;
      }
    });

    const average = rows.length > 0 ? totalPoints / rows.length : 0;
    averageEl.innerText = average.toFixed(2);
  };
  calculateAverage();
});

// KEYBOARD ENTER
txtPointEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnAdd.click();
    txtNameEl.value = "";
    txtPointEl.value = "";
    txtNameEl.focus();
  }
});
