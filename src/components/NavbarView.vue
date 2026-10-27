<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">SITTA PRAKTIK</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">
              <i class="bi bi-house-door-fill"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/tracking">
              <i class="bi bi-box-seam-fill"></i>
              Tracking DO
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/input">
              <i class="bi bi-file-earmark-arrow-up-fill"></i>
              Do New
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
