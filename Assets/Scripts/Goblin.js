#pragma strict

class Goblin extends Character {
  public var skillPrefab: GameObject;
  public var possibleSkills = ['D', 'Q'];

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
    if (possibleSkills.length == 0) { return; }

    // Then loot
    var randomLootIndex = Random.Range(0, possibleSkills.length);

    var possibleSkill = possibleSkills[randomLootIndex];

    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    var skillObject =
      Instantiate(skillPrefab, lootPosition, Quaternion.identity);
    var skill = skillObject.GetComponent.<Skill>();
    skill.symbol = possibleSkill;
  }
}
