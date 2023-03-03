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
  console.log(data.integrations);
  let features = "";
  for (let i = 1; i <= Object.keys(data.features).length; i++) {
    features += "<li>" + data.features[i].feature_name + "</li>";
  }
  let integrations = "";
  for (let i = 0; i < data.integrations.length; i++) {
    integrations += "<li>" + data.integrations[i] + "</li>";
  }
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
                        data.accuracy.description
                          ? data.accuracy.description
                          : "No Data Found"
                      }
                    </h6>
                    <div class="container text-center mt-3">
                      <div class="row gap-2">
                        <div class="col border border-1 rounded text-success p-2">
                          ${
                            data.pricing[0].price + " " + data.pricing[0].plan
                              ? data.pricing[0].price +
                                " " +
                                data.pricing[0].plan
                              : "Free of Cost/" + " " + "Basic"
                          }
                        </div>
                        <div class="col border border-1 rounded text-danger p-2">
                        ${
                          data.pricing[1].price + " " + data.pricing[1].plan
                            ? data.pricing[1].price + " " + data.pricing[1].plan
                            : "Free of Cost/" + " " + "Pro"
                        }
                        </div>
                        <div class="col border border-1 rounded text-info p-2">
                        ${
                          data.pricing[2].price + " " + data.pricing[2].plan
                            ? data.pricing[2].price + " " + data.pricing[2].plan
                            : "Free of Cost/" + " " + "Enterprise"
                        }
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-4">
                      <div>
                        <h6>Features</h6>
                        <ul>
                          ${features ? features : "No Data Found"}
                        </ul>
                      </div>
                      <div>
                        <h6>Integrations</h6>
                        <ul>
                        ${integrations ? integrations : "No Data Found"}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card" style="width: 22rem">
                  <div>
                    <img
                      style="width: 100%; height: 15rem"
                      src="${data.image_link[0]}"
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
                      ${
                        data.input_output_examples[0].input
                          ? data.input_output_examples[0].input
                          : "Can you give any example?"
                      }
                    </h5>
                    <p class="fs-6">
                    ${
                      data.input_output_examples[0].output
                        ? data.input_output_examples[0].output
                        : "No! Not Yet! Take a break!!!"
                    }
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
