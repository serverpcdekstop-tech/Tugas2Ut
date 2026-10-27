<template>
  <div class="container-fluid py-4 mt-5">
    <!-- Header -->
    <div
      class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 p-4 bg-white rounded-4 shadow-sm border"
    >
      <div>
        <h3 class="fw-bold text-dark mb-1">
          <i class="bi bi-journal-bookmark-fill text-success me-2"></i>
          Data Stok Bahan Ajar
        </h3>
        <p class="text-secondary mb-0">
          Kelola dan pantau persediaan bahan ajar dengan mudah.
        </p>
      </div>

      <!-- Filter dan pencarian -->

      <div class="d-flex flex-wrap align-items-center gap-2">
        <!-- Filter kategori -->
        <select
          v-model="pilihKategori"
          class="form-select"
          style="width: 170px"
        >
          <option value="">Semua Kategori</option>
          <option
            v-for="kategori in data.kategoriList"
            :key="kategori"
            :value="kategori"
          >
            {{ kategori }}
          </option>
        </select>

        <!-- Filter UPBJJ -->
        <select v-model="pilihUpbjj" class="form-select" style="width: 170px">
          <option value="">Semua UPBJJ</option>
          <option v-for="upbjj in data.upbjjList" :key="upbjj" :value="upbjj">
            {{ upbjj }}
          </option>
        </select>

        <!-- Pencarian -->
        <div class="input-group" style="width: 230px">
          <span class="input-group-text bg-white">
            <i class="bi bi-search"></i>
          </span>
          <input
            v-model="cari"
            type="text"
            class="form-control"
            placeholder="Cari bahan ajar..."
          />
        </div>

        <!-- Tombol Reset -->
        <button
          type="button"
          class="btn btn-outline-secondary rounded-3 px-3"
          @click="
            pilihKategori = '';
            pilihUpbjj = '';
            cari = '';
          "
        >
          <i class="bi bi-arrow-counterclockwise me-1"></i>
          Reset
        </button>

        <!-- Tombol Tambah Data -->
        <button
          type="button"
          class="btn btn-primary rounded-3 px-3"
          data-bs-toggle="modal"
          data-bs-target="#modalTambah"
        >
          <i class="bi bi-plus-lg me-1"></i>
          Add Data
        </button>
      </div>
    </div>

    <!-- Tabel -->
    <div class="card border-0 rounded-4 shadow-sm overflow-hidden">
      <div class="table-responsive">
        <table class="table table-hover table-striped align-middle mb-0">
          <thead class="table-success">
            <tr>
              <th class="py-3 px-3">No</th>
              <th class="py-3">Kode</th>
              <th class="py-3">Judul</th>
              <th class="py-3">Kategori</th>
              <th class="py-3">UPBJJ</th>
              <th class="py-3">Lokasi Rak</th>
              <th class="py-3">Harga</th>
              <th class="py-3">Qty</th>
              <th class="py-3">Safety</th>
              <th class="py-3">Status</th>
              <th class="py-3">Catatan</th>
              <th class="py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in stok" :key="item.kode">
              <td class="px-3 fw-semibold">
                {{ index + 1 }}
              </td>

              <td>
                <span class="badge text-bg-light border text-dark">
                  {{ item.kode }}
                </span>
              </td>

              <td class="fw-semibold text-dark">
                {{ item.judul }}
              </td>

              <td>{{ item.kategori }}</td>
              <td>{{ item.upbjj }}</td>
              <td>{{ item.lokasiRak }}</td>

              <td class="text-nowrap">
                Rp {{ Number(item.harga).toLocaleString("id-ID") }}
              </td>

              <td>{{ item.qty }}</td>
              <td>{{ item.safety }}</td>

              <!-- Status stok -->

              <td class="text-nowrap">
                <span
                  v-if="Number(item.qty) <= Number(item.safety)"
                  class="badge rounded-pill px-3 py-2 text-danger border border-danger-subtle bg-danger-subtle"
                  style="font-size: 12px; letter-spacing: 0.3px"
                >
                  <i class="bi bi-exclamation-triangle-fill me-1"></i>
                  Perlu Order
                </span>

                <span
                  v-else
                  class="badge rounded-pill px-3 py-2 text-success border border-success-subtle bg-success-subtle"
                  style="font-size: 12px; letter-spacing: 0.3px"
                >
                  <i class="bi bi-check-circle-fill me-1"></i>
                  Stok Aman
                </span>
              </td>

              <td>
                <span v-html="item.catatanHTML"></span>
              </td>

              <!-- Tombol edit -->
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-success btn-sm rounded-3 px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="editData(item)"
                >
                  <i class="bi bi-pencil-square me-1"></i>
                  Edit
                </button>
              </td>
            </tr>

            <!-- Jika data kosong -->
            <tr v-if="stok.length === 0">
              <td colspan="12" class="text-center py-5 text-secondary">
                <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                Data bahan ajar tidak ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-footer bg-white border-0 py-3 px-4 text-secondary small">
        <i class="bi bi-info-circle me-1"></i>
        Status Order muncul ketika jumlah stok kurang dari atau sama dengan
        safety stock.
      </div>
    </div>

    <!-- Modal Edit -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 shadow">
          <!-- Header modal -->
          <div class="modal-header bg-success text-white px-4 py-3">
            <div>
              <h5 class="modal-title fw-bold" id="exampleModalLabel">
                <i class="bi bi-pencil-square me-2"></i>
                EDIT DATA BAHAN AJAR
              </h5>
              <small class="text-white-50">
                Perbarui informasi stok bahan ajar
              </small>
            </div>

            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Form edit -->
          <div class="modal-body p-4">
            <div class="row g-3" v-if="dataEdit">
              <div class="col-md-6">
                <label for="kode" class="form-label fw-semibold"> Kode </label>
                <input
                  v-model="dataEdit.kode"
                  type="text"
                  class="form-control"
                  id="kode"
                  placeholder="Masukkan kode"
                />
              </div>

              <div class="col-md-6">
                <label for="judul" class="form-label fw-semibold">
                  Judul
                </label>
                <input
                  v-model="dataEdit.judul"
                  type="text"
                  class="form-control"
                  id="judul"
                  placeholder="Masukkan judul"
                />
              </div>

              <div class="col-md-6">
                <label for="kategori" class="form-label fw-semibold">
                  Kategori
                </label>
                <input
                  v-model="dataEdit.kategori"
                  type="text"
                  class="form-control"
                  id="kategori"
                  placeholder="Masukkan kategori"
                />
              </div>

              <div class="col-md-6">
                <label for="upbjj" class="form-label fw-semibold">
                  UPBJJ
                </label>
                <input
                  v-model="dataEdit.upbjj"
                  type="text"
                  class="form-control"
                  id="upbjj"
                  placeholder="Masukkan UPBJJ"
                />
              </div>

              <div class="col-md-6">
                <label for="lokasiRak" class="form-label fw-semibold">
                  Lokasi Rak
                </label>
                <input
                  v-model="dataEdit.lokasiRak"
                  type="text"
                  class="form-control"
                  id="lokasiRak"
                  placeholder="Masukkan lokasi rak"
                />
              </div>

              <div class="col-md-6">
                <label for="harga" class="form-label fw-semibold">
                  Harga
                </label>
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input
                    v-model="dataEdit.harga"
                    type="number"
                    class="form-control"
                    id="harga"
                    placeholder="Masukkan harga"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <label for="qty" class="form-label fw-semibold"> Qty </label>
                <input
                  v-model="dataEdit.qty"
                  type="number"
                  class="form-control"
                  id="qty"
                  placeholder="Jumlah stok"
                />
              </div>

              <div class="col-md-6">
                <label for="safety" class="form-label fw-semibold">
                  Safety Stock
                </label>
                <input
                  v-model="dataEdit.safety"
                  type="number"
                  class="form-control"
                  id="safety"
                  placeholder="Stok minimum"
                />
              </div>

              <div class="col-12">
                <label for="catatan" class="form-label fw-semibold">
                  Catatan
                </label>
                <textarea
                  v-model="dataEdit.catatanHTML"
                  class="form-control"
                  id="catatan"
                  rows="3"
                  placeholder="Masukkan catatan"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Footer modal -->
          <div class="modal-footer bg-light px-4 py-3">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-3"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x-lg me-1"></i>
              Batal
            </button>

            <button
              type="button"
              class="btn btn-success rounded-3 px-4"
              @click="simpanEdit"
            >
              <i class="bi bi-save me-1"></i>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal add data -->
    <div
      class="modal fade"
      id="modalTambah"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 shadow">
          <!-- Header modal -->
          <div class="modal-header bg-success text-white px-4 py-3">
            <div>
              <h5 class="modal-title fw-bold" id="exampleModalLabel">
                <i class="bi bi-pencil-square me-2"></i>
                Add Data BA
              </h5>
              <small class="text-white-50">
                Perbarui informasi stok bahan ajar
              </small>
            </div>

            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Form add -->
          <div class="modal-body p-4">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="kode" class="form-label fw-semibold"> Kode </label>
                <input
                  v-model="formTambah.kode"
                  type="text"
                  class="form-control"
                  id="kode"
                  placeholder="Masukkan kode"
                />
              </div>

              <div class="col-md-6">
                <label for="judul" class="form-label fw-semibold">
                  Judul
                </label>
                <input
                  v-model="formTambah.judul"
                  type="text"
                  class="form-control"
                  id="judul"
                  placeholder="Masukkan judul"
                />
              </div>

              <div class="col-md-6">
                <label for="kategoriTambah" class="form-label fw-semibold">
                  Kategori
                </label>

                <select
                  id="kategoriTambah"
                  class="form-select"
                  v-model="formTambah.kategori"
                >
                  <option value="">Pilih Kategori</option>

                  <option
                    v-for="kategori in data.kategoriList"
                    :key="kategori"
                    :value="kategori"
                  >
                    {{ kategori }}
                  </option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="kategoriTambah" class="form-label fw-semibold">
                  Upbjj
                </label>

                <select
                  id="kategoriTambah"
                  class="form-select"
                  v-model="formTambah.upbjj"
                >
                  <option value="">Pilih Upbjj</option>

                  <option
                    v-for="upbjj in data.upbjjList"
                    :key="upbjj"
                    :value="upbjj"
                  >
                    {{ upbjj }}
                  </option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="lokasiRak" class="form-label fw-semibold">
                  Lokasi Rak
                </label>
                <input
                  v-model="formTambah.lokasiRak"
                  type="text"
                  class="form-control"
                  id="lokasiRak"
                  placeholder="Masukkan lokasi rak"
                />
              </div>

              <div class="col-md-6">
                <label for="harga" class="form-label fw-semibold">
                  Harga
                </label>
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input
                    v-model="formTambah.harga"
                    type="number"
                    class="form-control"
                    id="harga"
                    placeholder="Masukkan harga"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <label for="qty" class="form-label fw-semibold"> Qty </label>
                <input
                  v-model="formTambah.qty"
                  type="number"
                  class="form-control"
                  id="qty"
                  placeholder="Jumlah stok"
                />
              </div>

              <div class="col-md-6">
                <label for="safety" class="form-label fw-semibold">
                  Safety Stock
                </label>
                <input
                  v-model="formTambah.safety"
                  type="number"
                  class="form-control"
                  id="safety"
                  placeholder="Stok minimum"
                />
              </div>

              <div class="col-12">
                <label for="catatan" class="form-label fw-semibold">
                  Catatan
                </label>
                <textarea
                  v-model="formTambah.catatanHTML"
                  class="form-control"
                  id="catatan"
                  rows="3"
                  placeholder="Masukkan catatan"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Footer modal -->
          <div class="modal-footer bg-light px-4 py-3">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-3"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x-lg me-1"></i>
              Batal
            </button>

            <button
              type="button"
              class="btn btn-success rounded-3 px-4"
              @click="tambahData"
            >
              <i class="bi bi-save me-1"></i>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal add data -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { data as dataAwal } from "../dataBahanAjar";
