import os, sys
os.environ["U2NET_HOME"] = r"D:\Tools\u2net\models\isnet-general-use"
from rembg import remove, new_session
from PIL import Image
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sess = new_session("isnet-general-use")
for src in sys.argv[1:]:
    im = Image.open(os.path.join(R, "img", src)).convert("RGB")
    if max(im.size) > 1600: im.thumbnail((1600, 1600))
    out = remove(im, session=sess, post_process_mask=True)
    bb = out.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox(); out = out.crop(bb)
    name = os.path.splitext(src)[0]
    out.save(os.path.join(R, "cutouts", f"{name}.png")); print(name, out.size, flush=True)
