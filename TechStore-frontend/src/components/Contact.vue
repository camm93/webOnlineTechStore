<template>
    <div class="container">
      <div class="card">
        <p>Nombre:    Cristian Alexis Murillo Martínez</p>
        <p>Correo:    crismur93@gmail.com</p>
        <p>Teléfono:  3223050192</p>
      </div>
      <div class="card">
        <p>Nombre:    Andrés Felipe Salamanca Silva</p>
        <p>Correo:    asalamancasilva@gmail.com</p>
        <p>Teléfono:  3214678954</p>
      </div>
      <div class="card">
        <p>Nombre:    Daniel Alejandro Diaz Camelo</p>
        <p>Correo:    dadica1007@gmail.com</p>
        <p>Teléfono:  3014520582</p>
      </div>
      <div class="card">
        <p>Nombre:    Diego Stiven Gallegos Bermúdez</p>
        <p>Correo:    diego.bermudez96@gmail.com</p>
        <p>Teléfono:  3112167979</p>
      </div>
      <div class="card">
        <p>Nombre:    Maryin Liney Ortega Rocha</p>
        <p>Correo:    lineyortegarocha3@gmail.com</p>
        <p>Teléfono:  3208283506</p>
      </div>
    </div>
</template>

<style scoped>
*{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.container{
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.container .card {
  text-align: center;
  border: 0.5px solid #000;
  padding: 5px;
  margin: 5px;
  width: 400px;
  border-radius: 10px;
}
</style>