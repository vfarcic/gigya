Development
-----------

```bash
docker-compose -f docker-compose-dev.yml run --rm back-compile

docker-compose -f docker-compose-dev.yml build back

docker-compose -f docker-compose-dev.yml up db proxy front back

open http://localhost:8080/demo/login.html
```

Production
----------

```bash
docker-compose build

docker-compose up -d

open http://localhost:8080/login.html

go get -d -v -t && go build -o gigya && ./gigya
```