<template>
  <div class="containerFluid">

  <main-header></main-header> 

  
  <div id="howwork" class="container mt-5 mb-5">
    <h3>Como funciona</h3>
    <p>Puedes estar informado de los anuncios que se publiquen en el Boletín Oficial del Registro Mercantil (BORME). Sólo tienes que poner la empresa a la que quieres seguir y un correo donde se te notificará el mismo día.</p>
    <p>Se informa de los anuncios publicados en la "SECCIÓN SEGUNDA. Anuncios y avisos legales", relativos a convocatoria de juntas, fusiones y absorciones de empresas, aumentos de capital, etc.</p>
    <p>En el mensaje recibirá un enlace que le llevará a la publicación.</p>
  </div>

  <div class="container mt-5 mb-5">
    <h3>Seguir empresa</h3>
    <b-form id="form-company">
      <b-form-group label="Email:"
                    description="**En ningún caso se utilizará el email proporcionado para enviar publicidad">
        <b-form-input 
                      type="email"
                      v-model="email"
                      required
                      placeholder="Introduce un email">
        </b-form-input>
      </b-form-group>
      <b-form-group   label="Empresa:">
        <b-form-input type="text"
                      v-model="company"
                      required
                      placeholder="nombre de la empresa">
        </b-form-input> 
          <b-form-checkbox
                      class="mt-5 mb-3"
                      required
                      v-model="status"
                      value="accepted"
                      unchecked-value="not_accepted">
        Acepto la <a href="#">Política de privacidad</a>
      </b-form-checkbox>           
      </b-form-group>

    <!-- <b-form-group> -->
    
    <!-- </b-form-group> -->
     
      
      <b-button  v-on:click="createAlarm()" type="submit" variant="primary">Crear</b-button>
      <b-button v-on:click="onReset()" type="reset" variant="danger">Limpiar búsqueda</b-button>
    </b-form>
  </div>

  <main-footer></main-footer>
</div>
</template>

<script>
import { db } from '../main'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'


export default {
  components: {
    MainHeader,
    MainFooter
  },
  data () {
    return {
      email: '',
      company: '',
      status: 'not_accepted'

    }
  },

  methods: {
    createAlarm() {
      
                if(this.email !== '' && this.company !== '' && this.company.length > 4 && this.status === "accepted") {

                var usersRef = db.collection("users");
                    
                    //Si company tiene tilde o ñ símbolo unicode Hasta que no se soluciones error @grpc/proto-loader

                    usersRef.add({email: this.email, company: this.company.toUpperCase()})

                     this.email = ''
                     this.company = ''
                   
                    }
       
    },
    onReset() {
        this.email = ''
        this.company = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
