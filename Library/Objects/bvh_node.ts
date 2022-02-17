import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { HitableList } from "../HittableList.ts";
import { Material } from "../Materials/Material.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { randomBetweenInt } from "../Utils/MathUtils.ts";

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
    box: aabb = new aabb();

    constructor(objects: HitableList,start: number, end: number)
    {
        const objs = [...objects.getList];
        const axis = randomBetweenInt(0,2);

        const comparator = (axis === 0) ? 
        (a: Hittable, b: Hittable) => this.box_x_compare(a, b) : (axis === 1) ? 
        (a: Hittable, b: Hittable) => this.box_y_compare(a, b) : (a: Hittable, b: Hittable) => this.box_z_compare(a, b);

        const objectSpan = end-start;

        if(objectSpan === 1)
        {
            this.left.data = this.right.data = objs[start];
        }else if(objectSpan === 2)
        {
            if(comparator(objs[start],objs[start+1]))
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
            objs.sort((a,b) => {
                if(comparator(a,b)) return -1;
                else return 1;
            })

            const mid = start + objectSpan/2;
            this.left = new bvh_node(objects, start,mid);
            this.right = new bvh_node(objects, mid,end);
        }

        const box_left = new aabb();
        const box_right = new aabb();

        if(!this.left.bounding_box() || this.right.bounding_box()) console.error("No bounding box in bvh_node constructor.");

        this.box = aabb.surrounding_box(box_left,box_right);
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

    box_compare(a: Hittable, b: Hittable, axis: number): boolean
    {
        const box_a = new aabb();
        const box_b = new aabb();

        if(!a.bounding_box() || ! b.bounding_box()) console.error("No bounding box in bvh_node constructor.");

        return box_a.min.atIndex(axis) < box_b.min.atIndex(axis);
    }

    box_x_compare(a: Hittable,b: Hittable): boolean
    {
        return this.box_compare(a,b,0);
    }

    box_y_compare(a: Hittable,b: Hittable): boolean
    {
        return this.box_compare(a,b,1);
    }

    box_z_compare(a: Hittable,b: Hittable): boolean
    {
        return this.box_compare(a,b,2);
    }
}