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
    // const arra12 = [];
    // for (let n = 0; n < 12; n++) {
    //   arra12.push(data[n].published_in);
    // }
    // console.log(arra12);
    // data.sort((a,b) => new Date(arra12))
  } else {
    data = data.slice(0, 6);
    seeMore.classList.remove("d-none");
    // const arra6 = [];
    // for (let n = 0; n < 6; n++) {
    //   arra6.push(data[n].published_in);
    // }
    // console.log(arra6);
  }

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
            }" style="width: 100%; height: 25rem" class="card-img-top" alt="..." />
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
  let features = "";
  for (let i = 1; i <= Object.keys(data.features).length; i++) {
    features += "<li>" + data.features[i].feature_name + "</li>";
  }

  let pricing1 = "";
  let pricing2 = "";
  let pricing3 = "";
  let noPricing1 = "";
  let noPricing2 = "";
  let noPricing3 = "";
  if (data.pricing == null) {
    noPricing1 = "Free of Cost/" + " " + "Basic";
    noPricing2 = "Free of Cost/" + " " + "Pro";
    noPricing3 = "Free of Cost/" + " " + "Enterprise";
  } else {
    pricing1 = data.pricing[0].price + " " + data.pricing[0].plan;
    pricing2 = data.pricing[1].price + " " + data.pricing[1].plan;
    pricing3 = data.pricing[2].price + " " + data.pricing[2].plan;
  }

  let noIntegrations = "";
  let integrations = "";
  if (data.integrations == null) {
    noIntegrations = "No Data Found";
  } else {
    for (let i = 0; i < data.integrations.length; i++) {
      integrations += "<li>" + data.integrations[i] + "</li>";
    }
  }

  let showAccuracy = "";
  if (data.accuracy.score == null) {
  } else {
    showAccuracy = data.accuracy.score * 100 + "% acuuracy";
  }

  let input = "";
  let output = "";
  let noInput = "";
  let noOutput = "";
  if (data.input_output_examples == null) {
    noInput = "Can you give any example?";
    noOutput = "No! Not Yet! Take a break!!!";
  } else {
    input = data.input_output_examples[0].input;
    output = data.input_output_examples[0].output;
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
                          ${pricing1 ? pricing1 : noPricing1}
                        </div>
                        <div class="col border border-1 rounded text-danger p-2">
                        ${pricing2 ? pricing2 : noPricing2}
                        </div>
                        <div class="col border border-1 rounded text-info p-2">
                        ${pricing3 ? pricing3 : noPricing3}
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
                        ${integrations ? integrations : noIntegrations}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card" style="width: 22rem">
                  <div>
                    <img
                    class="container1"
                      style="width: 100%; height: 15rem"
                      src=" ${
                        data.image_link[0]
                          ? data.image_link[0]
                          : "No Image Found"
                      }"
                      class="card-img-top"
                      alt="..."
                    />
                    <p
                      class="text-white position-absolute top-0 end-0 bg-danger border-0 rounded m-1"
                    >
                      ${showAccuracy}
                    </p>
                  </div>

                  <div class="card-body text-center">
                    <h5>
                      ${input ? input : noInput}
                    </h5>
                    <p class="fs-6">
                    ${output ? output : noOutput}
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
