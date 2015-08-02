#pragma strict

class Goblin extends Character {
  public var possibleLoot: GameObject[];

  function Start () {
    worthExperience = 45;
    health = 5;
  }

  function Update () {

  }

  function onDied() {
    // Then loot
    var randomLootIndex = Random.Range(0, possibleLoot.length);

    if (possibleLoot.length == 0) { return; }

    var loot = possibleLoot[randomLootIndex];
    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    Instantiate(loot, lootPosition, Quaternion.identity);
  }
}
