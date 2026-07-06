Below is a detailed, interview-friendly Docker notes set with explanations and simple examples. It is written in a clear way so you can revise quickly before interviews.

1. What is Docker?

Docker is a platform used to build, ship, and run applications in lightweight, isolated environments called containers.

Why it is used:
- Consistent environment across machines
- Easy deployment
- Faster than virtual machines
- Supports microservices architecture

Simple example:
- Your app works on your laptop
- Docker ensures it also works on another machine

2. Why Docker is needed

Before Docker:
- “It works on my machine” was common
- Different OS, library, and dependency versions caused issues

Docker solves this by packaging:
- application code
- runtime
- libraries
- dependencies

So the app runs the same everywhere.

3. Docker vs Virtual Machines

Docker:
- uses host OS kernel
- lightweight
- fast startup
- less resource usage

Virtual Machine:
- has full OS inside
- heavier
- slower startup
- more resource usage

Example:
- VM = small complete computer
- Docker container = isolated app environment

4. Key Docker Concepts

Image
- A read-only template used to create containers
- Contains application and dependencies

Container
- A running instance of an image
- Mutable and temporary

Dockerfile
- Text file with instructions to build an image

Registry
- Place where Docker images are stored
- Example: Docker Hub

5. Docker Image

An image is like a class in OOP.

Example:
- Image = blueprint
- Container = object created from that blueprint

Example:
```dockerfile
FROM node:20
```

This line means “use Node.js image as base”.

6. Docker Container

A container is a running instance of an image.

Example:
```powershell
docker run hello-world
```

This starts a container from the hello-world image.

7. Dockerfile

A Dockerfile contains instructions to build an image.

Example:
```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
```

Explanation:
- FROM: base image
- WORKDIR: set container working directory
- COPY: copy files
- RUN: execute commands
- CMD: default command to run

8. Common Dockerfile Instructions

FROM
- Defines base image

```dockerfile
FROM ubuntu:24.04
```

RUN
- Executes commands during image build

```dockerfile
RUN apt-get update
```

COPY
- Copies files from host to image

```dockerfile
COPY . /app
```

ADD
- Similar to COPY, but can also download remote files

WORKDIR
- Sets working directory

```dockerfile
WORKDIR /app
```

ENV
- Sets environment variables

```dockerfile
ENV PORT=3000
```

EXPOSE
- Documents the port used by the container

```dockerfile
EXPOSE 3000
```

CMD
- Default command to run when container starts

```dockerfile
CMD ["node", "server.js"]
```

ENTRYPOINT
- Main command that cannot be easily overridden

```dockerfile
ENTRYPOINT ["node", "server.js"]
```

9. Difference Between CMD and ENTRYPOINT

CMD:
- default command
- can be overridden

ENTRYPOINT:
- main executable
- harder to override

Example:
```dockerfile
ENTRYPOINT ["node"]
CMD ["server.js"]
```

This runs:
```powershell
node server.js
```

10. Build an Image

Command:
```powershell
docker build -t myapp .
```

Meaning:
- build an image named myapp
- from current directory

11. Run a Container

Command:
```powershell
docker run myapp
```

With port mapping:
```powershell
docker run -p 3000:3000 myapp
```

Explanation:
- host port 3000 maps to container port 3000

12. List Images

```powershell
docker images
```

13. List Running Containers

```powershell
docker ps
```

14. List All Containers

```powershell
docker ps -a
```

15. Stop a Container

```powershell
docker stop container_name
```

16. Remove a Container

```powershell
docker rm container_name
```

17. Remove an Image

```powershell
docker rmi image_name
```

18. Docker Networking

Containers need networking to communicate.

Important concept:
- `localhost` inside a container refers to the container itself
- For container-to-container communication, use container name

Example:
```powershell
docker run --name mongo -d mongo
docker run --name app --link mongo -d myapp
```

Modern approach:
- use Docker network and container names

19. Docker Networks

Common types:
- bridge
- host
- none

Bridge:
- default network
- containers can talk to each other

Example:
```powershell
docker network create mynetwork
```

20. Port Mapping

To expose app to host:
```powershell
docker run -p 8080:80 nginx
```

Meaning:
- access app from host at port 8080
- container listens on 80

21. Docker Volumes

Volumes are used to persist data outside the container.

Why needed:
- containers are temporary
- data stored inside container can be lost

Create volume:
```powershell
docker volume create myvolume
```

Use volume:
```powershell
docker run -v myvolume:/data myapp
```

22. Bind Mounts