import { reactive } from "vue";

const data = reactive(dataAwal);
// menyimpan kata pencarian
const cari = ref("");

// Menyimpan pilihan filter
const pilihKategori = ref("");
const pilihUpbjj = ref("");

//filter data stok
const stok = computed(() => {
  return data.stok.filter((item) => {
    const katacari = cari.value.toLowerCase();

    // cari berdasarkan kode / judul
    const cocokcari =
      String(item.kode ?? "")
        .toLowerCase()
        .includes(katacari) ||
      String(item.judul ?? "")
        .toLowerCase()
        .includes(katacari);

    const cocokKategori =
      pilihKategori.value === "" || item.kategori === pilihKategori.value;

    const cocokUpbjj =
      pilihUpbjj.value === "" || item.upbjj === pilihUpbjj.value;

    return cocokcari && cocokKategori && cocokUpbjj;
  });
});

// edit data yang sedang di edit dengan default null(blum di klik edit)
const dataEdit = ref(null);

//menyimpan kode asli sebelum di edit (kode tersebut sebagai penanda data )
const kodeAsli = ref("");

// ambil data saat edit di klik (ketika di klik dataEdit yang asal nya null, kemudian ada nilai nya)
function editData(item) {
  // ... namanya spread opoerator berfungsi untuk membuat salinan dari object item
  dataEdit.value = { ...item };
  kodeAsli.value = item.kode;
}

