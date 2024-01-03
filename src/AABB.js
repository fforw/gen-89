export default class AABB {

    minX = Infinity;
    minY = Infinity;
    maxX = -Infinity;
    maxY = -Infinity;

    add(x, y)
    {
        this.minX = Math.min(this.minX, x);
        this.minY = Math.min(this.minY, y);
        this.maxX = Math.max(this.maxX, x);
        this.maxY = Math.max(this.maxY, y);
    }

    get width()
    {
        return Math.ceil(this.maxX - this.minX);
    }


    get height()
    {
        return Math.ceil(this.maxY - this.minY);
    }

    get center()
    {
        return [(this.minX + this.maxX) >> 1, (this.minY + this.maxY) >> 1 ]
    }

    grow(n)
    {
        this.minX -= n;
        this.minY -= n;
        this.maxY += n;
        this.maxY += n;
    }

    shrink(dir, amount)
    {
        switch(dir)
        {
            case 0:
                this.minX += amount
                this.minY += amount
                break;
            case 1:
                this.maxX -= amount
                this.minY += amount
                break;
            case 2:
                this.maxX -= amount
                this.maxY -= amount
                break;
            case 3:
                this.minX += amount
                this.maxY -= amount
                break;
            default:
                throw new Error("Invalid direction: " + dir)
        }
    }
}
