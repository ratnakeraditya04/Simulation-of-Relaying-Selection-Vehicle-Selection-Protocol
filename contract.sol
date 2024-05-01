pragma solidity ^0.8.0;

contract RelayingVehicleSelection {
    struct Vehicle {
        uint256 id;
        uint256 x;
        uint256 y;
    }

    mapping(uint256 => Vehicle) public vehicles;
    uint256 public relayingVehicleId;
    uint256 public intersectionX;
    uint256 public intersectionY;

    function registerVehicle(uint256 id, uint256 x, uint256 y) public {
        vehicles[id] = Vehicle(id, x, y);
    }

    function updateVehicleLocation(uint256 id, uint256 x, uint256 y) public {
        vehicles[id].x = x;
        vehicles[id].y = y;
    }

    function selectRelayingVehicle(uint256 intersectionX, uint256 intersectionY) public {
        uint256 minDistance = type(uint256).max;
        uint256 closestVehicleId;

        for (uint256 i = 0; i < vehicles.length; i++) {
            Vehicle storage vehicle = vehicles[i];
            uint256 distance = sqrt((vehicle.x - intersectionX) ** 2 + (vehicle.y - intersectionY) ** 2);

            if (distance < minDistance) {
                minDistance = distance;
                closestVehicleId = vehicle.id;
            }
        }

        relayingVehicleId = closestVehicleId;
    }
}