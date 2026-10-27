<template>
  <div class="container py-5">
    <!-- Bagian Pencarian -->
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body text-center p-4 p-md-5">
            <div class="icon-paket mb-3">
              <i class="bi bi-box-seam"></i>
            </div>

            <h2 class="fw-bold">Lacak Pengiriman Anda</h2>

            <p class="text-secondary mb-4">
              Masukkan nomor Delivery Order (DO) untuk mengetahui status
              pengiriman bahan ajar Anda.
            </p>

            <form>
              <div class="input-group input-group-lg">
                <span class="input-group-text bg-white">
                  <i class="bi bi-search"></i>
                </span>

                <input
                  v-model="nomorDo"
                  type="text"
                  class="form-control"
                  placeholder="Contoh: DO2025-0001"
                />

                <button class="btn btn-cari px-4" type="button" @click="cariDo">
                  Cari
                  <i class="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </form>

            <small class="text-secondary d-block mt-3">
              <i class="bi bi-info-circle me-1"></i>
              Pastikan nomor DO yang Anda masukkan sudah benar.
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- Informasi Pengiriman -->
    <div class="row justify-content-center" v-if="detailDo">
      <div class="col-12 col-lg-9">
        <!-- Status Paket -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <div
              class="d-flex justify-content-between align-items-start flex-wrap gap-3"
            >
              <div>
                <p class="text-secondary mb-1">Nomor Delivery Order</p>

                <h5 class="fw-bold mb-0">{{ nomorDo }}</h5>
              </div>

              <span class="badge rounded-pill bg-primary px-3 py-2">
                {{ detailDo.status }}
              </span>
            </div>

            <hr />

            <div class="row g-3">
              <div class="col-6">
                <small class="text-secondary">Nama Penerima</small>
                <p class="fw-semibold mb-0">{{ detailDo.nama }}</p>
              </div>

              <div class="col-6">
                <small class="text-secondary">NIM</small>
                <p class="fw-semibold mb-0">{{ detailDo.nim }}</p>
              </div>

              <div class="col-6">
                <small class="text-secondary">Ekspedisi</small>
                <p class="fw-semibold mb-0">
                  <i class="bi bi-truck me-1"></i>
                  {{ detailDo.ekspedisi }}
                </p>
              </div>

              <div class="col-6">
                <small class="text-secondary">Tanggal Pengiriman</small>
                <p class="fw-semibold mb-0">{{ detailDo.tanggalKirim }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Riwayat Perjalanan -->
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h5 class="fw-bold mb-4">
              <i class="bi bi-geo-alt me-2 text-primary"></i>
              Riwayat Perjalanan Paket
            </h5>
            <div class="timeline">
              <div
                v-for="(perjalanan, index) in detailDo.perjalanan"
                :key="index"
                class="timeline-item"
              >
                <!-- Ikon status -->
                <div
                  class="timeline-icon"
                  :class="{ 'timeline-active': perjalanan.selesai }"
                >
                  <i
                    :class="
                      perjalanan.selesai ? 'bi bi-check-lg' : 'bi bi-circle-fill'
                    "
                  ></i>
                </div>

                <!-- Informasi perjalanan -->
                <div class="timeline-content">
                  <p class="fw-semibold mb-1">
                    {{ perjalanan.keterangan }}
                  </p>

                  <small class="text-secondary">
                    <i class="bi bi-clock me-1"></i>
                    {{ perjalanan.waktu }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { data } from "../dataBahanAjar";
import { ref, computed } from "vue";

// nomor do pengguna

const nomorDo = ref("");
// simpan hasil pencarian
const detailDo = ref(null);

function cariDo() {
  const nomor = nomorDo.value.trim().toUpperCase();

  //   hapus dlu detail sebelum nya
  detailDo.value = "";

  //   cek apakah inputan kosong

  if (nomor == "") {
    Swal.fire({
      title: "Peringatan!",
      text: "Harap Masukan Nomor Do.",
      icon: "error",
    });

    return;
  }

  //cari data berdasarkan nomor DO
  if (data.tracking && data.tracking[nomor]) {
    detailDo.value = {
      nomorDO: nomor,
      ...data.tracking[nomor],
    };
  } else {
    Swal.fire({
      title: "Peringatan!",
      text: "Data Tidak Ditemukan.",
      icon: "error",
    });
  }
}
</script>

<style scoped>
.icon-paket {
  width: 64px;
  height: 64px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #eef0ff;
  color: #605bff;
  font-size: 28px;
}

.btn-cari {
  background-color: #605bff;
  color: white;
  border-color: #605bff;
}

.btn-cari:hover {
  background-color: #4944e8;
  color: white;
}

.form-control:focus {
  border-color: #a5a2ff;
  box-shadow: 0 0 0 0.2rem rgba(96, 91, 255, 0.15);
}

.timeline {
  position: relative;
  padding-left: 8px;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 16px;
  padding-bottom: 30px;
}

.timeline-item:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 11px;
  top: 25px;
  bottom: 0;
  width: 2px;
  background-color: #dee2e6;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-icon {
  position: relative;
  z-index: 1;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #e9ecef;
  color: #6c757d;
  font-size: 11px;
}

.timeline-active {
  background-color: #198754;
  color: white;
}

.timeline-content {
  flex: 1;
  padding-top: 2px;
}

@media (max-width: 576px) {
  .btn-cari {
    padding-left: 14px !important;
    padding-right: 14px !important;
  }
}
</style>
