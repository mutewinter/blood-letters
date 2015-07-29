#pragma strict

class Player extends Character {
  public var totalExperience = 0;
  public var damageBonus = 0;

  function get level() : int {
    return Mathf.Floor(totalExperience / 100) || 1;
  }
  function set level(value : int) {
    level = value;
  }

  function get damage() : float {
    return (level * 1.5) + damageBonus;
  }
  function set damage(value : float) {
    damage = value;
  }

  function Start () {
    moveSpeed = 2.0;
  }

  function Update () {

  }

  function gainExperience(experience: int) {
    var startLevel = level;
    totalExperience += experience;
    Debug.Log('+' + experience + 'XP');
    if (startLevel != level) {
      Debug.Log('ZTARG!');
      Debug.Log('Level: ' + level);
      Debug.Log('Damage: ' + damage);
    }
  }

  function pickUp(item: Bow) {
    damageBonus = item.damage;
  }
}

