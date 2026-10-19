import os, sys
from PIL import Image, ImageDraw
d=sys.argv[1]; out=sys.argv[2]
fs=sorted(f for f in os.listdir(d) if f.endswith('.png'))
W=300; cols=5; rows=(len(fs)+cols-1)//cols
s=Image.new('RGB',(cols*W,rows*(W+16)),(240,170,200)); dr=ImageDraw.Draw(s)
for i,f in enumerate(fs):
    im=Image.open(os.path.join(d,f)).convert('RGBA'); im.thumbnail((W-10,W-10))
    x=(i%cols)*W; y=(i//cols)*(W+16); s.paste(im,(x+5,y+5),im); dr.text((x+4,y+W),f,fill='black')
s.save(out,quality=80)
