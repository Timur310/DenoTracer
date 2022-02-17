import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material";
import { Point } from "../Point.ts";
import { Ray } from "../Ray";
import { degreeToRadian } from "../Utils/MathUtils.ts";
import { multiplyVector, multiplyVectorN } from "../Utils/vecUtil.ts";

export class Rotate_y implements Hittable
{
    mat!: Material;
    private sin_theta: number;
    private cos_theta: number;
    private hasbox: boolean;
    private radians: number;
    private bbox = new aabb();

    constructor(p: Hittable, angle: number)
    {
        this.radians = degreeToRadian(angle);

        this.sin_theta = Math.sin(this.radians);
        this.cos_theta = Math.cos(this.radians);

        this.hasbox = p.bounding_box();

        const min = new Point(Infinity,Infinity, Infinity);
        const max = new Point(-Infinity,-Infinity, -Infinity);

        for(let i=0;i<2;i++)
        {
            for(let j=0;i<2;j++)
            {
                for(let k=0;k<2;k++)
                {
                    // TODO: continue
                    const x = multiplyVectorN(this.bbox.max,i).add(multiplyVectorN)
                }
            }
        }

    }
    
    hit(r: Ray,t_min: number,t_max: number): boolean 
    {
    throw new Error("Method not implemented.");
    }

    bounding_box(): boolean 
    {
        throw new Error("Method not implemented.");
}

}