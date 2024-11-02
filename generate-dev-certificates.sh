read -p "Enter project: " project

mkdir "./$project/secrets/"

cd "./$project/secrets/"

openssl genrsa -out private-key.pem 2048

openssl req -key private-key.pem -new -out request-sign.pem

openssl x509 -req -days 365 -in request-sign.pem -signkey private-key.pem -out public-certificate.pem

mkcert -key-file ./private-key.pem -cert-file ./public-certificate.pem localhost