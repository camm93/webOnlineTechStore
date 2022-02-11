<template>
  <body>
    <header>
      <div class="mensaje">
        <h1>{{itemByReference.category}}</h1>
      </div>
    </header>
    <section class="main">
      <p class="retroceder" v-on:click="loadCategory"> {{itemByReference.category}} </p>
      <div class="prev">
        <div class="imagenes">
          <div class="principal"><img v-bind:src="require(`../assets/home/${itemByReference.image}`)" /></div>
          <div class="secundarias">
            <div class="sec uno"><img v-bind:src="require(`../assets/A/A${itemByReference.image}`)" /></div>
            <div class="sec dos"><img v-bind:src="require(`../assets/B/B${itemByReference.image}`)" /></div>
            <div class="sec tres"><img v-bind:src="require(`../assets/C/C${itemByReference.image}`)" /></div>
          </div>
        </div>

        <div class="info">
          <h2>{{itemByReference.name}}</h2>
          <p>Referencia: {{itemByReference.ref}}</p>
          <p>Disponibilidad: En stock</p>
          <p>Envio gratis</p>
          <p>{{itemByReference.inStock}} unidades disponibles</p>
          <p>Garantia: {{itemByReference.warranty}}</p>
          <p class="precio">COP ${{itemByReference.price}}</p>
          <div class="cantidad">
            <p>Cantidad</p>
            <div class="botones">
              <button class="menos" @click="createFavorite.prodUnits -= 1">-</button>
              <p>{{createFavorite.prodUnits}}</p>
              <button class="mas" @click="createFavorite.prodUnits += 1">+</button>
            </div>
          </div>
          <button class="carrito" @click="processFavorite(itemByReference)">
            <i class="fas fa-shopping-cart" ></i>Añadir al carrito
          </button>
        </div>
      </div>
      <div class="detalles">
        <h3>Detalles</h3>
        <p>
          {{itemByReference.details}}
        </p>
      </div>
    </section>
    <div class="footer">
      <p>Copyright © 2021 compumundohipermegared</p>
    </div>
  </body>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Product",

  data: function () {
    return {
      itemRef: localStorage.getItem("itemRef") || "none",
      itemByReference: {
        ref: "",
        category: "",
        name: "",
        price: "",
        inStock: "",
        warranty: "",
        details: "",
        image: "",        
      },
      createFavorite: {
        username: localStorage.getItem("username"),
        prodRef: "",
        prodName: "",
        prodCategory: "",
        prodPrice: "",
        prodUnits: 1,
        image: "",  
      },
    }
  },

  apollo: {
    itemByReference: {
      query: gql`
        query ItemByReference($ref: Int!) {
          itemByReference(ref: $ref) {
            ref
            category
            name
            price
            inStock
            warranty
            details
            image
          }
        }
      `,
      variables() {
        return {
          ref: parseInt(this.itemRef),
        }
      }
    }
  },

  methods: {
    processFavorite: async function(item){
      if (localStorage.getItem("tokenAccess") === null || 
          localStorage.getItem("tokenRefresh") === null) {
            this.$emit("logOut");
          return;
          }
      
      if (this.createFavorite.prodUnits <= 0) {
        alert("La cantidad de productos debe ser mayor a cero")
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

        this.createFavorite.prodRef     = item.ref;
        this.createFavorite.prodName    = item.name;
        this.createFavorite.prodCategory= item.category;
        this.createFavorite.prodPrice   = item.price;
        this.createFavorite.image       = item.image;

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateFavorite($favorite: FavoriteInput!) {
              createFavorite(favorite: $favorite) {
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
            favorite: this.createFavorite,
          },
        })
        .then((result) => {
          alert("El producto se ha guardado correctamente. Revise su carro de compras");
          this.$apollo.queries.itemByReference.refetch();
        })
        .catch((error) => {
          console.log(error)
          alert("Ha ocurrido un error. Intente más tarde.");
        });
  },

  loadCategory: function () {
    this.$router.push({ name: "category" });
    },

  },
  created: function (){
    this.$apollo.queries.itemByReference.refetch();
  },
}
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

  background: url(../assets/categoria-pc/productos-gamer.png);
  background-position: center;
  background-size: cover;
}

header .mensaje {
  position: relative;
  margin-left: 50px;
  top: 200px;
  color: #fff;
  text-align: center;
}

/* ----- main ----- */

/* prev / imagenes */

.main {
  width: 95%;
  margin: auto;
  margin-top: 30px;
}

.main .retroceder {
  color: rgba(0, 0, 0, 0.65);
}

.main .retroceder:hover {
  color: #000;
  cursor: pointer;
}

.main .prev {
  display: flex;
  width: 100%;
  margin-top: 30px;
}

.main .prev .imagenes {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;

  width: 40%;
  height: 640px;
}

.main .prev .imagenes .principal {
  width: 100%;
  height: 470px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}

.main .prev .imagenes .principal img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.main .prev .imagenes .secundarias {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 140px;
}

.main .prev .imagenes .secundarias .sec {
  width: 30%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}

.main .prev .imagenes .secundarias img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.main .prev .imagenes .secundarias img:hover {
  cursor: pointer;
}

/* prev / info */

.main .prev .info {
  width: 30%;
  height: 640px;
  padding: 40px;
  line-height: 50px;
}

.main .prev .info h2 {
  margin-bottom: 30px;
}

.main .prev .info .precio {
  margin-top: 65px;
  font-weight: bold;
  font-size: 25px;
}

.main .prev .info .cantidad {
  display: flex;

  margin-top: 90px;
  line-height: 20px;
}

.main .prev .info .cantidad .botones {
  display: flex;

  margin-left: 15px;
}

.main .prev .info .cantidad .botones button {
  border-style: none;
  background: #fff;
  align-items: center;
}

.main .prev .info .cantidad .botones p,
.main .prev .info .cantidad .botones button {
  border: 1px solid #000;
  padding: 0 10px 0 10px;
}

.main .prev .info .cantidad .botones button:hover {
  cursor: pointer;
  background: rgb(235, 235, 235);
}

.main .prev .info .carrito {
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  border-style: none;
  background: #001425;
  color: #fff;
  margin-top: 40px;
}

.main .prev .info .carrito i {
  margin-right: 10px;
  font-size: 12px;
}

.main .prev .info .carrito:hover {
  cursor: pointer;
  background: rgb(0, 20, 37, 0.8);
}

/* detalles */

.main .detalles {
  margin-top: 50px;
  line-height: 30px;
}

.main .detalles h3 {
  margin-bottom: 10px;
}

.main .detalles p {
  margin-bottom: 20px;
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