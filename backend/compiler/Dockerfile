FROM gcc:latest
WORKDIR /code
ENTRYPOINT ["sh", "-c", "g++ $1 -o out && ./out", "--"]
