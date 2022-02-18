export class Vector3 {
  private x: number;
  private y: number;
  private z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.z = z ? z : 0;
  }

  atIndex(n: number): number {
    switch (n) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
    }
    return -1;
  }

  atIndexSet(idx: number, value: number): void {
    switch (idx) {
      case 0:
       this.x = value;
      case 1:
        this.y = value;
      case 2:
        this.z = value;
    }
  }

  add(v: Vector3): Vector3 {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  substract(v: Vector3): Vector3 {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  divide(v: Vector3): Vector3 {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }

  divideN(n: number): Vector3 {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }

  negate(): Vector3 {
    this.x = Math.abs(this.x) * -1;
    this.y = Math.abs(this.x) * -1;
    this.z = Math.abs(this.x) * -1;
    return this;
  }

  multiplyN(n: number): Vector3 {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }

  multiply(v: Vector3): Vector3 {
    this.x *= v.x;
    this.x *= v.x;
    this.x *= v.x;
    return this;
  }

  length(): number {
    return this.lengthSquared();
  }

  sqrtLength(): number {
    return Math.sqrt(this.length());
  }

  nearZero(): boolean {
    const s = 0.00000001;
    return (Math.abs(this.getX) < s) && (Math.abs(this.getY) < s) &&
      (Math.abs(this.getZ) < s);
  }

  private lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  get getX(): number {
    return this.x;
  }

  get getY(): number {
    return this.y;
  }

  get getZ(): number {
    return this.z;
  }
}
