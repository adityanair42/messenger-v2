FROM postgres:latest

ENV POSTGRES_DB=messengerv2_db
ENV POSTGRES_USER=postgres_user
ENV POSTGRES_PASSWORD=dockerpassword

COPY ./prisma/migrations /docker-entrypoint-initdb.d/

CMD ["postgres"]