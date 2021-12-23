from mysql:5.7
COPY ./init-scripts /docker-entrypoint-initdb.d/ 

#https://stackoverflow.com/questions/44239766/dockerize-mysql-with-database-and-tables
#Zo kan ik tabellen aanmaken als mijn database opstart