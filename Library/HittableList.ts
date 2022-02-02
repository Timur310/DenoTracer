import { Hittable } from "./Hittable.ts";
import { Ray } from "./Ray.ts";
import { Record } from "./Record.ts";

export class HitableList
{
    private hittableObjects: Hittable[] = [];

    clear(): void
    {
        this.hittableObjects = [];
    }

    get getList(): Hittable[]
    {
        return this.hittableObjects;
    }

    add(obj: Hittable)
    {
        this.hittableObjects.push(obj);
    }

    hit(r: Ray,t_min: number,t_max: number): boolean 
    {
        let hit_anything = false;
        let closest_so_far = t_max;

        for(const obj of this.getList)
        {
            if(obj.hit(r,t_min,closest_so_far))
            {
                hit_anything = true;
                closest_so_far = Record.Instance.t;
            }
        }
        return hit_anything;
    }
}