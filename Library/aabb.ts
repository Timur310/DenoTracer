import { Point } from "./Point.ts";
import { Ray } from "./Ray.ts";

export class aabb
{
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