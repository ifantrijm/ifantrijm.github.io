const nav = document.getElementById('nav');

window.addEventListener('scroll', function() {
    scrollposition = window.scrollY;

    if ( scrollposition >=60 ) {
        nav.classList.add('nav-dark');
    } else if ( scrollposition <= 60 ) {
        nav.classList.remove('nav-dark')
    }
}) 

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const offset = 60;
            const position = target.offsetTop - offset;

            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});

  document.addEventListener("DOMContentLoaded", function () {
    // Fungsi untuk menjalankan animasi progress bar
    function animateProgressBar(progressBar) {
      const percentage = progressBar.getAttribute("data-percentage");
      const progressLabel = progressBar.querySelector(".progress-label");

      // Animasi width
      progressBar.style.width = percentage + "%";

      // Update label secara bertahap
      let currentPercentage = 0;
      const interval = setInterval(() => {
        if (currentPercentage >= percentage) {
          clearInterval(interval);
        } else {
          currentPercentage++;
          progressLabel.textContent = currentPercentage + "%";
        }
      }, 15); // Kecepatan update label
    }

    // Observer untuk mendeteksi saat elemen masuk ke viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target;
            animateProgressBar(progressBar);
            observer.unobserve(progressBar); // Hentikan observasi setelah animasi selesai
          }
        });
      },
      { threshold: 0.5 } // Setidaknya 50% elemen terlihat
    );

    // Pilih semua elemen progress bar
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((progressBar) => observer.observe(progressBar));
  });


  // contact form===================================
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah pengiriman default form

    const submitButton = document.querySelector("#contact-form button[type='submit']");
    
    submitButton.disabled = true; // Nonaktifkan tombol saat submit
    submitButton.textContent = "Mengirim..."; // Ubah teks tombol saat loading

    // Ambil nilai input, jika kosong ganti dengan "-"
    const formData = {
        nama: document.getElementById("nama").value,
        email: document.getElementById("email").value,
        Bidang: document.getElementById("pt").value.trim() === "" ? "-" : document.getElementById("pt").value,
        pesan: document.getElementById("pesan").value
    };

    fetch("https://formspree.io/f/mzblryak", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Gagal mengirim formulir");
        }
        return response.json();
    })
    .then(data => {
        submitButton.textContent = "Terkirim, Terima Kasih!"; // Ubah teks tombol setelah sukses
        document.getElementById("contact-form").reset(); // Reset formulir
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan, coba lagi!");
        submitButton.textContent = "Kirim"; // Jika gagal, kembalikan teks tombol
    })
    .finally(() => {
        setTimeout(() => {
            submitButton.disabled = false; // Aktifkan kembali tombol setelah beberapa detik
            submitButton.textContent = "Kirim"; // Kembalikan teks tombol
        }, 3000); // Tombol kembali normal setelah 3 detik
    });
});
  // contact form===================================



// date and time====================================
function updateTime() {
  const optionsTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const now = new Date();

  // Tambahkan 7 jam untuk Waktu Indonesia Barat (WIB)
  const waktuWIB = new Date(now.getTime() + (0 * 60 * 60 * 1000));

  // Format tanggal
  const tanggal = waktuWIB.toLocaleDateString('id-ID', optionsTanggal);
  document.getElementById('tanggal').textContent = tanggal;

  // Format waktu
  const waktu = waktuWIB.toTimeString().split(' ')[0]; // Mengambil HH:MM:SS
  document.getElementById('waktu').textContent = waktu;
}

// Perbarui waktu setiap detik
setInterval(updateTime, 1000);

// Panggil fungsi pertama kali saat halaman dimuat
updateTime();
// date and time====================================



// navbar link======================================

// navbar link======================================