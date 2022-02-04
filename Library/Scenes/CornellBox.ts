import { Color } from "../Color.ts";
import { HitableList } from "../HittableList.ts";
import { Camera } from "../Objects/Camera.ts";
import { Point } from "../Point.ts";
import { RayTrace } from "../RayTrace.ts";
import { Lambertian } from '../Materials/Lambertian.ts';
import { Vector3 } from "../Vector3.ts";
import { yz_rect } from "../Objects/yz_rect.ts";
import { xz_rect } from "../Objects/xz_rect.ts";
import { xy_rect } from "../Objects/xy_rect.ts";
import { Box } from "../Objects/Box.ts";
import { SolidColor } from "../Materials/solidColor.ts"
import { DiffuseLight } from "../Materials/DiffuseLight.ts"





const rayTracer = new RayTrace()

// settings
const sample = 200;
const img_width = 300;
const aspect_ratio = 1;

// Camera
const lookfrom = new Point(278,278,-800);
const lookat = new Point(278, 278, 0);
const vUp = new Vector3(0,1,0);
const dist_to_focus = 1.5
const aperture = 0.001;
const camera = new Camera(lookfrom,lookat,vUp,aperture,dist_to_focus,40,aspect_ratio);


// world
const world = new HitableList();

world.add(new yz_rect(0, 555, 0, 555, 555,new Lambertian(new SolidColor(new Color(.12, .45, .15)))));
world.add(new yz_rect(0, 555, 0, 555, 0,new Lambertian(new SolidColor(new Color(.65, .05, .05)))));
world.add(new xz_rect(0, 555, 0, 555, 0,new Lambertian(new SolidColor(new Color(.73, .73, .73)))));
world.add(new xz_rect(0, 555, 0, 555, 555,new Lambertian(new SolidColor(new Color(.73, .73, .73)))));
world.add(new xy_rect(0, 555, 0, 555, 555,new Lambertian(new SolidColor(new Color(.73, .73, .73)))));

world.add(new xz_rect(213, 343, 227, 332, 554,new DiffuseLight(new Color(15, 15, 15)))); // light

world.add(new Box(new Point(130,0,65),new Point(295,165,230),new Lambertian(new SolidColor(new Color(.73, .73, .73)))));
world.add(new Box(new Point(265,0,295),new Point(430,330,460),new Lambertian(new SolidColor(new Color(.73, .73, .73)))));

rayTracer.renderImage(camera, world,sample,img_width,aspect_ratio);