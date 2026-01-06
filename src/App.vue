<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 py-3">
      <div class="container-sm">
        <router-link class="navbar-brand" to="/">My Portal</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/students">Students</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/courses">Courses</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>

    <footer class="bg-dark text-white text-center py-3 mt-auto fs-6">
      &copy; 2026 - All rights reserved. For educational purposes only.
    </footer>
  </div>
</template>
