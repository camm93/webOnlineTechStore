<template>
  <div id="app" class="app">
    <div class="header">
      <h1>CompuMundoHiperMegaRed</h1>

      <nav>
        <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
        <button v-if="is_auth" v-on:click="loadContact">Contáctenos</button>
        <button v-if="is_auth" v-on:click="loadFavorite">Carrito</button>
        <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>
  </div>
</template> 

<script>
export default {
  name: "App",

  computed: {
    is_auth: {
      get: function() {
        return this.$route.meta.requiresAuth;
      },
      set: function() { }
      }
    },

  methods: {
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },

    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },

    loadHome: function () {
      this.$router.push({ name: "home" });
    },

    loadContact: function () {
      this.$router.push({ name: "contact" });
    },

    loadFavorite: function () {
      this.$router.push({ name: "favorite" });
    },

    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.loadLogIn();
    },

    completedLogIn: function (data) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("tokenAccess", data.tokenAccess);
      localStorage.setItem("tokenRefresh", data.tokenRefresh);
      alert("Autenticación Exitosa");
      this.loadHome();
    },

    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
}

body {
  margin: 0;
}
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 140px;
  background: #000;
  color: #fff;
  font-family: "Courier New", Courier, monospace;
}

.header h1 {
  font-size: 50px;
}
.header nav {
  display: flex;
  justify-content: space-around;
  align-content: center;
  height: 100%;
  width: 470px;
}
.header nav button {
  display: inline-block;
  height: 30px;
  width: 100px;
  margin-top: 60px;
  border-radius: 5px;
  background: none;
  color: #fff;
}
</style>