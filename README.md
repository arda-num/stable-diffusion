# Bacground Removal and Product Placement API 

## Description

This API is used to remove the background of an image and place the product on a desired background. Background generation is done using Stable Diffusion models (https://huggingface.co/stabilityai/stable-diffusion-2-inpainting). The API is built using FastAPI and deployed using Docker.

![download (22)](https://github.com/arda-num/stable-diffusion/assets/78916039/4c79984e-0788-4e23-9643-29c0daeea151)

## Requirements

- Docker
- Nvidia GPU (optional but recommended)

## Usage

### 1. Clone the repository

```bash
git clone https://github.com/arda-num/stable-diffusion.git
```

### 2. 

#### (OPTION 1) Build the docker image with docker-compose

```bash
docker-compose up
```

#### (OPTION 2) Install the dependencies and run the API

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```


### 3. Test the API (Sample Requests)

#### Inpainting
```bash
curl -o download.png --location --request POST 'http://127.0.0.1:8000/inpaint' \
--form 'prompt="a bottle of perfume with confetti in the background, a digital rendering by Jeff Koons, cg society contest winner, new objectivity, vray tracing, dynamic composition, rendered in unreal engine"' \
--form 'image=@"path/to/image.png"'
```

#### Remove Background
```bash
curl -o download.png --location --request POST 'http://127.0.0.1:8000/removebackground' \
--form 'image=@"path/to/image.png"' 
```
## FAQ

### If you are getting an error called "stable-diffusion-api-1 exited with code 137", 

This is because the docker container is running out of memory. You can increase the memory limit of the container by going to Docker Desktop -> Settings -> Resources -> Advanced -> Memory and increasing the memory limit 

OR 

you can try changing the limits and reservations in docker-compose.yml file.

```bash
deploy:
    resources:
    limits:
        memory: 500M
    reservations:
        memory: 128M
```

