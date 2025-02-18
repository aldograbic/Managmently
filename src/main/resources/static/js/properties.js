function formatAmount(amount) {
  return "€" + parseFloat(amount).toFixed(2);
}

function searchProperties() {
  const query = document.getElementById("searchProperties").value;

  fetch(`/searchProperties?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      const propertiesContainer = document.querySelector(
        "#propertiesContainer"
      );
      propertiesContainer.innerHTML = "";

      if (data.length === 0) {
        propertiesContainer.innerHTML =
          '<p class="text-center mx-auto col-span-3 py-4">No results found</p>';
      } else {
        data.forEach((property) => {
          const card = document.createElement("div");
          card.className = "border border-gray-200 rounded-lg shadow-lg";

          card.innerHTML = `
              <div class="relative">
                <img src="img/property-placeholder.png" alt="Property image" class="w-full rounded-t-lg">
                <span class="absolute min-w-[4rem] text-center bottom-0 right-0 p-2 mb-2 mr-2 pointer-events-none bg-blue-100/75 rounded-full">
                  <span>${property.status}</span>
                </span>
              </div>
  
              <div class="flex justify-between items-center p-4">
                <h2>${property.name}</h2>
                <div class="flex gap-4" x-data="{ deleteProperty: false, updateProperty: false }">
                <svg @click="updateProperty =! updateProperty"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>

                <div x-show="updateProperty" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" x-cloak>
                  <div class="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
                    <div x-cloak @click="updateProperty = false" x-show="updateProperty" x-transition:enter="transition ease-out duration-300 transform" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-200 transform" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40" aria-hidden="true"></div>
                    <div x-cloak x-show="updateProperty" x-transition:enter="transition ease-out duration-300 transform" x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" x-transition:leave="transition ease-in duration-200 transform" x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" class="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                      <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold">
                          Update the property
                        </h2>
                        <a href="javascript:void(0)" @click="updateProperty = false" class="text-gray-600 focus:outline-none hover:text-gray-700 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </a>
                      </div>

                      <p class="mt-2 text-sm text-gray-500">
                        Update information about the property or add missing
                        information.
                      </p>

                      <form action="/updateProperty" method="post" class="mt-5 space-y-4">
                        <input type="hidden" name=" id"value=${property.id}/>
                        <div class="relative">
                          <input type="text" id="name" name="name" class="peer" placeholder="" value=${
                            property.name
                          }/>
                          <label for="name" class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                          Property name</label>
                        </div>

                        <div class="relative">
                          <select type="text" id="type" name="type" class="peer" placeholder="">
                            <option th:selected=${
                              property.type == "House"
                            } value="House">
                              House
                            </option>
                            <option
                              th:selected="${property.type == "Apartment"}"
                              value="Apartment">
                              Apartment
                            </option>
                            <option
                              th:selected="${property.type == "Condominium"}"
                              value="Condominium">
                              Condominium
                            </option>
                          </select>
                          <label for="type" class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4" >
                            Property type
                          </label>
                        </div>

                        <div class="relative">
                          <input type="text" id="location" name="location" class="peer" placeholder="" value=${
                            property.location
                          }/>
                          <label for="location" class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                            Property location
                          </label>
                        </div>

                        <div class="relative">
                          <input type="text" id="size" name="size" class="peer" placeholder="" value=${property.size.toFixed(
                            1
                          )}/>
                          <label for="size" class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                            Property size
                          </label>
                        </div>

                        <div class="relative">
                          <input
                            type="text"
                            id="bedrooms"
                            name="bedrooms"
                            class="peer"
                            placeholder=""
                            value=${property.bedrooms}
                          />
                          <label
                            for="bedrooms"
                            class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                            >Bedrooms</label
                          >
                        </div>

                        <div class="relative">
                          <input
                            type="text"
                            id="bathrooms"
                            name="bathrooms"
                            class="peer"
                            placeholder=""
                            value=${property.bathrooms}
                          />
                          <label
                            for="bathrooms"
                            class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                            >Bathrooms</label
                          >
                        </div>

                        <div class="relative">
                          <input
                            type="text"
                            id="price"
                            name="price"
                            class="peer"
                            placeholder=""
                            value=${property.price}
                          />
                          <label
                            for="price"
                            class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                            >Price</label
                          >
                        </div>

                        <div class="relative">
                          <select
                            type="text"
                            id="status"
                            name="status"
                            class="peer"
                            placeholder=""
                          >
                            <option
                              th:selected="${property.status == "Available"}"
                              value="Available"
                            >Available</option>
                            <option
                              th:selected="${property.status == "Occupied"}"
                              value="Occupied"
                            >Occupied</option>
                            <option
                              th:selected="${property.status == "Construction"}"
                              value="Construction"
                            >Construction</option>
                          </select>
                          <label
                            for="status"
                            class="peer-focus:px-2 peer-focus:text-blue-700 peer-focus:dark:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                            >Status</label
                          >
                        </div>

                        <div class="flex justify-end mt-8">
                          <input type="submit" value="Submit" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <svg
                  @click="deleteProperty =!deleteProperty"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <div
                  x-show="deleteProperty"
                  class="fixed inset-0 z-50 overflow-y-auto"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                  x-cloak
                >
                  <div
                    class="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0"
                  >
                    <div
                      x-cloak
                      @click="deleteProperty = false"
                      x-show="deleteProperty"
                      x-transition:enter="transition ease-out duration-300 transform"
                      x-transition:enter-start="opacity-0"
                      x-transition:enter-end="opacity-100"
                      x-transition:leave="transition ease-in duration-200 transform"
                      x-transition:leave-start="opacity-100"
                      x-transition:leave-end="opacity-0"
                      class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
                      aria-hidden="true"
                    ></div>

                    <div
                      x-cloak
                      x-show="deleteProperty"
                      x-transition:enter="transition ease-out duration-300 transform"
                      x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                      x-transition:leave="transition ease-in duration-200 transform"
                      x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                      x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      class="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl"
                    >
                      <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold">
                          Are you sure you want to delete this property?
                        </h2>
                        <a
                          href="javascript:void(0)"
                          @click="deleteProperty = false"
                          class="text-gray-600 focus:outline-none hover:text-gray-700 mb-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </a>
                      </div>

                      <div class="space-y-4">
                        <p>
                          Property Name: <span>${property.name}</span>
                        </p>
                        <p>
                          Location: <span>${property.location}</span>
                        </p>
                        <p>
                          Please note that deleting this property will
                          permanently remove it from the system, along with all
                          associated information, including any tenant records,
                          payment history, and lease documents.
                        </p>
                        <p>This action cannot be undone.</p>
                      </div>
                      <div class="justify-around items-center mt-4 space-y-4">
                        <form action="/deleteProperty/${property.id}"
                          method="post"
                        >
                          <input
                            type="submit"
                            value="Delete"
                            style="background-color: #d11a2a"
                          />
                        </form>
                        <button
                          @click="deleteProperty = false"
                          class="button bg-gray-100 hover:bg-gray-200 text-black"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              </div>
  
              <div class="flex items-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
                </svg>
                <p>${property.type}</p>
              </div>
  
              <div class="flex items-center px-4 py-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p>${property.location}</p>
              </div>
            `;

          propertiesContainer.appendChild(card);
        });
      }
    })
    .catch((error) => console.error("Error:", error));
}
