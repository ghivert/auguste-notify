FROM library/postgres:12-alpine
COPY create-databases.sql /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/init-databases.sh
EXPOSE 5432
