FROM ubuntu
RUN apt update
RUN apt -y install curl
COPY ./scs .
ENTRYPOINT ["sh", "exec.sh"]
