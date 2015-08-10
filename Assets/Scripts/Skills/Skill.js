#pragma strict

class Skill extends MonoBehaviour {
  public var damage = 1;
  public var damageMin = 1;
  public var damageMax = 1;
  public var skill: Skill;
  public var symbol = 'L';

  function Start() {
    damage = Random.Range(damageMin, damageMax);
    SendMessageUpwards('skillAdded', this);
  }
}
