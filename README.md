# Online Tech Store

E-commerce built using a microservice architecture and virtualization. In this website, a potential customer can either register or log in, browse the website, look at the different product categories, get a detailed description of any product, and choose his or her favorite items to purchase.

This project comprises two microservices, one for the user authentication protocols, and the other for the products. These resources are consumed by an API Gateway via Rest API communication. Later, at the client end, there’s the web component or frontend which allows the user to interact with the business logic.

## Overall Project Architecture
<img height="450" width="600" src="https://github.com/camm93/webOnlineTechStore/blob/main/TechStore-api-gateway/ArquitecturaFinal.jpeg" alt="Microservice architecture" >

## Authentication Microservice BackEnd
This is an example of a User authentication microservice using <a href="https://www.django-rest-framework.org/">Djando Rest Framework</a> and <a href="https://www.postgresql.org/">PostgreSQL</a>.
It is in charge of handling any information and functionalities related to new or existing users. 

### Some of the technologies used in this microservice include:
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png" /> &emsp; <img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/django/django.png" /> &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" /> &emsp;
<img height="32" width="30" src="https://media-exp1.licdn.com/dms/image/C560BAQG4xGO7GA7ExA/company-logo_200_200/0/1625156273146?e=1651104000&v=beta&t=f9vsl5v48EzI3uXXR27anAvr7VWiCCkdzGznVkP2h9U" > &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" /> &emsp;
<img height="32" width="30" src="https://user-images.githubusercontent.com/88005878/177156169-38326ae0-6a09-4e73-9e79-7ece170dcbba.PNG"> &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" > &emsp;
<a href="https://www.atlassian.com/es/software/jira">Jira - Atlassian</a> &emsp; [TablePlus](https://tableplus.com/)
## Microservice: Product BackEnd

This is an example of a microservice for products using <a href="https://www.java.com/es/">Java</a>, <a href="https://spring.io/projects/spring-boot">Spring Boot</a> FrameWork and <a href="https://www.mongodb.com/es">MongoDB</a>.
This microservice controls any operation related to the products sold on the website.

### Some of the technologies used in this microservice include:
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/java/java.png" /> &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/spring-boot/spring-boot.png"> &emsp;
<img height="32" width="30" src="https://github.com/mongodb/mongo/raw/master/docs/leaf.svg" > &emsp;
<img height="32" width="30" src="https://robomongo.org/static/robomongo-128x128-129df2f1.png" > &emsp;
<img height="32" width="30" src="https://media-exp1.licdn.com/dms/image/C560BAQG4xGO7GA7ExA/company-logo_200_200/0/1625156273146?e=1651104000&v=beta&t=f9vsl5v48EzI3uXXR27anAvr7VWiCCkdzGznVkP2h9U" > &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" /> &emsp;
<img height="32" width="30" src="https://media-exp1.licdn.com/dms/image/C4E0BAQGmNZMDOpmMQg/company-logo_100_100/0/1519905610801?e=1651104000&v=beta&t=5b72d6j04plR4QJhtIKPUQo4cq_LRL6cyc-uQDB-ciE"> &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" > &emsp;
<a href="https://www.atlassian.com/es/software/jira">Jira - Atlassian</a> 

## API Gateway
API Gateway built using <a href="https://www.apollographql.com/docs/apollo-server/">Apollo Server</a>, <a href="https://graphql.org/">GraphQL</a> and JavaScript to manage the data sources from the microservices.

### Some of the technologies used in the API Gateway:
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/e65ef46ef3e7bc457c93622f6a89fe8d3fd131d5/topics/graphql/graphql.png" > &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" /> &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" /> &emsp;
<img height="32" width="30" src="https://user-images.githubusercontent.com/88005878/177156169-38326ae0-6a09-4e73-9e79-7ece170dcbba.PNG"> &emsp;
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" > &emsp;
<a href="https://www.apollographql.com/docs/apollo-server/" >Apollo Server</a>

## Web component
Once the clients log in, they are redirected to the home page where a list of recommended items are displayed. Also, there’s a “recommended” button to bring a new list of items that are retrieved using an algorithm to select among the best-selling products. Additionally, the search of products can be filtered by categories by clicking on any of these including computers, keyboards, mouses and consoles. Furthermore, one specific product can be selected to open its detailed view.

<a href="https://www.youtube.com/watch?v=EZxEW6VZO8U&list=PLUiMsSYMoVSO5IOUzM-dZiSkNLT7gP3MI&index=1" target="_blank"><img src="https://github.com/camm93/camm93.github.io/blob/main/images/app_shop.png" width="600" height="400" border="20" /> </a>
### Some of the technologies used in this component include:
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" > &emsp;<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" > &emsp; 
<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png" > &emsp;<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" > &emsp;<img height="32" width="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" > &emsp; <img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/youtube.svg" />

## For Deployment
Both microservices, apigateway and frontend were deployed on Heroku via Docker for virtualization.

Overall, these are the tools and technologies used in this project:
<img width="600" height="400" src="https://github.com/camm93/webOnlineTechStore/blob/main/TechStore-backend_auth/HerramientasUsadas.PNG" alt="Microservice Architecture and technologies">
