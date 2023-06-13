from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation
from PIL import Image
import torch



processor = CLIPSegProcessor.from_pretrained("CIDAS/clipseg-rd64-refined")
model = CLIPSegForImageSegmentation.from_pretrained("CIDAS/clipseg-rd64-refined")



prompts = ["object", "background"]

def remove_background(image):
    inputs = processor(text=prompts, images=[image] * len(prompts), padding="max_length", return_tensors="pt")
    # predict
    with torch.no_grad():
        outputs = model(**inputs)
    preds = outputs.logits.unsqueeze(1)
    out = torch.sigmoid(preds[1][0])


    img = Image.new(mode="RGBA", size=(preds.shape[2],preds.shape[3]))

    img = image.resize((352,352))
    img = img.convert("RGBA")
    pixels = img.load()
    print(len(out))
    print(len(out[0]))
    for x in range(len(out)):
        for y in range(len(out[x])):
            if out[y][x] > 0.25:
                pixels[x,y] = (255,255,255,0)
    
    return img
