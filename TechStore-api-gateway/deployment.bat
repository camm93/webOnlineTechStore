call heroku login
call heroku container:login
call heroku container:push web --app mintic-c4-proj-apigateway
call heroku container:release web --app mintic-c4-proj-apigateway