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
                    onclick="detailsFetch('${element.id}')"
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

const detailsFetch = (id) => {
  const url1 = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url1)
    .then((res) => res.json())
    .then((data) => detailsShow(data.data));
};

const detailsShow = (data) => {
  const showModal = document.getElementById("show-modal");
  console.log(data);
  showModal.innerHTML = `
  <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
  <div
                class="modal-body d-flex flex-column flex-lg-row gap-4 mx-auto"
              >
                <div class="card border border-danger" style="width: 22rem">
                  <div class="card-body">
                    <h6>
                      ${
                        data.accuracy.descripton
                          ? data.accuracy.descripton
                          : "No Data Found"
                      }
                    </h6>
                    <div class="container text-center mt-3">
                      <div class="row gap-2">
                        <div class="col border border-1 rounded text-success">
                          /Basic
                        </div>
                        <div class="col border border-1 rounded text-danger">
                          /month pro
                        </div>
                        <div class="col border border-1 rounded text-info">
                          /Enterprise
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-4">
                      <div>
                        <h6>Features</h6>
                        <ul>
                          <li>Customize response</li>
                        </ul>
                      </div>
                      <div>
                        <h6>Integrations</h6>
                        <ul>
                          <li>No Data Found</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card" style="width: 18rem">
                  <div>
                    <img
                      style="width: 100%; height: 15rem"
                      src="Bleach1.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <p
                      class="text-white position-absolute top-0 end-0 bg-danger p-1 border-0 rounded m-1"
                    >
                      Accuracy
                    </p>
                  </div>

                  <div class="card-body text-center">
                    <h5>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </h5>
                    <p class="fs-6">
                      I'm doing well, thank you for asking. How can I assist you
                      today?
                    </p>
                  </div>
                </div>
              </div>
  `;
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
