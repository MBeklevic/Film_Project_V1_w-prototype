const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// UI Objesini başlatma:
const ui = new UI();

// Storage Objesi üretme:
const storage = new Storage();

// Tüm Eventleri Yükleme:

addEventlisteners();

function addEventlisteners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films); //Sayfamız yüklendiğinde daha önceden storage a eklediğimiz filmleri arayüzümüze ekliyoruz.
    });

    secondCardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}
function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Hata mesajı
        ui.displayMessages("Tüm alanları doldurun!!!", "danger");
    }
    else {
        // Yeni film oluşturma 
        // console.log("Deneme");
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm); //Arayüze Film Ekleme
        storage.addFilmToStorage(newFilm); //Storage a film ekleme.
        ui.displayMessages("Film başarıyla eklendi!", "success");

    }

    ui.clearInputs(titleElement, directorElement, urlElement);




    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent); //anchor tag imizde parentına yani td ye gittik sonra 2 üstteki kardeşine gidip text contentini aldık.
        ui.displayMessages("Silme işlemi başarılı", "success");
    }

}

function clearAllFilms(e) {
    if (confirm("Emin Misiniz?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
        ui.displayMessages("Silme işlemi başarılı", "success");
    }
}
