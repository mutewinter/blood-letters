#pragma strict

import System.Collections.Generic;

class Goblin extends Character {
  public var skillPrefab: GameObject;
  public var possibleSkillsDropped = [Bow, Fire];

  function Start () {
    worthExperience = 45;
    health = 5;
    moveSpeed = 10;
    moveRate = 0.8;
    super.Start();
  }

  function Update () {
  }

  function onDied() {
    if (possibleSkillsDropped.length == 0) { return; }

    // Then skill dropped
    var randomLootIndex = Random.Range(0, possibleSkillsDropped.length);
    var skill = possibleSkillsDropped[randomLootIndex];

    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    var skillObject =
      Instantiate(skillPrefab, lootPosition, Quaternion.identity);
    var skillDrop = skillObject.GetComponent.<SkillDrop>();

    skillDrop.gameObject.AddComponent(skill);
  }
}
