interface Trip {
    pickup: string[];
    drop: string[];
    via?: string[];
}

function validateTrips(
    shipment: { pickups: string[], drops: string[] },
    trips: Trip[]
): boolean {
    const allPoints = new Set([...shipment.pickups, ...shipment.drops]);

    for (const trip of trips) {
        for (const pickup of trip.pickup) {
            if (!shipment.pickups.includes(pickup)) {
                console.log(`Invalid pick-up point: ${pickup}`);
                return false;
            }
        }

        for (const drop of trip.drop) {
            if (!shipment.drops.includes(drop)) {
                console.log(`Invalid drop point: ${drop}`);
                return false;
            }
        }

        if (trip.via) {
            for (const via of trip.via) {
                if (!allPoints.has(via)) {
                    console.log(`Invalid via point: ${via}`);
                    return false;
                }
            }
        }
    }

    const visitedPoints = new Set<string>();
    for (const trip of trips) {
        for (const pickup of trip.pickup) {
            visitedPoints.add(pickup);
        }
        for (const drop of trip.drop) {
            visitedPoints.add(drop);
        }
        if (trip.via) {
            for (const via of trip.via) {
                visitedPoints.add(via);
            }
        }
    }

    for (const point of allPoints) {
        if (!visitedPoints.has(point)) {
            console.log(`Point ${point} not visited`);
            return false;
        }
    }

    return true;
}
