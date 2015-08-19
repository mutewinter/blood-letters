#pragma strict

import System.Collections.Generic;

class SquareRoom extends Room {
  public var walls: GameObject[];
  public var doors: GameObject[];

  function addDoor(side: Vector2) {
    removeWall(side);
    switch (side) {
      case Vector2.up:
        doors[0].SetActive(true);
        break;
      case Vector2.right:
        doors[1].SetActive(true);
        break;
      case Vector2.down:
        doors[2].SetActive(true);
        break;
      case Vector2.left:
        doors[3].SetActive(true);
        break;
    }
  }

  function removeWall(side: Vector2) {
    switch (side) {
      case Vector2.up:
        walls[0].SetActive(false);
        break;
      case Vector2.right:
        walls[1].SetActive(false);
        break;
      case Vector2.down:
        walls[2].SetActive(false);
        break;
      case Vector2.left:
        walls[3].SetActive(false);
        break;
    }
  }
}
