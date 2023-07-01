

function IsWalkable(pos = Vector2(0, 0))
{
    pos.Round();
    var arr = currentTiles[pos.x][pos.y];

    for (var i = 0; i < arr.length; i++)
    {
        if (!arr[i].walkable)
        {
            return false;
        }
    }

    return true;
}

// Gets the direct path to the point of the first collision
function GetDirectPath(pos = Vector2, target = Vector2)
{
    var pathProbe = new Vector2(pos.x, pos.y);
    var path = [];
    
    while (IsWalkable(pathProbe.Add(new Vector2(target.x - pathProbe.x, target.y - pathProbe.y).Normalize().Round().RemoveNaN())))
    {        
        path.push(pathProbe.Copy());

        if (pathProbe.Equals(target))
        {
            return path;
        }
    }

    return path;
}


function FindBestPath(pos = Vector2, target = Vector2)
{
    var direct = GetDirectPath(pos, target);
    if (direct[direct.length - 1] == target)
    {
        return direct;
    }
    else
    {
        // TODO: Make this return a obstacle avoiding path instead
        return direct;
    }
}