<template>
  <body>
    <header>
      <div class="mensaje">
        <h1>{{selCategory}}</h1>
      </div>
    </header>
    <section class="main">
      <div class="productos">
        <div class="producto" v-for="(item, index) in itemByCategory" :key="index" v-on:click="loadProduct(item.ref)">
          <div class="imagen" ><img :src="require(`../assets/home/${item.image}`)"></div>
          <div class="info">
            <p><b>{{item.name}}</b></p>
            <p class="categoria">{{item.category}}</p>
            <p><b>${{item.price}}</b></p>
          </div>
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

export default {
  name: "Category",

  data: function (){
    return {
      itemByCategory: [],
      selCategory: localStorage.getItem("selCategory") || "none",
    }
  },

  apollo: {
    itemByCategory: {
      query: gql`
        query ItemByCategory($category: String!) {
          itemByCategory(category: $category) {
            ref
            name
            category
            price
            inStock
            warranty
            details
            image
          }
        }`,
        variables() {
          return {
           category: this.selCategory,
          }
        }
      }
  },

  methods: {
    loadProduct: function(itemRef){
      localStorage.setItem("itemRef", itemRef);
      this.$router.push({ name: "product"});
  },
  },


  created: function (){
    this.$apollo.queries.itemByCategory.refetch();
  }
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
  position: relative;
  margin-left: 50px;
  top: 200px;
  color: #fff;
  text-align: center;
}

/* ----- main ----- */
.main .productos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.main .productos .producto {
  height: 370px;
  width: 300px;
  background: #c4c4c452;
  margin: 35px;
  border-radius: 5px;
}

.main .productos .producto .imagen {
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

.main .productos .producto .imagen:hover {
  cursor: pointer;
  background-size: 110%;
}

.main .productos .producto .info {
  margin: 12px;
  line-height: 30px;
}

.main .productos .producto .info .categoria {
  cursor: pointer;
}

/* footer */

.main .footer {
  background: #001322;
  color: #fff;
  text-align: center;
  padding: 20px 0 20px 0;
}
</style>


