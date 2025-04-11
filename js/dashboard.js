let tests = JSON.parse(localStorage.getItem("tests"))

if (!tests) {
    tests = [

        {
            id: 1,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 2,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 3,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 4,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 5,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 6,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 7,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 8,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },
        {
            id: 9,
            title: "Thách thức sự hiểu biết của bạn",
            category: "Đời sống",
            emoji: "🏠",
            questionCount: 15,
            playCount: 1,
            image: "/Project_Frontend_Fundamental/assets/images/image 1.png"
        },


    ]
    localStorage.setItem("tests", JSON.stringify(tests))
}

const gridContainer = document.querySelector(".grid-container")
const rowsPerPage = 8;
let currentPage = 1;
function renderTests() {
    gridContainer.innerHTML = ""
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = tests.slice(start, end);
    for(let i = 0;i<paginatedItems.length;i++){
        const test = paginatedItems[i];
        const testHTML = `
        <div class="container-contain">
          <div>
            <img src="${test.image}" alt="">
          </div>
          <div>
            <ul>
              <li>${test.emoji} ${test.category}</li>
              <li>${test.title}</li>
              <li>${test.questionCount} câu hỏi - ${test.playCount} lượt chơi</li>
              <li><button>Chơi</button></li>
            </ul>
          </div>
        </div>
      `;
        gridContainer.innerHTML += testHTML
    }
    renderPagination()
}

function renderPagination(){
    const pagination = document.getElementById("pageNumbers")
    pagination.innerHTML = ""
    const totalPages = Math.ceil(tests.length / rowsPerPage)
    for(let i = 1; i <= totalPages; i++){
        const btn = document.createElement("button")
        btn.textContent = i
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderTests();
        })
        pagination.appendChild(btn)
    }
}
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTests();
    }
}

function nextPage() {
    const totalPages = Math.ceil(tests.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTests();
    }
}
renderTests()