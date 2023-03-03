const fetchData = (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data.tools, dataLimit));
};

const showData = (data, dataLimit) => {
  const getClass = document.getElementById("insert-div");
  getClass.innerHTML = "";
  const seeMore = document.getElementById("see-more");

  if (dataLimit && data.length > 6) {
    seeMore.classList.add("d-none");
  } else {
    data = data.slice(0, 6);
    seeMore.classList.remove("d-none");
  }
  // console.log(data[0].published_in);
  // let arra = [];
  // for (let n = 0; n < 12; n++) {
  //   let value1 = data[n].published_in;
  //   arra.push(value1);
  // }
  // console.log(arra);

  data.forEach((element) => {
    let html = "";
    for (let i = 0; i < element.features.length; i++) {
      html += "<li>" + element.features[i] + "</li>";
    }
    getClass.innerHTML += `
    <div class="col">
          <div class="card">
            <img src="${
              element.image
            }" style="width: 100%; height: 15rem" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <ol>${html ? html : "No Data Found"}</ol>
              <hr />
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-title">${element.name}</h5>
                  <i class="fa-solid fa-calendar-days"></i><span> ${
                    element.published_in
                  }</span>
                </div>
                <div class="my-auto">
                  <button
                    type="button"
                    class="btn btn-light" data-bs-toggle="modal"
                    data-bs-target="#exampleModal""
                    style="border-radius: 50%"
                  >
                    <i class="fa-solid fa-arrow-right text-danger"></i>
                   
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  loadSpinner(false);
};

const loadSpinner = (isLoading) => {
  const loadingId = document.getElementById("load-spinner");
  if (isLoading) {
    loadingId.classList.remove("d-none");
  } else {
    loadingId.classList.add("d-none");
  }
};

const dataLimit = () => {
  loadSpinner(true);
  fetchData(10);
};

loadSpinner(true);
fetchData();
