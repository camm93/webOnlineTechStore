<template>
  <body>
    <header>
      <div class="mensaje">
        <h1>
          ¡Hola <span> {{ userDetailById.name }} </span>!
        </h1>
        <h1>¡Bienvenido a Compumundohipermegared!</h1>
        <p>
          Encuentra los mejores dispositivos electronicos al mejor precio y
          calidad
        </p>
        <button v-on:click="loadRecommended">Ver recomendados</button>
      </div>
    </header>
    <section class="main">
      <div class="categorias">
        <div class="categoria uno" v-on:click="loadCategory('Computadores')">
          <h3>Computadores</h3>
        </div>
        <div
          class="categoria dos" v-on:click="loadCategory('Teclados')">
          <h3>Teclados</h3>
        </div>
        <div class="categoria tres" v-on:click=" loadCategory('Ratones')">
          <h3>Mouses</h3>
        </div>
        <div class="categoria cuatro" v-on:click="loadCategory('Consolas')">
          <h3>Consolas</h3>
        </div>
      </div>
      <div class="recomendaciones">
        <h2>Recomendados</h2>
        <div class="productos">
          <div class="producto" 
            v-for="(item, index) in itemsInHome" :key="index"
            v-on:click="loadProduct(item.ref, item.category)">
            <div class="imagen"><img v-bind:src="require(`../assets/home/${item.image}`)" /></div>
            <div class="info">
              <p>
                <b>{{ item.name }}</b>
              </p>
              <p class="categoria">{{ item.category }}</p>
              <p>
                <b>{{ item.price }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="diferenciales">
        <div class="diferencial uno">
          <img src="../assets/home/calidad.png" alt="calidad" />
          <h3>Mejor calidad</h3>
          <p>
            Todos los productos traen la mejor calidad posible mediante
            proveedores oficiales de tus marcas favoritas.
          </p>
        </div>
        <div class="diferencial dos">
          <img src="../assets/home/ofertas.png" alt="calidad" />
          <h3>Mejores ofertas</h3>
          <p>
            Encuentra en nuestra pagina web las mejores ofertas para tus
            productos favoritos.
          </p>
        </div>
        <div class="diferencial tres">
          <img src="../assets/home/pagos.png" alt="calidad" />
          <h3>Pagos seguros</h3>
          <p>
            Contamos con diferentes medios de pago por medio de plataformas
            seguras.
          </p>
        </div>
      </div>
      <div class="footer">
        <p>Copyright © 2021 compumundohipermegared</p>
      </div>
    </section>
  </body>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "Home",

  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
      userDetailById: {
        id: "",
        username: "",
        name: "",
        surname: "",
        email: "",
      },
      itemsInHome: [],
      nItems: 8,
      urls: "",
    };
  },

  apollo: {
    userDetailById: {
      query: gql`
        query ($userId: Int!) {
          userDetailById(userId: $userId) {
            id
            username
            name
            surname
            email
          }
        }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      },
    },

    itemsInHome: {
      query: gql`
        query ItemsInHome($nItems: Int!) {
          itemsInHome(nItems: $nItems) {
            ref
            name
            category
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
          nItems: this.nItems,
        };
      },
    },
  },

  methods: {
    getImages: function () {
      // still not working
      //let urlStrings = this.itemsInHome.map((a) => a.image);
      //console.log(urlStrings);
      //for(var i=0; i<itemsInHome.length; i++){
      //this.itemsInHome[i].image = urlStrings[i]
      //}
      //document.getElementByID('imagenString').src = {{item.image}};
      //this.urls = this.itemsInHome[0].image;
      //console.log(this.urls)
    },

    loadRecommended: function(){
      this.$apollo.queries.itemsInHome.refetch();
    },

    loadCategory: function (selCategory) {
      localStorage.setItem("selCategory", selCategory);
      this.$router.push({ name: "category" });
    },

    loadProduct: function(itemRef, itemCategory){
      localStorage.setItem("itemRef", itemRef);
      localStorage.setItem("selCategory", itemCategory);
      this.$router.push({ name: "product"});
  },

  },

  created: function () {
    this.$apollo.queries.userDetailById.refetch();
    this.$apollo.queries.itemsInHome.refetch();
    this.getImages();
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
}

/* ----- header ----- */
header {
  height: 500px;

  background: url(../assets/home/productos-gamer.png);
  background-position: center;
  background-size: cover;
}

header .menu {
  display: flex;
  justify-content: space-between;
}

header .menu1 {
  margin-left: 35px;
}

header .menu2 {
  margin-right: 35px;
}

header .menu1 ul li,
header .menu2 ul li {
  display: inline-block;
  margin-top: 15px;
  padding: 5px 15px 5px 15px;

  text-decoration: none;
  list-style: none;
  color: #fff;
}

header .menu1 ul li:hover {
  cursor: pointer;
  text-decoration: underline;
}

header .menu2 ul li:hover {
  cursor: pointer;
  background: #c4c4c462;
  border-radius: 5px;
}

header .mensaje {
  position: absolute;
  margin-left: 50px;
  top: 220px;
  color: #fff;
}

header .mensaje h1 {
  margin-bottom: 15px;
}

header .mensaje p {
  margin-bottom: 35px;
}

header .mensaje button {
  padding: 5px;
  background: #c4c4c446;
  border-style: none;
  border-radius: 5px;
  color: #fff;
}

header .mensaje button:hover {
  cursor: pointer;
  background: #c4c4c462;
}

/* ----- main ----- */

/* Categorias */

.main .categorias .uno {
  background: url(../assets/home/cat-pc.png);
}

.main .categorias .dos {
  background: url(../assets/home/cat-teclados.png);
}

.main .categorias .tres {
  background: url(../assets/home/cat-mouses.png);
}

.main .categorias .cuatro {
  background: url(../assets/home/cat-mandos.png);
}

.main .categorias {
  display: flex;
}

.main .categorias .categoria {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25%;
  height: 225px;
  color: #fff;
  background-position: center;
  background-size: cover;
}

.main .categorias .categoria:hover {
  cursor: pointer;
  background-position: center;
  background-size: 110%;
}

/* Recomendaciones */

.main .recomendaciones h2 {
  margin-top: 40px;
  text-align: center;
}

.main .recomendaciones .productos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.main .recomendaciones .productos .producto {
  height: 370px;
  width: 300px;
  background: #c4c4c452;
  margin: 35px;
  border-radius: 5px;
}

.main .recomendaciones .productos .producto .imagen {
  width: 100%;
  height: 225px;
  border-radius: 5px 5px 0 0;
  border: solid #c4c4c452 1px;
  background-position: center;
  background-size: cover;
}

.main .productos .producto .imagen img {
  width: 100%;
  height: 100%;
}

.main .recomendaciones .productos .producto .imagen:hover {
  cursor: pointer;
  background-size: 120%;
}

.main .recomendaciones .productos .producto .info {
  margin: 12px;
  line-height: 30px;
}

.main .recomendaciones .productos .producto .info .categoria {
  cursor: pointer;
}

/* diferenciales */

.main .diferenciales {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  height: 455px;
  background: #f4f4f4;
}

.main .diferenciales .diferencial {
  margin: 0 50px 0 50px;
  width: 316px;
  height: 270px;
  text-align: center;
}

.main .diferenciales .diferencial img {
  width: 90px;
  height: 90px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.main .diferenciales .diferencial h3 {
  margin-bottom: 20px;
}

/* footer */

.main .footer {
  background: #001322;
  color: #fff;
  text-align: center;
  padding: 20px 0 20px 0;
}
</style>