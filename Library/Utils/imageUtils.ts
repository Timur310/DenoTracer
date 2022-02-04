import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { multiplyVector, unitVector } from "./vecUtil.ts";
import { HitableList } from '../HittableList.ts'
import { Record } from "../Record.ts";
import { clamp } from "./MathUtils.ts";

export function writeColor(pixeColor: Color, sample: number): string 
{
    const scale = 1.0 / sample;

    let r = pixeColor.getX;
    let g = pixeColor.getY;
    let b = pixeColor.getZ;

    r = Math.sqrt(scale * r);
    g = Math.sqrt(scale * g);
    b = Math.sqrt(scale * b);
    return 256*clamp(r,0.0,0.999) + " " + 256*clamp(g,0.0,0.999) + " " + 256*clamp(b,0.0,0.999) + "\n";
}

export function rayColor(r: Ray, world: HitableList, depth: number): Color
{
    if(depth<=0) return new Color(0,0,0);

    if(world.hit(r,0.001,Infinity) && Record.Instance.material.scatter(r))
    {
        return multiplyVector(Record.Instance.attenuation, rayColor(Record.Instance.scattered, world, depth-1));
    }
    else
    {
        const unitDirection = unitVector(r.getDirection);
        const t = 0.5*(unitDirection.getY + 1.0);
        return new Color(1.0,1.0,1.0).multiplyN(1.0-t).add(new Color(0.5,0.7,1.0).multiplyN(t));
    }

}