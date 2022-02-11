<template>

  <body>
    <header>
      <div class="mensaje">
        <h1>Mi carrito de compras</h1>
      </div>
    </header>
    <div class="main">
      <div class="productos">
        <div class="producto" v-for="(favorite, index) in favoriteByUsername" :key="index">
          <div class="imagen">
            <img v-bind:src="require(`../assets/home/${favorite.image}`)"/></div>
          <div class="info">
            <h2>{{favorite.prodName}}</h2>
            <p class="categoria">{{favorite.prodCategory}}</p>
            <p class="precio">${{favorite.prodPrice}}</p>
            <button v-on:click="removeFavorite(favorite.id)">Eliminar</button>
          </div>
          <div class="cantidad">
            <p class="tl">Cantidad</p>
            <div class="botones">
              <button class="menos" @click="fewerItems(index)">-</button>
              <p>{{favorite.prodUnits}}</p>
              <button class="mas" @click="moreItems(index)">+</button>
            </div>
            <button class="updBtn" @click="putFavorite(favorite.id)">Actualizar</button>
          </div>
        </div>
      </div>
      <div class="resumen">
        <h4>Resumen de tu orden</h4>
        <p>Descuento: No aplica</p>
        <p>Total a pagar: ${{totalPayment}}</p>
        <div class="boton">
          <button>Comprar</button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Copyright © 2021 compumundohipermegared</p>
    </div>
  </body>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Favorite",

  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
      favoriteByUsername: [],
      totalPayment: 0,
      updateFavorite: {
        prodUnits: null,
        id: ""
      },
    };
  },

  apollo: {
  favoriteByUsername: {
      query: gql`
        query FavoriteByUsername($username: String!) {
          favoriteByUsername(username: $username) {
            id
            username
            prodRef
            prodName
            prodCategory
            prodPrice
            prodUnits
            date
            image
          }
        }
        `,
        variables() {
          return {
            username: this.username,
          };
        },
    },
  },

  methods: {
    removeFavorite: async function (favoriteId) {
      if (
        localStorage.getItem("tokenAccess") === null ||
        localStorage.getItem("tokenRefresh") == null
      ) {
        this.$emit("logOut");
        return;
      }

      localStorage.setItem("tokenAccess", "");

      await this.$apollo.mutate({
          mutation: gql`
            mutation RefreshToken($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("tokenRefresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("tokenAccess", result.data.refreshToken.access);
        })
        .catch((error) => {
          console.log(error)
          this.$emit("logOut");
          return;
        });

      await this.$apollo.mutate({
          mutation: gql`
            mutation DeleteFavorite($deleteFavoriteId: String!) {
              deleteFavorite(id: $deleteFavoriteId)
            }
          `,
          variables: {
            deleteFavoriteId: favoriteId,
          },
        })
        .then((result) => {
          alert("Se ha eliminado correctamente el producto. Revise Historial");
          this.$apollo.queries.favoriteByUsername.refetch();
          this.totalBill();
        })
        .catch((error) => {
          console.log(error)
          alert("Operación rechazada.");
        });
    },

    putFavorite: async function (favoriteId) {
      if (
        localStorage.getItem("tokenAccess") === null ||
        localStorage.getItem("tokenRefresh") == null
      ) {
        this.$emit("logOut");
        return;
      }

      localStorage.setItem("tokenAccess", "");

      await this.$apollo.mutate({
          mutation: gql`
            mutation RefreshToken($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("tokenRefresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("tokenAccess", result.data.refreshToken.access);
        })
        .catch((error) => {
          console.log(error)
          this.$emit("logOut");
          return;
        });

      this.updateFavorite.id = favoriteId;

      await this.$apollo.mutate({
          mutation: gql`
            mutation UpdateFavorite($favorite: FavoriteUpdate) {
              updateFavorite(favorite: $favorite) {
                id
                username
                prodRef
                prodName
                prodCategory
                prodPrice
                prodUnits
                date
                image
              }
            }
          `,
          variables: {
            favorite: this.updateFavorite,
          },
        })
        .then((result) => {
          alert("Se ha modificado correctamente el producto.");
          this.$apollo.queries.favoriteByUsername.refetch();
          this.totalBill();
          this.updateFavorite.prodUnits = null;
        })
        .catch((error) => {
          console.log(error)
          alert("Operación rechazada.");
        });
    },

    totalBill: async function () {
      const timer = ms => new Promise(res => setTimeout(res, ms))
      
      let total = 0;
      await timer(1500);
      for(var i = 0; i < this.favoriteByUsername.length; i ++){
        total += this.favoriteByUsername[i]["prodUnits"] * this.favoriteByUsername[i]["prodPrice"]
      }
      this.totalPayment = total;
    },

    fewerItems: function (index) {
      
      if (this.updateFavorite.prodUnits === null){
        this.updateFavorite.prodUnits = this.favoriteByUsername[index].prodUnits - 1;
      }
      else {
        this.updateFavorite.prodUnits -= 1;
      }
    },

    moreItems: function (index) {
      if (this.updateFavorite.prodUnits === null){
        this.updateFavorite.prodUnits = this.favoriteByUsername[index].prodUnits + 1;
      }
      else {
        this.updateFavorite.prodUnits += 1;
      }
    },
  },
  
  created: function () {
    this.$apollo.queries.favoriteByUsername.refetch();
    this.totalBill();
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

Body {
  font-family: Arial, Helvetica, sans-serif;
}

/* ----- header ----- */
header {
  height: 450px;

  background: url(../assets/carrito/productos-gamer.png);
  background-position: center;
  background-size: cover;
}

header .mensaje {
  position: relative;
  top: 200px;
  margin-left: 50px;
  color: #fff;
  text-align: center;
}

header .mensaje h1{
    font-size: 35px;
}

/* ----- main ----- */

.main {
  display: flex;
  justify-content: space-between;

  margin: auto;
  margin-top: 30px;
  width: 90%;
}

.main .productos {
  display: flex;
  flex-wrap: wrap;

  width: 65%;
}

.main .resumen {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 30%;
  height: 250px;
  background: rgb(237, 237, 237);
  border-radius: 10px;
  box-shadow: 0px 4px 4px #00000069;
  padding: 15px 30px 15px 30px;
}

.main .resumen .boton {
  display: flex;
  justify-content: center;
}

.main .resumen .boton button {
  background: rgb(0, 19, 34);
  color: #fff;
  border-style: none;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
}

.main .resumen .boton button:hover {
  cursor: pointer;
  box-shadow: 0px 4px 4px #00000069;
}

.main .productos .producto {
  display: flex;

  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.main .productos .producto div {
  display: flex;

  width: 33.3%;
}

.main .productos .producto .imagen {
  justify-content: center;
  align-items: center;
}

.main .productos .producto .imagen img {
  width: 90%;
  height: 80%;
}

.main .productos .producto .info {
  flex-direction: column;
  justify-content: center;
  line-height: 35px;
  padding-left: 80px;
}

.main .productos .producto .info .categoria {
  color: rgb(50, 50, 50);
}

.main .productos .producto .info .precio {
  font-weight: bold;
}

.main .productos .producto .info button {
  background: none;
  border-style: none;
  text-align: left;
  color: rgba(84, 84, 84, 1);
  text-decoration: underline;
}

.main .productos .producto .info button:hover {
  cursor: pointer;
  color: #000;
}

.main .productos .producto .cantidad {
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

.main .productos .producto .cantidad .tl {
  font-weight: bold;
}

.main .productos .producto .cantidad .updBtn {
  border-style: none;
  text-align: left;
  color: rgba(84, 84, 84, 1);
  text-decoration: underline;
}

.main .productos .producto .cantidad button:hover{
  cursor: pointer;
  color: #000;
}

.main .productos .producto .cantidad .botones {
  justify-content: center;
  margin-top: 10px;
}

.main .productos .producto .cantidad .botones button {
  border-style: none;
  background: #fff;
  margin: 0 10px 0 10px;
  padding: 0 5px 0 5px;
}

.main .productos .producto .cantidad .botones button:hover {
  cursor: pointer;
  background: rgb(235, 235, 235);
}

/* footer */

.footer {
  background: #001322;
  color: #fff;
  text-align: center;
  padding: 20px 0 20px 0;
  margin-top: 30px;
}
</style>