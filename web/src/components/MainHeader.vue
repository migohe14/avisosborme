<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="https://firebasestorage.googleapis.com/v0/b/bormenew.appspot.com/o/fondoborme.jpeg?alt=media&token=a5f6cd5c-ee10-47b1-a469-f77aae50d2a9" alt="image slot">
        <h3>Avisos BORME</h3>
        <p>Boletín Oficial del Registro Mercantil</p>
      </b-carousel-slide>
     

      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="https://firebasestorage.googleapis.com/v0/b/bormenew.appspot.com/o/fondoborme2.jpeg?alt=media&token=58a19b01-31c0-4c57-be8b-852a54afc7e7" alt="image slot">
                <div id="fondo">
                  <h3>Sigue la actualidad de una empresa</h3>
                  <p>Te llegará un email si se publica un anuncio de la empresa que sigues</p>
                </div>
           
      </b-carousel-slide>

    </b-carousel>
   
  </div>
</template>

<style>
  #fondo{
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 2px
  }
</style>


<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>