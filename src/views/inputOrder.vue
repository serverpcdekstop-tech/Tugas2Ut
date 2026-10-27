<template>
  <div class="container-fluid mt-5 mb-5 py-5">
    <!-- Judul Halaman -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Tambah Delivery Order</h2>
        <p class="text-muted mb-0">
          Formulir untuk menambahkan data pengiriman bahan ajar.
        </p>
      </div>

      <span class="badge bg-primary fs-6 px-3 py-2">
        <i class="bi bi-truck me-2"></i>
        Delivery Order
      </span>
    </div>

    <!-- Form Tambah DO -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white py-3">
        <h5 class="fw-bold mb-0">
          <i class="bi bi-file-earmark-plus me-2 text-primary"></i>
          Form Input Delivery Order
        </h5>
      </div>

      <div class="card-body p-4">
        <!-- Informasi Delivery Order -->
        <div class="mb-4">
          <h6 class="fw-bold text-primary mb-3">
            <i class="bi bi-info-circle me-2"></i>
            Informasi Delivery Order
          </h6>

          <div class="row g-3">
            <!-- Nomor DO -->
            <div class="col-md-6">
              <label class="form-label fw-semibold">
                Nomor Delivery Order
              </label>

              <input
                type="text"
                class="form-control bg-light"
                :value="nomorDO"
                readonly
              />

              <small class="text-muted">
                Nomor DO dibuat otomatis oleh sistem.
              </small>
            </div>

            <!-- Tanggal Kirim -->
            <div class="col-md-6">
              <label class="form-label fw-semibold">
                Tanggal Kirim
                <span class="text-danger">*</span>
              </label>

              <input
                type="date"
                class="form-control"
                v-model="form.tanggalkirim"
              />
            </div>
          </div>
        </div>

        <hr class="my-4" />

        <!-- Informasi Mahasiswa -->
        <div class="mb-4">
          <h6 class="fw-bold text-primary mb-3">
            <i class="bi bi-person me-2"></i>
            Informasi Mahasiswa
          </h6>

          <div class="row g-3">
            <!-- NIM -->
            <div class="col-md-6">
              <label class="form-label fw-semibold">
                NIM
                <span class="text-danger">*</span>
              </label>

              <input
                type="text"
                class="form-control"
                placeholder="Masukkan NIM mahasiswa"
                v-model.trim="form.nim"
              />
            </div>

            <!-- Nama Mahasiswa -->
            <div class="col-md-6">
              <label class="form-label fw-semibold">
                Nama Mahasiswa
                <span class="text-danger">*</span>
              </label>

              <input
                type="text"
                class="form-control"
                placeholder="Masukkan nama mahasiswa"
                v-model.trim="form.nama"
              />
            </div>
          </div>
        </div>

        <hr class="my-4" />

        <!-- Informasi Pengiriman -->
        <div class="mb-4">
          <h6 class="fw-bold text-primary mb-3">
            <i class="bi bi-box-seam me-2"></i>
            Informasi Pengiriman
          </h6>

          <div class="row g-3">
            <!-- Ekspedisi -->
            <div class="col-md-6">
              <label class="form-label fw-semibold">
                Ekspedisi
                <span class="text-danger">*</span>
              </label>

              <select class="form-select" v-model="form.ekspedisi">
                <option value="">-- Pilih Ekspedisi --</option>

                <option
                  v-for="pengiriman in data.pengirimanList"
                  :key="pengiriman.kode"
                  :value="pengiriman.kode"
                >
                  {{ pengiriman.nama }}
                </option>
              </select>

              <small class="text-muted">
                Pilih jenis ekspedisi untuk pengiriman bahan ajar.
              </small>
            </div>

            <!-- Paket Bahan Ajar -->
            <div class="col-md-6">
              <label class="form-label fw-semibold">
                Paket Bahan Ajar
                <span class="text-danger">*</span>
              </label>

              <select class="form-select" v-model="form.paket">
                <option value="">-- Pilih Paket Bahan Ajar --</option>

                <option
                  v-for="paket in data.paket"
                  :key="paket.kode"
                  :value="paket.kode"
                >
                  {{ paket.nama }}
                </option>
              </select>

              <small class="text-muted">
                Pilih paket sesuai kebutuhan mahasiswa.
              </small>
            </div>
          </div>
        </div>

        <!-- Detail Isi Paket -->
        <div class="card border mb-4">
          <div class="card-header bg-light py-3">
            <h6 class="fw-bold mb-0">
              <i class="bi bi-journal-text me-2 text-primary"></i>
              Detail Isi Paket Bahan Ajar
            </h6>
          </div>

          <div class="card-body">
            <!-- Informasi Paket -->
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <small class="text-muted d-block"> Kode Paket </small>

                <span class="fw-semibold">
                  {{ paketDipilih ? paketDipilih.kode : "-" }}
                </span>
              </div>

              <div class="col-md-6">
                <small class="text-muted d-block"> Nama Paket </small>

                <span class="fw-semibold">
                  {{ paketDipilih ? paketDipilih.nama : "-" }}
                </span>
              </div>
            </div>

            <!-- Tabel Isi Paket -->
            <div class="table-responsive">
              <table class="table table-bordered table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th style="width: 60px" class="text-center">No</th>

                    <th>Kode Bahan Ajar</th>

                    <th>Nama Bahan Ajar</th>

                    <th style="width: 100px" class="text-center">Jumlah</th>
                  </tr>
                </thead>

                <tbody>
                  <!-- Jika paket belum dipilih -->
                  <tr v-if="isiPaket.length === 0">
                    <td colspan="4" class="text-center text-muted py-4">
                      Silakan pilih paket bahan ajar terlebih dahulu.
                    </td>
                  </tr>

                  <!-- Data bahan ajar sesuai paket -->
                  <tr v-for="(bahan, index) in isiPaket" :key="bahan.kode">
                    <td class="text-center">
                      {{ index + 1 }}
                    </td>

                    <td>{{ bahan.kode }}</td>

                    <td>{{ bahan.judul }}</td>

                    <td class="text-center">1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="alert alert-info mt-3 mb-0">
              <i class="bi bi-info-circle me-2"></i>
              Detail bahan ajar ditampilkan berdasarkan paket yang dipilih.
            </div>
          </div>
        </div>

        <!-- Total Harga -->
        <div class="card border-0 bg-light mb-4">
          <div class="card-body p-4">
            <div class="row align-items-center">
              <div class="col-md-6">
                <h6 class="fw-bold mb-1">
                  <i class="bi bi-cash-stack me-2 text-success"></i>
                  Total Harga Paket
                </h6>

                <small class="text-muted">
                  Harga diambil dari data paket bahan ajar.
                </small>
              </div>

              <div class="col-md-6 text-md-end mt-3 mt-md-0">
                <h3 class="fw-bold text-success mb-0">
                  {{ formatRupiah(paketDipilih ? paketDipilih.harga : 0) }}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="d-flex justify-content-end gap-2">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="resetForm"
          >
            <i class="bi bi-arrow-counterclockwise me-1"></i>
            Reset
          </button>

          <button type="button" class="btn btn-primary px-4" @click="simpan">
            <i class="bi bi-save me-1"></i>
            Simpan Delivery Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { data } from "@/dataBahanAjar";
