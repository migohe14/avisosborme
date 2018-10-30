<template>
 <div class="containerFluid footer">
<footer>
    <b-container>
      <b-row>
        <b-col>
          <b-navbar toggleable="md">
            <b-navbar-nav>
              <b-nav-item href="#">Aviso legal</b-nav-item>
              <b-nav-item href="#">Sobre mí</b-nav-item>
              <b-nav-item href="#">Contacto</b-nav-item>
            </b-navbar-nav>
          </b-navbar>
        </b-col>
      </b-row>
      <hr>
      <b-row class="footer-last-row">
        <b-col>
          <div class="align-middle">www.avisosborme.es © {{ new Date().getFullYear() }}</div>
        </b-col>
        
      </b-row>
    </b-container>
  </footer>
    </div>
</template>

<style>
    .footer{
        background-color:rgb(245, 245, 245)
    }
</style>
