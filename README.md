# Bacground Removal and Product Placement API 

## Description

This API is used to remove the background of an image and place the product on a desired background. Background generation is done using Stable Diffusion models (https://huggingface.co/stabilityai/stable-diffusion-2-inpainting). The API is built using FastAPI and deployed using Docker.

![download (22)](https://github.com/arda-num/stable-diffusion/assets/78916039/a28e0545-6190-413c-811a-bc20de95eacf)
![download (3)](https://github.com/arda-num/stable-diffusion/assets/78916039/3ad67a07-6548-4235-b198-905fa03c9fc7)

## Requirements

- Docker
- Nvidia GPU (Optional)

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