// simpan perubahan
function simpanEdit() {
  if (!dataEdit.value) {
    return;
  }

  // ini untuk membanding apakah item.kode(data di databahanajar.js itu) itu sama dengan kodeasli.value
  // jika ada/sama maka index = 1
  const index = data.stok.findIndex((item) => item.kode === kodeAsli.value);

  // jika index tidak -1 (berrti 1) berrti data ditemukan
  if (index !== -1) {
    Object.assign(data.stok[index], dataEdit.value);

    // Kosongkan variabel edit
    dataEdit.value = null;
    kodeAsli.value = "";

    // Tutup modal Edit
    const modalElement = document.getElementById("exampleModal");

    const modalInstance =
      window.bootstrap.Modal.getOrCreateInstance(modalElement);

    modalInstance.hide();

    // Tampilkan pesan berhasil
    Swal.fire({
      title: "Good job!",
      text: "Data berhasil diperbarui!",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Gagal!",
      text: "Data tidak ditemukan!",
      icon: "error",
    });
  }
}

//add data

// Form untuk menampung data baru
const formTambah = ref({
  kode: "",
  judul: "",
  kategori: "",
  upbjj: "",
  lokasiRak: "",
  harga: 0,
  qty: 0,
  safety: 0,
  catatanHTML: "",
});

