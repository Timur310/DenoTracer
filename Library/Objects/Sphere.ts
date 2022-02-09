import { Hittable } from "../Hittable.ts";
import { Point } from "../Point.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { dot, substractVector } from "../Utils/vecUtil.ts";
import { Material } from "../Materials/Material.ts";

export class Sphere implements Hittable {
  private cen: Point;
  private radius: number;
  mat: Material;

  constructor(center: Point, radius: number, mat: Material) {
    this.mat = mat;
    this.cen = center;
    this.radius = radius;
  }

  public static sphereUV(p: Point): void {
    const theta = Math.acos(-p.getY);
    const phi = Math.atan2(-p.getZ, p.getX) + Math.PI;

    Record.Instance.u = phi / (2 * Math.PI);
    Record.Instance.v = theta / Math.PI;
  }

  hit(r: Ray, t_min: number, t_max: number): boolean {
    const oc = substractVector(r.getOrigin, this.cen);
    const a = r.getDirection.length();
    const half_b = dot(oc, r.getDirection);
    const c = oc.length() - Math.pow(this.radius, 2);

    const discriminant = Math.pow(half_b, 2) - a * c;
    if (discriminant < 0) {
      return false;
    }
    const sqrtd = Math.sqrt(discriminant);
    let root = (-half_b - sqrtd) / a;
    if (root < t_min || t_max < root) {
      root = (-half_b + sqrtd) / a;
      if (root < t_min || t_max < root) {
        return false;
      }
    }
    Record.Instance.t = root;
    Record.Instance.p = r.at(root);
    const outward_normal = substractVector(Record.Instance.p, this.cen).divideN(
      this.radius,
    );
    Record.Instance.set_front_face(r, outward_normal);
    Sphere.sphereUV(outward_normal);
    Record.Instance.material = this.mat;
    return true;
  }
}
