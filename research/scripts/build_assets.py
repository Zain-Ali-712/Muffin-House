import os
from PIL import Image
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
P = os.path.join(R, "..", "public", "img")
def save(im, out, maxside, q=82):
    im = im.copy(); im.thumbnail((maxside, maxside), Image.LANCZOS)
    im.save(os.path.join(P, out), "WEBP", quality=q, method=6); print(out, im.size)
def cut(name, crop_frac=None):
    im = Image.open(os.path.join(R, "cutouts", name + ".png")).convert("RGBA")
    if crop_frac:
        w, h = im.size; im = im.crop((0, 0, w, int(h * crop_frac)))
        bb = im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox(); im = im.crop(bb)
    return im
save(cut("wix-logo"), "brand/logo.webp", 520, 90)
lg = cut("wix-logo"); lg.thumbnail((256, 256)); c = Image.new("RGBA", (256, 256)); c.paste(lg, ((256-lg.width)//2, (256-lg.height)//2), lg); c.save(os.path.join(R, "..", "app", "icon.png"))
save(cut("wix-4"), "cut/tower.webp", 1100)
save(cut("CoW3zDZq1S5-0"), "cut/nutella.webp", 900)
save(cut("CohG-5UKirb-0", 0.86), "cut/boston.webp", 1000)
save(cut("wix-3", 0.6), "cut/oreo-cream.webp", 1000)
save(cut("wix-1"), "cut/choc-stack.webp", 900)
save(cut("DQUWNj0jYfu-0"), "cut/smash.webp", 1000)
save(cut("DPUe-uCDeVw-0"), "cut/midnight.webp", 1000)
I = os.path.join(R, "img")
for src, out, m in [("wix-chef.jpg","photo/chef.webp",700),("wix-why1.webp","photo/boston-open.webp",1400),("DO6Rjimlezu-1.jpg","photo/pizza.webp",1100),("wix-pizza.jpg","photo/pizza-2.webp",1100),("DO6Rjimlezu-0.jpg","photo/signage.webp",1100),("DPyr8ttDfRX-3.webp","photo/double-glazed.webp",1100),("DULBdUZAMYW-0.jpg","photo/korean.webp",1100),("CoW3zDZq1S5-1.webp","photo/nutella-bite.webp",700),("CoW3zDZq1S5-0.webp","photo/nutella.webp",700),("wix-2.jpg","photo/choc.webp",1100),("CohG-5UKirb-0.webp","photo/boston.webp",1000),("DQUWNj0jYfu-0.webp","photo/smash.webp",1000),("DPUe-uCDeVw-0.webp","photo/midnight.webp",1000),("wix-3.jpg","photo/oreo-cream.webp",1100),("wix-4.jpg","photo/tower.webp",1100),("wix-1.jpg","photo/choc-stack.webp",900),("DS7bQ7plDhI-0.jpg","photo/korean-ny.webp",1000)]:
    save(Image.open(os.path.join(I, src)).convert("RGB"), out, m, 80)
