import { Color } from "../Color.ts";
import { Point } from "../Point.ts";
import { Record } from "../Record.ts";
import { SolidColor } from "./solidColor.ts";
import { Texture } from "./Texture.ts";

export class CheckerTexture implements Texture {
	private even: SolidColor;
	private odd: SolidColor;

	constructor(c1: SolidColor, c2: SolidColor) {
		this.even = c1;
		this.odd = c2;
	}

	value(u: number, v: number, p: Point): Color {
		const sines = Math.sin(10 * p.getX) * Math.sin(10 * p.getY) *
			Math.sin(10 * p.getZ);
		if (sines < 0) {
			return this.odd.value(
				Record.Instance.u,
				Record.Instance.v,
				Record.Instance.p,
			);
		} else {
			return this.even.value(
				Record.Instance.u,
				Record.Instance.v,
				Record.Instance.p,
			);
		}
	}
}
