import { Point } from "./Point.ts";
import { Ray } from "./Ray.ts";

export class aabb
{
    static surrounding_box(box0: aabb, box1: aabb): aabb 
    {
        const small = new Point(
            Math.min(box0.minimum.getX, box1.minimum.getX),
            Math.min(box0.minimum.getY, box1.minimum.getY),
            Math.min(box0.minimum.getZ, box1.minimum.getZ)
        );

        const big = new Point(
            Math.max(box0.maximum.getX, box1.maximum.getX),
            Math.max(box0.maximum.getY, box1.maximum.getY),
            Math.max(box0.maximum.getZ, box1.maximum.getZ)
        );

        return new aabb(small,big);
    }

    private minimum: Point;
    private maximum: Point;
    
    constructor(a?: Point, b?: Point)
    {
        this.minimum = a ? a : new Point();
        this.maximum = b ? b : new Point();
    }

    hit(r: Ray, t_min: number, t_max: number): boolean
    {
        const tx1 = (this.minimum.getX - r.getOrigin.getX) * r.getDirection.negate().getX;
        const tx2 = (this.maximum.getX - r.getOrigin.getX) * r.getDirection.negate().getX;

        t_min = Math.min(tx1,tx2);
        t_max = Math.max(tx1,tx2);

        const ty1 = (this.minimum.getY - r.getOrigin.getY) * r.getDirection.negate().getY;
        const ty2 = (this.minimum.getY - r.getOrigin.getY) * r.getDirection.negate().getY;

        t_min = Math.max(t_min, Math.min(ty1,ty2));
        t_max = Math.min(t_max, Math.max(ty1,ty2));
        
        return t_max >= t_min;
    }
}