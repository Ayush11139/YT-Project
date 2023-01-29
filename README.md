# YT-Project

### Clone the project
open terminal and paste ```git clone git@github.com:Ayush11139/YT-Project.git```

### Google API key
1. Go to Google developers console
2. Create a new project
3. Click on create credentials
4. At last Go to API libraby and enable youtube/v3 API for the project
5. You can create multiple API keys


### Env format
npm install dotenv
install mongodb locally
make a .env file in the root path and paste the following code replacing the API key or keys in case of multiple keys seperated by comma.

```
NODE_ENV = development
PORT = 3000
MONGODB_URL = mongodb://localhost:27017/otherdb
YOUTUBE_API_KEYS = Google API keys for example <abcdef or aiunsijn,eoiunufei>
YOUTUBE_SEARCH_QUERY = Australia
```
### Running project with node

```
npm i
npm run dev
```
### Running project with docker
1. Install docker on your desktop to see running containers.
2. Replace the MONGODB_URL in your .env file with. Refer docker-compose.yml file for this.

```
MONGODB_URI = mongodb://mymongo:27017
```
3. run the following command

```
docker-compose up --build
```
### API Routes

1. ```localhost:3000/list/<pagenumber>``` for eg ```localhost:3000/list/2```
2. ```localhost:3000/search/<query>/<pagenumber>``` for eg ```localhost:3000/search/boys/3```
