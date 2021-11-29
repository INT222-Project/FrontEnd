echo "Inside Shell Script" ;
cd FrontEnd ;
ls -la ;
git status ;
git pull ;
git status ;
docker-compose down ;
docker-compose up --build -d ;
docker ps -a ;