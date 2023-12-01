## DOCKER COMMANDS

- To check list of running docker containers
  docker ps or docker container ls
- To see commands for options available to ps
  docker ps --help

- To pull a docker image:
  docker pull <image:tag>
  To build from an existing image (dockerfile)

- To run a container with the docker image in a detached form so one doesn’t have to open another terminal
  docker run –d –p 8080:80 <image:tag>
  the –p helps to map the port 8080 over port 80, e.g. so the container can be reached on port 8080 (any port of choice can be chosen to be mapped over 80)
  one can map more than one port over 80, i.e. 8080 and 3000 with 2 different –p tags (-p 8080:80 –p 3000:80)

- To stop a running container:
  docker stop <container id> or docker stop <container name>

- To start a container that has been stopped but no removed
  docker start <container id> or docker start <container name>

- To remove a container that has been stopped
  docker rm <container id> or docker rm <container name>

- To show all ids of available containers (running or stopped)
  docker ps –aq

- To remove all stopped containers in one fell swoop (won’t work on running containers)
  docker rm $(docker ps –aq)

- Running containers can be forcefully removed too by passing the ‘-f’ flag
  docker rm –f $(docker ps –aq)

- A name can be specified for a container so that a random name is not supplied by docker
  docker run --name <container name> -d -p <preferred port>:80 -p <another preferred port>:80 <image:tag>

- To format the output of ‘’docker ps” to make it more legible, each column per line:
  docker ps --format="ID\t{{.ID}}\nNAME\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"
- Another way is to save it all in a variable on the terminal (bash?):
  export FORMAT="ID\t{{.ID}}\nNAME\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\t{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"
- Then run a simpler command:
  docker ps --format=$FORMAT

- Volumes allow sharing of data between host and container or between different containers

SERVING MY OWN SAMPLE SERVER USING NGINX (https://hub.docker.com/_/nginx)

- To share a volume, e.g. Host a simple static content:
  docker run --name <container name> -v /some/content:/usr/share/nginx/html:ro -d –p 8080:80 nginx

‘/some/content’ is the folder/file (volume) to mount and share with Nginx to replace the default webpage ‘/usr/share/nginx/html:ro’ shared or exposed by Nginx

- Can navigate into the folder that has the content to serve, so that it’s easier using $(pwd), then the command changes to:
  docker run --name <container name> -v $(pwd):/usr/share/nginx/html:ro -d –p 8080:80 nginx

- To bash into the container:
  docker exec -it <container name> bash

- Can navigate into the exposed directory : usr/share/nginx/html

Any file added/created in here will be served too so long as the container was not run with “:ro”, the Read Only Flag as previously done. If so, it’d need to be removed and reran without the “:ro” flag
Any file added here will also be added to the host/source folder i.e. $(pwd)

- To share volumes between containers:
  docker run --name <new container name> --volumes-from <container to get volumes from> -d -p 8081:80 nginx

To build a dockerfile
(https://docs.docker.com/engine/reference/builder/)

- Create a “Dockerfile” in the root of the project directory into which you’ll copy a snapshot of everything that makes the app run, i.e folders, dependencies, build files, configs, etc…
- Usually, an existing image is used as a base, e.g nginx:latest (first pulled), then the FROM command is used to build from this base.
- Then use “ADD <current folder> <location of static content>”.
- For nginx, and while in the project folder, the first two commands will be something like in the Dockerfile will be:
  SAMPLE FOR STATIC SITE
  o FROM nginx:latest
  o ADD . /usr/share/nginx/html
- To build and image from this Dockerfile while in the same directory:
  o docker –tag (or -t) build <name:optionalTag> <location of dockerfile>
  o run container from the newly created image: docker run --name website -p 8080:80 -d website:latest
  SAMPLE FOR NODE
  o FROM node
  o WORKDIR /app (use/create a folder called “app”, in which all further commands will be executed)
  o ADD . . (add everything in the current folder to the app folder)
  o RUN npm install (install all dependencies)
  o CMD node index.js (run/start the app)
- docker build --tag <imageName:tag> .
- docker run --name <name your app> -d -p 3000:3000 <imageName:tag>
- docker image ls – to list all the images available
  FOR SMALLER BASE IMAGES
- docker pull node:lts-alpine (https://hub.docker.com/_/node)
- docker pull nginx:stable-alpine3.17-slim (https://hub.docker.com/_/nginx)
- So pulled image file size can be reduced by pulling the alpine version
- Change the base image tags in the dockerfile to match what we want to use (alpine) so that our final app image size is reduced too.
  TAGGING
- docker tag davidokolie-website:latest davidokolie-website:1
  PUSHING TO A REMOTE REPOSITORY (https://hub.docker.com/)
- first login / register on the website
- login can be done on the CLI too with “docker login –u <username>”, then when password is requested, it’s best to use the PAT from the CLI as the password for full access.
- Retag app locally to fit reference to folder and appname, e.g.:
- docker tag davidokolie-website:1 davidokolie/website:1
- then push to the remote registry like so:
- docker push <repo name>/appName:tagname
- e.g.: docker push davidokolie/website:2
  TO REMOVE AN IMAGE
- docker rmi <repo name>/appName:tagname
  TO PULL AN IMAGE FROM A REPO IN THE CONTAINER REGISTRY
- docker pull <repo name>/appName:tagname
  if no tagName is added. It pulls the latest
  TO INSPECT THE CONFIG/DETAILS OF A CONTAINER
- docker inspect <Container name or ID>
  To Check logs
- docker logs <Container name or ID> (any console.log for nodejs, any request made on website)
- docker logs –f <Container name or ID> (to keep tabs and follow the logs in real time)
- docker logs –help (to see all you can do with logs)
  To inspect the box(Platform) that the container is running in. i.e. jump into the actual container
- docker exec –help
- docker exec -it <container Name> sh (or bash, whatever shell the container has) – to “bash” into the container
