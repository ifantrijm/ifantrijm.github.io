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



// progress bar======================================
        let option = {
            startAngle: -1.55,
            size: 150,
            value: 0.85,
            fill: {
                  gradient: ['#FF9100', '#FFD180']
                // gradient: ['#a445b2', '#fa4299']
            }
        };

        $(".circle .bar").circleProgress(option).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
        });

        $(".office .bar").circleProgress({value: 0.80});

        $(".html .bar").circleProgress({value: 0.70});

        $(".js .bar").circleProgress({value: 0.20});

        $(".php .bar").circleProgress({value: 0.60});
// progress bar======================================


// pesan dan kesan======================================
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyS--KLeGJWhoElcAfG3d8qhyYYuDlgOxLPudwYOmqanVnGiQ5ecwoMweORoE9DVRIu/exec'
        const form = document.forms['coment_user']
        const btnKirim = document.querySelector('.btn-kirim');
        const btnLoading = document.querySelector('.btn-loading');
        const infoAdd = document.querySelector('.info-add');

        form.addEventListener('submit', e => {
            e.preventDefault();
            btnLoading.classList.toggle('d-none');
            btnKirim.classList.toggle('d-none');
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => response.json()) // Pastikan untuk mengembalikan response.json()
            .then(data => {
                // Simpan ID dan waktu setelah berhasil mengirim data
                if (data.status === 'success') {
                    localStorage.setItem('lastCommentId', data.id); // ID baris komentar
                    localStorage.setItem('commentTime', Date.now()); // Waktu kirim (timestamp)
                }

                btnLoading.classList.toggle('d-none');
                btnKirim.classList.toggle('d-none');      
                infoAdd.classList.toggle('d-none');
                setTimeout(() => {
                    infoAdd.classList.toggle('d-none');
                }, 3000);

                form.reset();
                tampilkanKomentar(); // Tambahkan ini agar langsung muncul komentar baru
                console.log('Success!', response)              
            })
            .catch(error => console.error('Error!', error.message))
        });

        // tampil komentar
        function tampilkanKomentar() {
            fetch(scriptURL)
                .then(res => res.json())
                .then(data => {
                    const container = document.getElementById('comment-list');
                    container.innerHTML = '';

                    const lastId = localStorage.getItem('lastCommentId');
                    const timeSaved = localStorage.getItem('commentTime');
                    const now = Date.now();

                    const showDelete = lastId && timeSaved && (now - timeSaved < 5000); // 5 detik

                    data.reverse().forEach(item => {
                        const col = document.createElement('div');
                        col.className = 'col-md-4  d-flex g-3 justify-content-center align-items-center box-coment';

                        const span = document.createElement('span');
                        span.className = 'form-control output-comment';
                        span.id = 'comment-list-container';
                        span.innerHTML = `
                          <label class="fw-bold col-6-fs-1 text-uppercase text-break"> ${item.nama}:</label>
                          <h6 class="text-break">${item.pesan}</h6>
                        `;

                        // Tampilkan tombol hapus hanya jika komentar adalah komentar terakhir dan masih dalam 5 detik
                        if (item.id == lastId && showDelete) {
                            const deleteBtn = document.createElement('button');
                            deleteBtn.className = 'delete';
                            deleteBtn.style = 'position: absolute; bottom: 25px; right: 10px;';
                            deleteBtn.innerHTML = `<font color="red" size="5" class="fw-bold"><i class="bi bi-trash3-fill"></i></font>`;
                            deleteBtn.addEventListener('click', () => {
                                if (confirm('Hai kamu ingin menghapus komentar ini?')) {
                                    hapusKomentar(item.id);
                                }
                            });
                            span.appendChild(deleteBtn);
                        }

                        col.appendChild(span);
                        container.appendChild(col);

                                        // Hilangkan delete setelah 5 detik
                        setTimeout(() => {
                            const deleteBtn = span.querySelector('.delete');
                            if (deleteBtn) deleteBtn.remove();
                        }, 5000);
                    });

                    // Jika waktu 5 detik sudah lewat, hapus data lokal agar tidak muncul lagi saat reload
                    if (!showDelete) {
                        localStorage.removeItem('lastCommentId');
                        localStorage.removeItem('commentTime');
                    }
                })
                .catch(err => console.error('Gagal ambil data:', err));
        }

        // hapus komentar
        function hapusKomentar(id) {
          fetch(scriptURL, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: new URLSearchParams({action:'delete', id})
          })
          .then(r => r.json())
          .then(res => {
            if (res.status === 'success') tampilkanKomentar();
            else alert(res.message);
          })
          .catch(err => alert(err));
        }            

        // char-counter
        const counterResetFunctions = {}; // Simpan semua fungsi reset counter
        function setupCounter(inputId, counterId, maxLength) {
          const input = document.getElementById(inputId);
          const counter = document.getElementById(counterId);

          function updateCounter() {
            const length = input.value.length;
            counter.textContent = `${length}/${maxLength}`;

            if (length >= maxLength) {
              counter.classList.add('exceeded');
            } else {
              counter.classList.remove('exceeded');
            }
          }

          // Simpan fungsi update counter agar bisa dipanggil setelah reset
          counterResetFunctions[inputId] = updateCounter;

          // Jalankan update pertama kali (kalau ada nilai awal)
          updateCounter();

          // Event saat input berubah
          input.addEventListener('input', updateCounter);
        }

        // Inisialisasi untuk input nama dan pesan
        setupCounter('nama', 'charCounterNama', 10);
        setupCounter('pesan', 'charCounterPesan', 30);

        // Saat submit
        form.addEventListener('submit', (e) => {
          e.preventDefault();

          // ... kirim data dengan fetch, dll.

          form.reset(); // Reset form

          // Reset counter setelah form di-reset
          for (const resetFunc of Object.values(counterResetFunctions)) {
            resetFunc();
          }
        });
        // end char-counter

        window.addEventListener('load', tampilkanKomentar);

// pesan dan kesan======================================

    // Nonaktifkan klik kanan
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Nonaktifkan shortcut keyboard
    document.addEventListener('keydown', function(e) {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.ctrlKey && e.keyCode === 83)    // Ctrl+S
      ) {
        e.preventDefault();
      }
    });
    // Nonaktifkan klik kanan