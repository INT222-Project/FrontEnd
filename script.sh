echo "Inside Shell Script" ;
cd FrontEnd ;
ls -la ;
git status ;
git pull ;
git status ;
docker-compose down ;
docker build -t frontend .
docker-compose up --build -d ;
docker ps -a ;
