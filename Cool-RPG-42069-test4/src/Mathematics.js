
function LerpUnclamped (a, b, t)
{
    return a + t * ( b - a );
}

function Lerp (a, b, t)
{
    return Clamp(a + t * ( b - a ), b, );
}

function Clamp(a, min, max)
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

function GetVectorsqrMagnitude(vector = Vector2)
{
    return vector.x * vector.x + vector.y * vector.y;
}

function GetVectorMagnitude(vector = Vector2)
{
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

function NormalizeVector(vector = Vector2)
{
    var magnitude = GetVectorMagnitude(vector);
    return new Vector2(vector.x / magnitude, vector.y / magnitude);
}

function RandomRange(min, max)
{
    return Math.random() * (max - min) + min;
}