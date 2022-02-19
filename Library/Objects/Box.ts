import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { HitableList } from "../HittableList.ts";
import { Material } from "../Materials/Material.ts";
import { Point } from "../Point.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { xy_rect } from "./xy_rect.ts";
import { xz_rect } from "./xz_rect.ts";
import { yz_rect } from "./yz_rect.ts";

export class Box implements Hittable {
	mat: Material;
	private p1: Point;
	private p2: Point;
	sides = new HitableList();

	constructor(p1: Point, p2: Point, mat: Material) {
		this.mat = mat;

		this.p1 = p1;
		this.p2 = p2;

		this.sides.add(
			new xy_rect(p1.getX, p2.getX, p1.getY, p2.getY, p2.getZ, this.mat),
		);
		this.sides.add(
			new xy_rect(p1.getX, p2.getX, p1.getY, p2.getY, p1.getZ, this.mat),
		);

		this.sides.add(
			new xz_rect(p1.getX, p2.getX, p1.getZ, p2.getZ, p2.getY, this.mat),
		);
		this.sides.add(
			new xz_rect(p1.getX, p2.getX, p1.getZ, p2.getZ, p1.getY, this.mat),
		);

		this.sides.add(
			new yz_rect(p1.getY, p2.getY, p1.getZ, p2.getZ, p1.getX, this.mat),
		);
		this.sides.add(
			new yz_rect(p1.getY, p2.getY, p1.getZ, p2.getZ, p2.getX, this.mat),
		);
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		return this.sides.hit(r, t_min, t_max);
	}

	bounding_box(): boolean {
		Record.Instance.output_box = new aabb(this.p1, this.p2);
		return true;
	}
}
