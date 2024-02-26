const loardData = async (searchText = "12", isShowAll) => {
    const respons = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await respons.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    const container = document.getElementById("container");
    container.textContent = "";
    const showBtn = document.getElementById("show-btn");
    // show four data
    if (phones.length > 6 && !isShowAll) {
        showBtn.classList.remove("hidden");
    } else {
        showBtn.classList.add("hidden");
    }
    if (!isShowAll) {
        phones = phones.slice(0, 6);
    }
    // console.log("Show all ", isShowAll);
    // console.log(phones);
    phones.forEach((phone) => {
        // console.log(phone);
        const phoneCart = document.createElement("div");
        phoneCart.classList = "card w-96 md:w-80 bg-base-100 border-2  shadow-xl mb-4 gap-4";
        phoneCart.innerHTML = `
        <figure><img src=${phone.image}></figure>
        <div class="card-body p-4 mt-4">
        <h2 class="text-center text-4xl font-semibold">${phone.phone_name}</h2>
        <p class ="text-center text-4x">If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button onclick="handleShowDetails('${phone.slug}');
       show_modal.showModal()"
        class="btn btn-primary w-full text-xl ">Buy Now</button>
        </div>
        </div>
        `;
        container.appendChild(phoneCart);
    });
    toggleLoadingSpinner(false);
};

// serach handler
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const serchFild = document.getElementById("serach-input");
    const serachText = serchFild.value;
    loardData(serachText, isShowAll);
    // serchFild.value = "";
};
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
};
// handleShow Details
const handleShowDetails = async (id) => {
    // console.log("Clicked handle show details", id);
    const respons = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);

    const data = await respons.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
    console.log(phone.mainFeatures);
    show_modal.showModal(phone);
    const showDetailsContainer = document.getElementById("show-details-container");
    showDetailsContainer.innerHTML = `
    <p class ="text-center text-4xl">${phone.name}</p>
           <figure class="max-w-none mx-auto mt-2 "><img  src=${phone.image}></figure>
        <div class="card-body py-2 ">
        <h2 class="text-center text-xl font-semibold">${phone.mainFeatures.displaySize}</h2>
        <div class="card-actions justify-end">
        </div>
        </div>
    `;
};
// it is toggle show All button
const handleShowAll = () => {
    handleSearch(true);
};
loardData();
