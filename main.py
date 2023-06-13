from fastapi import FastAPI, UploadFile, File, Form
from diffusers import StableDiffusionInpaintPipeline
import torch
from PIL import Image
from typing import Annotated
from fastapi.responses import FileResponse
from foreground_segmentation import remove_background

app = FastAPI()

#Stable Diffusion Model for Inpainting
pipe = StableDiffusionInpaintPipeline.from_pretrained(
    "stabilityai/stable-diffusion-2-inpainting",
    torch_dtype=torch.float32, # float16 is much faster but does not support cpu usage
)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

pipe.to(device)

@app.post("/inpaint")
async def inpaint(prompt: Annotated[str, Form()], image: UploadFile):
    # Save the uploaded image
    with open("uploaded_image.png", "wb") as f:
        f.write(await image.read())
    image = Image.open("uploaded_image.png") 

    img = image.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Traverse the image and convert all transparent pixels to white 
    # and all non-transparent pixels to black
    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255 and item[3] == 0:
            newData.append((255, 255, 255, 255))
        else:
            newData.append((0,0,0,0))
    img.putdata(newData)

    ratio = image.size[1]/image.size[0]
    # Round the height to the nearest multiple of 8
    new_height = ((ratio*512) // 8) * 8

    image = pipe(prompt=prompt,
                image=image, mask_image=img,
                height=round(new_height),
                width=512).images[0]
    image.save("./generated_image.png")

    return FileResponse("generated_image.png", media_type="image/png")


@app.post("/removebackground")
async def removebg(image: UploadFile):
    # Save the uploaded image
    with open("uploaded_image.png", "wb") as f:
        f.write(await image.read())
    image = Image.open("uploaded_image.png")
    img = remove_background(image)
    img.save("./generated_image.png")

    return FileResponse("generated_image.png", media_type="image/png") 