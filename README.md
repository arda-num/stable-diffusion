# Bacground Removal and Product Placement API 

## Description

This API is used to remove the background of an image and place the product on a desired background. Background generation is done using Stable Diffusion models (https://huggingface.co/stabilityai/stable-diffusion-2-inpainting). The API is built using FastAPI and deployed using Docker.


## Requirements

- Docker
- Nvidia GPU (optional but recommended)

## Usage

### 1. Clone the repository

```bash
git clone https://github.com/arda-num/stable-diffusion.git
```

### 2. Build the docker image

```bash
docker build -t background-removal-api .
```

### 3. Run the docker container

```bash
docker run -d --name background-removal-api -p 80:80 background-removal-api
```

### 4. Test the API

```bash
curl -X POST "http://localhost:80/remove_background" -H "accept: application/json" -H "Content-Type: multipart/form-data" -F "image=@<path_to_image>"
```