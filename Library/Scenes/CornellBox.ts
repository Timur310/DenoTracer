import { Color } from "../Color.ts";
import { HitableList } from "../HittableList.ts";
import { Camera } from "../Objects/Camera.ts";
import { Point } from "../Point.ts";
import { RayTrace } from "../RayTrace.ts";
import { Lambertian } from "../Materials/Lambertian.ts";
import { Vector3 } from "../Vector3.ts";
import { yz_rect } from "../Objects/yz_rect.ts";
import { xz_rect } from "../Objects/xz_rect.ts";
import { xy_rect } from "../Objects/xy_rect.ts";
import { Box } from "../Objects/Box.ts";
import { SolidColor } from "../Materials/solidColor.ts";
import { DiffuseLight } from "../Materials/DiffuseLight.ts";
import { Rotate_y } from "../Objects/Rotate_y.ts";
import { Translate } from "../Objects/Translate.ts";

const rayTracer = new RayTrace();

// settings
const sample = 100;
const img_width = 300;
const aspect_ratio = 1;

// Camera
const lookfrom = new Point(278, 278, -800);
const lookat = new Point(278, 278, 0);
const vUp = new Vector3(0, 1, 0);
const dist_to_focus = 1.5;
const aperture = 0.001;
const camera = new Camera(
  lookfrom,
  lookat,
  vUp,
  aperture,
  dist_to_focus,
  40,
  aspect_ratio,
);

// world
const world = new HitableList();

world.add(
  new yz_rect(
    0,
    555,
    0,
    555,
    555,
    new Lambertian(new SolidColor(new Color(.12, .45, .15))),
  ),
);
world.add(
  new yz_rect(
    0,
    555,
    0,
    555,
    0,
    new Lambertian(new SolidColor(new Color(.65, .05, .05))),
  ),
);
world.add(
  new xz_rect(
    0,
    555,
    0,
    555,
    0,
    new Lambertian(new SolidColor(new Color(.73, .73, .73))),
  ),
);
world.add(
  new xz_rect(
    0,
    555,
    0,
    555,
    555,
    new Lambertian(new SolidColor(new Color(.73, .73, .73))),
  ),
);
world.add(
  new xy_rect(
    0,
    555,
    0,
    555,
    555,
    new Lambertian(new SolidColor(new Color(.73, .73, .73))),
  ),
);

world.add(
  new xz_rect(213-50, 343+50, 227-50, 332+50, 554, new DiffuseLight(new Color(15, 15, 15))),
); // light

const box1 = new Box(
  new Point(0, 0, 0),
  new Point(165, 330, 165),
  new Lambertian(new SolidColor(new Color(.73, .73, .73)))
);
 const rotatedbox1 =  new Rotate_y(box1,15);
const translatedbox1 = new Translate(rotatedbox1, new Vector3(265,0,295))

const box2 = new Box(
  new Point(0, 0, 0),
  new Point(165, 165, 165),
  new Lambertian(new SolidColor(new Color(.73, .73, .73))),
);
const rotatedbox2 = new Rotate_y(box2,-18);
const translatedbox2 = new Translate(rotatedbox2, new Vector3(130,0,65))

world.add(translatedbox1);
world.add(translatedbox2);

rayTracer.renderImage(camera, world, sample, img_width, aspect_ratio);
