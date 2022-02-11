<template>
  <body>
    <div class="div-form">
      <form v-on:submit.prevent="processSignUp" class="formulario" action="">
        <h1>Registrarse</h1>
        <p>Usuario</p>
        <input type="text" v-model="user.username" class="usuario" />
        <p>Nombre</p>
        <input type="text" v-model="user.name" class="nombre" />
        <p>Apellido</p>
        <input type="text" v-model="user.surname" class="apellido" />
        <p>Correo</p>
        <input type="email" v-model="user.email" class="Correo" />
        <p>Contraseña</p>
        <input type="password" v-model="user.password" class="password" />
        <div class="boton">
          <button type="submit" class="btn-signUp">Registrarse</button>
        </div>
      </form>
    </div>
  </body>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "SignUp",

  data: function () {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
      },
    };
  },
  
  methods: {
    processSignUp: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($userInput: SignUpInput!) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            tokenAccess: result.data.signUpUser.access,
            tokenRefresh: result.data.signUpUser.refresh,
          };
            this.$emit("completedSignUp", dataLogIn);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-image: url(../assets/inicio-registro/productos-gamer.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* ----- formulario ----- */

.div-form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.div-form .formulario {
  color: #fff;
  background: rgba(196, 196, 196, 0.2);
  padding: 30px;
  border-radius: 10px;
}

.div-form .formulario h1 {
  margin-bottom: 30px;
  font-size: 30px;
  text-align: center;
}

.div-form .formulario p {
  margin-bottom: 20px;
}

.div-form .formulario input {
  width: 450px;
  height: 30px;
  background: #c4c4c4;
  border-style: none;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 5px;
}

.div-form .formulario input:focus {
  border: 1px solid #001322;
  outline: none;
}

.div-form .formulario .boton {
  display: flex;
  justify-content: center;
}

.div-form .formulario .boton .btn-signUp {
  background: #001322;
  border-style: none;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
}

.div-form .formulario .boton .btn-signUp:hover {
  cursor: pointer;
  box-shadow: 0px 4px 4px #00000069;
  transition: all 0.5s ease-out;
}
</style>
