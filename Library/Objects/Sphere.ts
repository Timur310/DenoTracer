import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material.ts";
import { Point } from "../Point.ts";
import {Ray} from '../Ray.ts'
import { Record } from "../Record.ts";
import { dot, substractVector } from "../Utils/vecUtil.ts";

export class Sphere implements Hittable
{
    private cen: Point;
    private radius: number;
    mat: Material;
    private id: number;
    
    constructor(center: Point, radius: number, mat: Material)
    {
        this.mat = mat;
        this.cen = center;
        this.radius = radius;
        this.id = Record.Instance.obj_created+1;
        Record.Instance.obj_created +=1;
    }

    hit(r: Ray,t_min: number,t_max: number): boolean 
    {
        const oc = substractVector(r.getOrigin, this.cen);
        const a = r.getDirection.length();
        const half_b = dot(oc,r.getDirection);
        const c = oc.length() - Math.pow(this.radius,2);

        const discriminant = Math.pow(half_b,2) - a*c;
        if(discriminant<0)
        {
            return false;
        }
        const sqrtd = Math.sqrt(discriminant);
        let root = (-half_b - sqrtd) / a;
        if(root<t_min||t_max<root)
        {
            root = (-half_b+sqrtd) / a;
            if(root<t_min||t_max<root)
            {
                return false;
            }
        }
        Record.Instance.t = root;
        Record.Instance.p = r.at(Record.Instance.t);
        const outward_normal = substractVector(Record.Instance.p,this.cen).divideN(this.radius);
        Record.Instance.set_front_face(r,outward_normal);
        Record.Instance.obj_id = this.id
        return true;
    }
    
}