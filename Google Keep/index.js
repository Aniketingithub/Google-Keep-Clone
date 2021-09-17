const addBtn = document.querySelector("#add");

const updateLSD = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((ele) => {
    return notes.push(ele.value);
  });
  // console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="note">
      <div class="opr">
        <button class="btn delete float-end"><i class="bi-trash-fill"></i></button>
        <button class="btn edit float-end"><i class="bi-pencil-square"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea style="margin-top: 20px;" class="form-control ${
        text ? "hidden" : ""
      }" rows="5"></textarea>
    </div>`;

  note.insertAdjacentHTML("afterbegin", htmlData);
  const editBtn = note.querySelector(".edit");
  const delBtn = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // delete the node
  delBtn.addEventListener("click", () => {
    note.remove();
    updateLSD();
  });

  textArea.value = text;
  mainDiv.innerHTML = text;

  // toggle using edit
  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const Value = event.target.value;
    mainDiv.innerHTML = Value;

    updateLSD();
  });
  document.querySelector("#Note").appendChild(note);
};

// // getting data back
const getData = JSON.parse(localStorage.getItem('notes'));

if (getData) {
  getData.forEach((ele) => addNote(ele));
}

addBtn.addEventListener("click", () => addNote());

// ---------------------------------------------------------------