import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { HitableList } from "../HittableList.ts";
import { Material } from "../Materials/Material.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { randomBetween } from "../Utils/MathUtils.ts";

export class bvh_node
{
    mat!: Material;
    private _left!: Hittable;
    private _right!: Hittable;
    private box: aabb = new aabb();

    constructor(objects: HitableList,start: number, end: number)
    {
        const objs = [...objects.getList];
        const axis = randomBetween(0,2);

        const comparator = (axis === 0) ? "box_x_compare" : (axis === 1) ? "box_y_compare" : "box_z_compare";

        const objectSpan = end-start;

        if(objectSpan === 1)
        {
            this._left = this._right = objs[start];
        }else if(objectSpan === 2)
        {
            if(this.compare(objs[start],objs[start+1], comparator))
            {
                this._left = objs[start];
                this._right = objs[start+1];
            }
            else
            {
                this._left = objs[start+1];
                this._right = objs[start];
            }
        }
        else
        {
            // TODO: continue
            this.compare(objs[start], objs[end], comparator);
        }
    }

    hit(r: Ray,t_min: number,t_max: number): boolean 
    {
        if(!this.box.hit(r,t_min,t_max)) return false;

        const hit_left = this._left.hit(r,t_min,t_max);
        const hit_right = this._right.hit(r,t_min,t_max);

        return hit_left || hit_right;
    }

    bounding_box(): boolean 
    {
        Record.Instance.output_box = this.box;
        return true;
    }

}