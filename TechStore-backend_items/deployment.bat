call heroku login
call heroku container:login
call mvn package
call heroku container:push web --app mintic-c4-proj-item-be
call heroku container:release web --app mintic-c4-proj-item-be