function tambahData() {
  // validasi tambahdata

  if (
    !formTambah.value.kode.trim() ||
    !formTambah.value.judul.trim() ||
    !formTambah.value.kategori ||
    !formTambah.value.upbjj ||
    !formTambah.value.lokasiRak.trim()
  ) {
    Swal.fire({
      title: "Data belum lengkap!",
      text: "Kode, judul, kategori, UPBJJ, dan lokasi rak wajib diisi.",
      icon: "warning",
    });
    return;
  }

  // cek apakah kode sdh di gunakan
  const kodeAda = data.stok.some(
    (item) =>
      item.kode.toLowerCase() === formTambah.value.kode.trim().toLowerCase(),
  );

  if (kodeAda) {
    Swal.fire({
      title: "Kode sudah digunakan!",
      text: "Silakan gunakan kode bahan ajar yang berbeda.",
      icon: "error",
    });
    return;
  }

  // masukan data ke dalam array
  data.stok.push({
    ...formTambah.value,
    kode: formTambah.value.kode.trim(),
    judul: formTambah.value.judul.trim(),
    kategori: formTambah.value.kategori.trim(),
    upbjj: formTambah.value.upbjj.trim(),
    lokasiRak: formTambah.value.lokasiRak.trim(),
    harga: formTambah.value.harga.trim(),
    qty: formTambah.value.qty.trim(),
    safety: formTambah.value.safety.trim(),
    catatanHTML: formTambah.value.catatanHTML.trim(),
  });

  console.log("Jumlah data:", data.stok.length);
  console.log("Isi data stok:", data.stok);

  // Kosongkan form setelah berhasil ditambahkan
  formTambah.value = {
    kode: "",
    judul: "",
    kategori: "",
    upbjj: "",
    lokasiRak: "",
    harga: 0,
    qty: 0,
    safety: 0,
    catatanHTML: "",
  };

  // tutup modal
  const modalElement = document.getElementById("modalTambah");

  if (window.bootstrap && modalElement) {
    const modalInstance =
      window.bootstrap.Modal.getOrCreateInstance(modalElement);

    modalInstance.hide();
  }

  // Notifikasi berhasil
  Swal.fire({
    title: "Berhasil!",
    text: "Data bahan ajar berhasil ditambahkan.",
    icon: "success",
  });
}
</script>

// ref("") menyimpan teks yang diketik pengguna. // computed() memperbarui hasil
pencarian secara otomatis. // filter() menyaring data bahan ajar. // includes()
memeriksa apakah kode atau judul mengandung kata yang dicari. // toLowerCase()
membuat pencarian tidak membedakan huruf besar dan kecil.