import { ref, computed } from "vue";


// Menyimpan data Delivery Order
const dataDo = ref([]);

// Mengambil tahun sekarang
const tahunSekarang = new Date().getFullYear();

// Membuat nomor DO otomatis
const nomorDO = computed(() => {
  const nomorUrut = dataDo.value.length + 1;

  return `DO${tahunSekarang}-${String(nomorUrut).padStart(3, "0")}`;
});

// Data form
const form = ref({
  tanggalkirim: new Date().toISOString().slice(0, 10),
  nim: "",
  nama: "",
  ekspedisi: "",
  paket: "",
});

// Mengambil data paket berdasarkan pilihan
const paketDipilih = computed(() => {
  return data.paket.find((item) => item.kode === form.value.paket);
});

// Mengambil isi bahan ajar sesuai paket
const isiPaket = computed(() => {
  if (!paketDipilih.value) {
    return [];
  }

  return paketDipilih.value.isi
    .map((kode) => {
      return data.stok.find((item) => item.kode === kode);
    })
    .filter((item) => item !== undefined);
});

// Format harga menjadi Rupiah
function formatRupiah(harga) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(harga);
}

// Fungsi simpan
async function simpan() {
  // Validasi form
  if (
    !form.value.tanggalkirim ||
    !form.value.nim.trim() ||
    !form.value.nama.trim() ||
    !form.value.ekspedisi ||
    !form.value.paket
  ) {
    await Swal.fire({
      title: "Peringatan!",
      text: "Harap lengkapi semua inputan.",
      icon: "warning",
      confirmButtonText: "Mengerti",
    });

    return;
  }

  // Konfirmasi sebelum menyimpan
  const konfirmasi = await Swal.fire({
    title: "Simpan Delivery Order?",
    text: `Nomor DO: ${nomorDO.value}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, Simpan",
    cancelButtonText: "Batal",
    reverseButtons: true,
  });

  if (!konfirmasi.isConfirmed) {
    return;
  }

  // Menyimpan data DO
  const doBaru = {
    nomorDO: nomorDO.value,
    tanggalKirim: form.value.tanggalkirim,
    nim: form.value.nim.trim(),
    nama: form.value.nama.trim(),
    ekspedisi: form.value.ekspedisi,
    paket: form.value.paket,
    total: paketDipilih.value.harga,
    isi: [...paketDipilih.value.isi],
  };

  dataDo.value.push(doBaru);

  // Notifikasi berhasil
  await Swal.fire({
    title: "Berhasil!",
    text: `Delivery Order ${doBaru.nomorDO} berhasil disimpan.`,
    icon: "success",
    confirmButtonText: "OK",
  });

  // Reset form setelah berhasil
  resetForm();
}

// Fungsi reset form
function resetForm() {
  form.value = {
    tanggalkirim: new Date().toISOString().slice(0, 10),
    nim: "",
    nama: "",
    ekspedisi: "",
    paket: "",
  };
}
</script>
