import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { HitableList } from "../HittableList.ts";
import { Material } from "../Materials/Material.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { randomBetween } from "../Utils/MathUtils.ts";

export interface bvh_tree<T> {
    left?: bvh_tree<T>;
    right?: bvh_tree<T>;
    data: T;
}

export class bvh_node implements bvh_tree<Hittable>
{
    mat!: Material;
    left!: bvh_node;
    right!: bvh_node;
    data!: Hittable;
    private box: aabb = new aabb();

    constructor(objects: HitableList,start: number, end: number)
    {
        const objs = [...objects.getList];
        const axis = randomBetween(0,2);

        const comparator = (axis === 0) ? "box_x_compare" : (axis === 1) ? "box_y_compare" : "box_z_compare";

        const objectSpan = end-start;

        if(objectSpan === 1)
        {
            this.left.data = this.right.data = objs[start];
        }else if(objectSpan === 2)
        {
            if(this.compare(objs[start],objs[start+1], comparator))
            {
                this.left.data = objs[start];
                this.right.data = objs[start+1];
            }
            else
            {
                this.left.data = objs[start+1];
                this.right.data = objs[start];
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

        const hit_left = this.left.data.hit(r,t_min,t_max);
        const hit_right = this.right.data.hit(r,t_min,t_max);

        return hit_left || hit_right;
    }

    bounding_box(): boolean 
    {
        Record.Instance.output_box = this.box;
        return true;
    }

}