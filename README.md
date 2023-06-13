# Bacground Removal and Product Placement API 

## Description

This API is used to remove the background of an image and place the product on a desired background. Background generation is done using Stable Diffusion models (https://huggingface.co/stabilityai/stable-diffusion-2-inpainting). The API is built using FastAPI and deployed using Docker.

![download (22)](https://github.com/arda-num/stable-diffusion/assets/78916039/a28e0545-6190-413c-811a-bc20de95eacf)
![download (3)](https://github.com/arda-num/stable-diffusion/assets/78916039/3ad67a07-6548-4235-b198-905fa03c9fc7)

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

This is because the docker container is running out of memory. You can increase the memory limit of the container by going to Docker Desktop -> Settings -> Resources -> Advanced -> Memory and increasing the memory limit OR changing the limits and reservations in docker-compose.yml file.
