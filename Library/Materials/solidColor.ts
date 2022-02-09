import { Color } from "../Color.ts";
import { Point } from "../Point.ts";
import { Texture } from "./Texture.ts";

export class SolidColor implements Texture {
  private color: Color;

  constructor(c?: Color) {
    this.color = c ? c : new Color();
  }

  value(u: number, v: number, p: Point): Color {
    return this.color;
  }
}
