FROM ubuntu
RUN apt update
RUN apt -y install curl
COPY ./scs .
RUN touch log
ENTRYPOINT ["sh", "exec.sh"]
