import { Point } from "./Point.ts";
import { Ray } from "./Ray.ts";

export class aabb {
	static surrounding_box(box0: aabb, box1: aabb): aabb {
		const small = new Point(
			Math.min(box0.minimum.getX, box1.minimum.getX),
			Math.min(box0.minimum.getY, box1.minimum.getY),
			Math.min(box0.minimum.getZ, box1.minimum.getZ),
		);

		const big = new Point(
			Math.max(box0.maximum.getX, box1.maximum.getX),
			Math.max(box0.maximum.getY, box1.maximum.getY),
			Math.max(box0.maximum.getZ, box1.maximum.getZ),
		);

		return new aabb(small, big);
	}

	private minimum: Point;
	private maximum: Point;

	constructor(a?: Point, b?: Point) {
		this.minimum = a ? a : new Point();
		this.maximum = b ? b : new Point();
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		for (let a = 0; a < 3; a++) {
			const invD = 1 / r.getDirection.atIndex(a);
			let t0 = (this.minimum.atIndex(a) - r.getOrigin.atIndex(a)) * invD;
			let t1 = (this.maximum.atIndex(a) - r.getOrigin.atIndex(a)) * invD;

			if (invD < 0) {
				const temp = t0;
				t1 = t0;
				t0 = temp;
			}
			t_min = t0 > t_min ? t0 : t_min;
			t_max = t1 < t_max ? t1 : t_max;

			if (t_max <= t_min) return false;
		}
		return true;
	}

	public get min(): Point {
		return this.minimum;
	}

	public get max(): Point {
		return this.maximum;
	}
}
