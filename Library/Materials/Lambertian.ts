import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { addVector, randomUnitVector } from "../Utils/vecUtil.ts";
import { Material } from "./Material.ts";

export class Lambertian implements Material
{
    albedo: Color;
    constructor(albedo: Color)
    {
        this.albedo = albedo;
    }

    scatter(): boolean
    {
        let scatterDir = addVector(Record.Instance.normal, randomUnitVector());
        if(scatterDir.nearZero())
        {
            scatterDir = Record.Instance.normal;
        }
        Record.Instance.scattered = new Ray(Record.Instance.p,scatterDir);
        Record.Instance.attenuation = this.albedo;
        return true;
    }
}