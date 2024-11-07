const prompt = require("prompt-sync")();
const axios = require("axios"); // To make HTTP requests to the Express server

const API_URL = "http://localhost:4000/api/books"; // Adjust according to your API endpoint

// Function to add a new book
async function addBook() {
  const title = prompt("Masukkan judul buku: ");
  const category = prompt("Masukkan kategori buku: ");
  const author = prompt("Masukkan penulis buku: ");
  const genre = prompt("Masukkan genre buku: ");
  const price = parseFloat(prompt("Enter book price: "));

  try {
    const response = await axios.post(
      `${API_URL}/addBuku`,
      {
        title,
        category,
        author,
        genre,
        price,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure this header is set
        },
      }
    );
    console.log("Book berhasil ditambahkan:", response.data);
  } catch (error) {
    console.log(
      "Error adding book:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to show all books
async function showBooks() {
  try {
    const response = await axios.get(API_URL);
    console.log("Buku ditemukan:", response.data);
  } catch (error) {
    console.log(
      "Error fetching books:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to search a book by title
async function searchBook() {
  const title = prompt("Masukkan judul buku yang ingin dicari: ");
  try {
    const response = await axios.get(`${API_URL}/title/${title}`);
    console.log("Buku ditemukan:", response.data);
  } catch (error) {
    console.log(
      "Error searching for book:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to delete a book by title
async function deleteBook() {
  const title = prompt("Masukkan judul buku yang akan dihapus: ");
  try {
    const response = await axios.delete(`${API_URL}/title/${title}`);
    console.log(`Buku dengan judul '${title}' telah dihapus.`, response.data);
  } catch (error) {
    console.log(
      "Error deleting book:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to search for books by price
async function searchBookByPrice() {
  const price = parseFloat(prompt("Masukkan harga buku: "));
  try {
    const response = await axios.get(`${API_URL}/price/${price}`);
    if (response.data.length > 0) {
      console.log(`Buku dengan harga ${price}: `, response.data);
    } else {
      console.log(`No books found with price ${price}.`);
    }
  } catch (error) {
    console.log(
      "Error searching books by price:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to update a book by title
async function updateBook() {
  const title = prompt("Masukkan judul buku yang ingin di-update: ");
  const category = prompt(
    "Masukkan kategori baru (kosongkan jika tidak mau diganti): "
  );
  const author = prompt(
    "Masukkan penulis baru (kosongkan jika tidak mau diganti): "
  );
  const genre = prompt(
    "Masukkan genre baru (kosongkan jika tidak mau diganti): "
  );
  const price = prompt(
    "Masukkan harga baru (kosongkan jika tidak mau diganti): "
  );

  // Filter out any blank inputs so that only fields with values are updated
  const updateData = {};
  if (category) updateData.category = category;
  if (author) updateData.author = author;
  if (genre) updateData.genre = genre;
  if (price) updateData.price = parseFloat(price);

  try {
    const response = await axios.put(`${API_URL}/title/${title}`, updateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Book successfully updated:", response.data);
  } catch (error) {
    console.log(
      "Error updating book:",
      error.response ? error.response.data : error.message
    );
  }
}

// Display menu and prompt user for choice
async function displayMenu() {
  while (true) {
    console.log("\nMenu:");
    console.log("1. Tambah buku");
    console.log("2. Tampilkan semua buku");
    console.log("3. Cari buku berdasarkan judul");
    console.log("4. Hapus buku berdasarkan judul");
    console.log("5. Cari buku berdasarkan harga");
    console.log("6. Update data buku berdasarkan judul");
    console.log("7. Keluar");

    const choice = prompt("Masukkan pilihan: ");

    switch (choice) {
      case "1":
        await addBook();
        break;

      case "2":
        await showBooks();
        break;

      case "3":
        await searchBook();
        break;

      case "4":
        await deleteBook();
        break;

      case "5":
        await searchBookByPrice();
        break;

      case "6":
        await updateBook();
        break;

      case "7":
        console.log("Keluar dari aplikasi.");
        process.exit();

      default:
        console.log("Pilihan invalid, coba lagi!");
        break;
    }
  }
}

// Start the CLI application
displayMenu();
