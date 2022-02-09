import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { Vector3 } from "../Vector3.ts";

export class xz_rect implements Hittable {
  mat: Material;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  k: number;

  constructor(
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    k: number,
    mat: Material,
  ) {
    this.mat = mat;
    this.k = k;
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
  }

  hit(r: Ray, t_min: number, t_max: number): boolean {
    const t = (this.k - r.getOrigin.getY) / r.getDirection.getY;
    if (t < t_min || t > t_max) {
      return false;
    }
    const x = r.getOrigin.getX + t * r.getDirection.getX;
    const z = r.getOrigin.getZ + t * r.getDirection.getZ;
    if (x < this.x0 || x > this.x1 || z < this.y0 || z > this.y1) {
      return false;
    }

    Record.Instance.t = t;
    Record.Instance.p = r.at(t);
    const outward_normal = new Vector3(0, 1, 0);
    Record.Instance.set_front_face(r, outward_normal);
    Record.Instance.material = this.mat;
    return true;
  }
}
