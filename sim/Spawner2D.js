import { Vector2 } from "../util/Vector";

export class Spawner2D {
    /** @type {number} */
    spawnDensity = 159;
    /** @type {Vector2} */
    initialVelocity = new Vector2(0, 0);
    /** @type {number} */
    jitterStr = 0.03;
    /** @type {SpawnRegion[]} */
    spawnRegions = [new SpawnRegion(new Vector2(0, 0.66), new Vector2(6.42, 4.39))];
    /** @type {number} */
    spawnParticleCount;

    GetSpawnData() {
        /** @type {Vector2[]} */
        let allPoints = new Array();
        /** @type {Vector2[]} */
        let allVelocities = new Array();
        /** @type {number[]} */
        let allIndices = new Array();

        for (let regionIndex = 0; regionIndex < this.spawnRegions.length; regionIndex++)
        {
            /** @type {SpawnRegion} */
            const region = spawnRegions[regionIndex];
            /** @type {Vector2[]} */
            let points = SpawnInRegion(region);

            for (let i = 0; i < points.length; i++)
            {
                /** @type {number} */
                const angle = Math.random() * 3.14 * 2;
                /** @type {Vector2} */
                const dir = new Vector2(Math.cos(angle), Math.sin(angle));
                /** @type {Vector2} */
                const jitter = Vector2.mulNumber(dir, jitterStr * (Math.random() - 0.5));
                allPoints.push(Vector2.addVectors(points[i], jitter));
                allVelocities.push(initialVelocity);
                allIndices.push(regionIndex);
            }
        }

        const data = new ParticleSpawnData(allPoints, allVelocities, allIndices);

        return data;
    }
}

/**
 * @param {SpawnRegion} region 
 * @returns {Vector2[]}
 */
function SpawnInRegion(region) {
    const centre = region.position;
    const size = region.size;
    let i = 0;
    /** @type {Vector2} */
    const numPerAxis = CalculateSpawnCountPerAxisBox2D(region.size, spawnDensity);
    let points = new Array(numPerAxis.x * numPerAxis.y);

    for (let y = 0; y < numPerAxis.y; y++)
    {
        for (let x = 0; x < numPerAxis.x; x++)
        {
            const tx = x / (numPerAxis.x - 1);
            const ty = y / (numPerAxis.y - 1);

            const px = (tx - 0.5) * size.x + centre.x;
            const py = (ty - 0.5) * size.y + centre.y;
            points[i] = new Vector2(px, py);
            i++;
        }
    }

    return points;
}

function CalculateSpawnCountPerAxisBox2D(size, spawnDensity)
{
    const area = size.x * size.y;
    const targetTotal = Math.ceil(area * spawnDensity);

    const lenSum = size.x + size.y;
    const t = Vector2.divNumber(size, lenSum);
    const m = Math.sqrt(targetTotal / (t.x * t.y));
    const nx = Math.ceil(t.x * m);
    const ny = Math.ceil(t.y * m);

    return new Vector2(nx, ny);
}

class SpawnRegion {
    /** @type {Vector2} */
    position;
    /** @type {Vector2} */
    size;

    constructor(p, s) {
        this.position = p;
        this.size = s;
    }
}

class ParticleSpawnData {
    /** @type {Vector2[]} */
    positions;
    /** @type {Vector2[]} */
    velocities;
    /** @type {number[]} */
    spawnIndices;

    constructor(num) {
        this.positions = new Array(num);
        this.velocities = new Array(num);
        this.spawnIndices = new Array(num);
    }
}