Bind mounts link a local folder to a container folder.

Example:
```powershell
docker run -v C:\project:/app myapp
```

Difference:
- volume: managed by Docker
- bind mount: tied to host directory

23. Docker Compose

Docker Compose helps run multi-container applications with one file.

Example:
```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
  mongo:
    image: mongo
```

Run:
```powershell
docker compose up
```

24. Why Docker Compose is used

- Manage multiple containers easily
- One command to start services
- Better for apps with DB, app server, cache, etc.

25. Docker Hub

Docker Hub is a public registry for images.

Push image:
```powershell
docker push username/image_name
```

Pull image:
```powershell
docker pull username/image_name
```

26. Docker Registry

A registry stores images.
Examples:
- Docker Hub
- Amazon ECR
- Azure Container Registry
- Google Artifact Registry

27. Container Lifecycle

Create/run:
```powershell
docker run image_name
```

Stop:
```powershell
docker stop container_name
```

Start again:
```powershell
docker start container_name
```

Remove:
```powershell
docker rm container_name
```

28. Difference Between docker run and docker exec

docker run:
- create and start a new container

```powershell
docker run -it ubuntu
```

docker exec:
- run a command inside an already running container

```powershell
docker exec -it container_name bash
```

29. Difference Between docker start and docker run

docker run:
- creates and starts a container

docker start:
- starts an existing stopped container

30. Difference Between Image and Container

Image:
- blueprint
- static

Container:
- runtime instance
- dynamic

31. Container Isolation

Containers are isolated from each other but share the host kernel.

This makes them lightweight and faster.

32. Docker Layers

Each Dockerfile instruction creates a layer.

Example:
```dockerfile
FROM node:20
RUN npm install
COPY . .
```

Layers help:
- caching
- faster rebuilds
- smaller image updates

33. Docker Caching

Docker reuses cached layers when instructions have not changed.

Example:
If package.json changes, only later layers rebuild.

34. Multi-stage Builds

Used to create smaller production images.

Example:
```dockerfile
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

Benefits:
- smaller final image
- cleaner production image

35. Best Practices for Docker

- Use small base images
- Use .dockerignore
- Run one process per container
- Keep images lightweight
- Use environment variables
- Avoid installing unnecessary packages
- Use multi-stage builds
- Use volumes for persistent data

36. .dockerignore

Used to exclude files from build context.

Example:
```dockerignore
node_modules
.git
.env
```

This speeds up builds and keeps images smaller.

37. Common Interview Questions

Q1: What is Docker?
A: Docker is a platform to build, ship, and run applications in containers.

Q2: What is the difference between Docker and VM?
A: VMs run full OS; Docker containers share host OS kernel and are lightweight.

Q3: What is an image?
A: An image is a read-only template used to create containers.

Q4: What is a container?
A: A container is a running instance of an image.

Q5: What is Dockerfile?
A: It contains instructions to build an image.

Q6: What is the difference between CMD and ENTRYPOINT?
A: CMD provides default arguments; ENTRYPOINT defines the main executable.

Q7: What is Docker Compose?
A: It is used to manage multi-container applications using a YAML file.

Q8: What are Docker volumes?
A: Volumes are used for persistent data storage outside the container.

Q9: Why use Docker?
A: For consistency, portability, easy deployment, and faster app delivery.

Q10: What is port mapping?
A: Mapping host port to container port.

38. Simple Real-Life Example

Suppose you have a Node.js app.

Dockerfile:
```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
```

Commands:
```powershell
docker build -t mynodeapp .
docker run -p 3000:3000 mynodeapp
```

Now your app runs in a container.

39. Docker for Microservices

Docker is very popular in microservices because each service can run in its own container.

Example:
- API container
- Auth container
- Database container
- Cache container

Each can scale independently.

40. Important Interview Tip

When answering Docker interview questions, explain with:
- definition
- use case
- example command
- benefits

Example answer:
“Docker is a containerization platform that packages applications and their dependencies into containers so they run consistently across environments. It is lightweight compared to virtual machines and makes deployment easier.”

41. One-Line Summary

Docker = package your app and dependencies into containers so it runs consistently anywhere.

42. Quick Revision Cheat Sheet

- Image = blueprint
- Container = running instance
- Dockerfile = instructions to build image
- Docker Hub = image registry
- Volume = persistent storage
- Network = communication between containers
- Compose = multi-container management

If you want, I can also give you:
- a shorter 1-page interview cheat sheet, or
- a set of Docker interview questions with answers.