import * as Engine from "./Engine.js";

export function LerpUnclamped (a, b, t)
{
    return a + t * ( b - a );
}

export function Lerp (a, b, t)
{
    return Clamp(a + t * ( b - a ), b, );
}

export function Clamp(a, min, max)
{
    if (a < min)
    {
        return min;
    }
    if (a > max)
    {
        return max;
    }

    return a;
}

export function GetVectorsqrMagnitude(vector)
{
    return vector.x * vector.x + vector.y * vector.y;
}

export function GetVectorMagnitude(vector)
{
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function NormalizeVector(vector = Vector2)
{
    var magnitude = GetVectorMagnitude(vector);
    return new Engine.Vector2(vector.x / magnitude, vector.y / magnitude);
}

export function RandomRange(min, max)
{
    return Math.random() * (max - min) + min;
}