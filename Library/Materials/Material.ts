import { Ray } from "../Ray.ts";

export interface Material
{
    scatter(r: Ray): boolean;
}